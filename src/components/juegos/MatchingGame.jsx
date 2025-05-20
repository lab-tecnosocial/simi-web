import { useState, useEffect, useRef } from 'react'; import { gameData } from '../data/gameData'; import winSound
from '../assets/sounds/win.mp3'; import loseSound from '../assets/sounds/lose.mp3';

const MatchingGame = () => {
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('Numeros');
  const [gameResults, setGameResults] = useState(null);
  const [draggedWord, setDraggedWord] = useState(null);
  const [randomItems, setRandomItems] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [positions, setPositions] = useState({});
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    startNewGame();
    startClock();
    return () => clearInterval(timerRef);
  }, [selectedTheme]);

  const startClock = () => {
    setTime(0);
    setIsRunning(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  };

  const stopClock = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const startNewGame = () => {
    const items = getRandomItems(gameData.temas[selectedTheme], 5);
    setRandomItems(items);
    const shuffledWords = items.map(item => item.word).sort(() => 0.5 - Math.random());
    setShuffledWords(shuffledWords);
    setMatchedPairs([]);
    setGameResults(null);
    setPositions({}); 
  };

  const retryGame = () => {
    setMatchedPairs([]);
    setGameResults(null);
    setPositions({});
    startClock();
  };

  const handleDrop = (targetWord, index) => {
    if (draggedWord) {
      // Encontrar el elemento arrastrado
      const draggedItem = randomItems.find(item => item.word === draggedWord);
      
      if (draggedItem) {
        // Crear un nuevo par coincidente con información completa
        const matchedPair = {
          ...draggedItem,
          userWord: targetWord,
          droppedIndex: index
        };

        // Verificar si el elemento ya no está en las posiciones
        const isAlreadyPlaced = Object.values(positions).includes(draggedItem.id);
        
        if (!isAlreadyPlaced) {
          // Agregar par coincidente
          setMatchedPairs(prev => {
            // Filtrar pares previos para evitar duplicados
            const filteredPrev = prev.filter(
              pair => pair.id !== draggedItem.id
            );
            return [...filteredPrev, matchedPair];
          });

          // Actualizar posiciones
          setPositions(prev => ({ 
            ...prev, 
            [index]: draggedItem.id 
          }));
        }
      }
      
      setDraggedWord(null);
    }
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const checkResults = () => {
    stopClock();
    // Obtener los elementos aleatorios del tema actual
    const currentThemeItems = gameData.temas[selectedTheme];

    // Calcular los emparejamientos correctos
    const correctPairs = matchedPairs.filter(matchedItem => {
      // Buscar el elemento original en los datos del juego
      const originalItem = currentThemeItems.find(
        item => item.id === matchedItem.id
      );

      // Verificar si la palabra original coincide con la palabra del usuario
      return originalItem && originalItem.word === matchedItem.userWord;
    });

    // Establecer los resultados del juego
    setGameResults({
      correct: correctPairs.length,
      total: randomItems.length,
      percentage: Math.round((correctPairs.length / randomItems.length) * 100)
    });
  };

  const resetGame = () => {
    startNewGame();
    startClock();
  };

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  return (
    <div className="matching-game p-4 mt-10">
      <h1 className="text-4xl text-[#59CB07] font-bold mb-2 text-center">Emparejamiento</h1>
      <h2 className="text-center text-2xl text-[#4B4B4B] font-bold">Tinkuchispa pukllay</h2>
      <div className="flex flex-col items-center text-center mt-8">
        <div className="mb-4 text-center">
          <div className="mb-4">
            <p className="text-lg mb-4">Una la palabra con la imégen que le corresponde.</p>
          </div>

          <div className="text-center mb-4 p-6 bg-[rgba(89,203,7,0.2)] rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.2)] px-14">
            <div className="text-left w-full mb-5">
              <label htmlFor="category" className="block mb-4 text-lg font-bold">Elige un tema:</label>
            </div>
            <div className="relative text-left w-full">
              <select
                id="category"
                value={selectedTheme}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="text-lg border border-green-300 px-5 rounded-lg bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.2)] text-left font-bold w-full min-h-14 appearance-none"
              >
                {['Numeros', 'Saludos', 'Animales', 'Familia', 'Anatomia', 'Pronombres'].map(theme => (
                  <option key={theme} value={theme} className="p-5">
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </option>
                ))}
              </select>
              {/* Custom Arrow */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="flex w-full mt-5">
              <div className="w-[30%] text-left">
                <label htmlFor="category" className="block mb-4 text-lg font-bold">Tiempo:</label>
              </div>
              <div className="w-[70%] text-lg border border-green-300 rounded-lg bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.2)] items-center justify-center font-bold p-1">
                <p id="clock-timer">{formatTime(time)}</p>
              </div>
            </div>
          </div>
        </div>

        {/*Dragable Section*/}
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto sm:px-6 lg:px-10 scale-95 sm:scale-100">
          <div className="flex w-full justify-center border border-[#66d400] rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.2)] bg-transparent p-4 max-w-4xl">
            {randomItems.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDraggedWord(item.word)}
                className="flex flex-col items-center m-1 sm:m-2 md:m-3 lg:m-4"
              >
                {!Object.values(positions).includes(item.id) && (
                  <img src={item.image} alt={item.word} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover" />
                )}
              </div>
            ))}
          </div>

          <div className="flex w-full pt-5 pb-5 relative justify-between 
          gap-x-2 sm:gap-x-4 md:gap-x-6 lg:gap-x-8
          max-w-4xl">
            {shuffledWords.map((word, index) => (
              <div
                key={index}
                className="text-center 
                  text-sm sm:text-xl md:text-xl lg:text-xl 
                  cursor-pointer border-2 border-[#66d400] 
                  rounded-md md:rounded-2xl lg:rounded-3xl 
                  w-24 sm:w-28 md:w-36 lg:w-40 h-24 sm:h-28 md:h-36 lg:h-40  
                  bg-transparent shadow-[4px_4px_8px_rgba(0,0,0,0.2)] flex flex-col items-center justify-between"
                onDrop={() => handleDrop(word, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                {/* Word with underline */}
                <div className="relative w-full text-center">
                  <p className="font-bold text-[#4B4B4B] pt-2">{word}</p>
                  <div className="absolute left-0 w-full h-[2px] bg-[#66d400] mt-1"></div>
                </div>

                {/* Image placement */}
                {positions[index] && (
                  <img
                    src={randomItems.find(item => item.id === positions[index]).image}
                    alt={word}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover z-10 mb-3"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="w-full mb-5
            sm:grid grid-cols-3
            sm:max-h-16 sm:mb-10 gap-x-2 max-w-4xl">
            <div className="w-full mb-3">
              <button
                onClick={checkResults}
                className="w-full px-5 py-4 bg-[#1EAFF7] text-white rounded-xl shadow-md flex items-center gap-2 hover:bg-blue-600 transition"
              >
                <div className="text-lg w-full text-center font-bold">Comprobar</div>
              </button>
            </div>

            <div className="w-full mb-3">
              <button
                onClick={retryGame}
                className="w-full px-4 py-4 bg-[#FFC803] text-black rounded-xl shadow-md flex items-center gap-2 hover:bg-yellow-600 transition"
              >
                <div className="text-lg w-full text-center font-bold">Reintentar</div>
              </button>
            </div>

            <div className="w-full">
              <button
                onClick={resetGame}
                className="w-full px-4 py-4 bg-[#FF4B4B] text-white rounded-xl shadow-md flex items-center gap-2 hover:bg-red-600 transition"
              >
                <div className="text-lg w-full text-center font-bold">Jugar de nuevo</div>
              </button>
            </div>
          </div>

          {gameResults && (
            <div className="mt-4 p-4 bg-[#bef789] rounded-lg text-center">
              <h3 className="text-xl font-bold">Resultados del Juego</h3>
              <p className="text-lg">
                Emparejamientos Correctos: {gameResults.correct} / {gameResults.total}
              </p>
              <p className="text-lg font-bold">
                {gameResults.correct >= 3 
                  ? (playSound(winSound), '🎉 ¡Felicidades! Has ganado. 🎉') 
                  : (playSound(loseSound), '😢 Lo siento, has perdido. 😢')}
              </p>
            </div>
          )}
        </div>
        {/*End dragable section*/}
      </div>
    </div>
  );
};

export default MatchingGame;