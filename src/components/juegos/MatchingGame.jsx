import { useState, useEffect } from 'react';
import { gameData } from '../data/gameData';
import winSound from '../assets/sounds/win.mp3';
import loseSound from '../assets/sounds/lose.mp3';

const MatchingGame = () => {
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('Numeros');
  const [gameResults, setGameResults] = useState(null);
  const [draggedWord, setDraggedWord] = useState(null);
  const [randomItems, setRandomItems] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [positions, setPositions] = useState({}); 

  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    startNewGame(); 
  }, [selectedTheme]);

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
  };

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  return (
    <div className="matching-game p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Emparejamiento - Tinkuchispa pukllay</h1>

      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          <div className="mb-4">
            <p className="text-sm mb-4">Kaypiqa juk dibujota juk sananpawan tinkuchinayki tiyan. Pukllasqa kay qhichwa simiykita wiñachinki.</p>
            <p className="text-sm mb-4">Empareja imágenes con las palabras correspondientes. Asegúrate de que coincidan y mejora tu vocabulario mientras juegas.</p>
          </div>

          <div className="text-center mb-4">
            <label htmlFor="category" className="block mb-4 text-base font-bold">Selecciona un tema:</label>
            <select
              id="category"
              value={selectedTheme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="border border-gray-300 p-2 rounded w-64 text-center"
            >
              {['Numeros', 'Saludos', 'Animales', 'Familia', 'Anatomia', 'Pronombres'].map(theme => (
                <option key={theme} value={theme}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between space-x-4">
            <button
              onClick={checkResults}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Verificar Resultados
            </button>

            <button
              onClick={retryGame}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              Volver a Intentar
            </button>

            <button
              onClick={resetGame}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Jugar de Nuevo
            </button>
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

        <div className="flex flex-col mt-1">
          <div className="flex justify-center">
            {randomItems.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDraggedWord(item.word)}
                className="flex flex-col items-center m-4"
              >
                {!Object.values(positions).includes(item.id) && (
                  <img src={item.image} alt={item.word} className="w-24 h-24 object-cover" />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center w-full min-h-[200px] relative">
            {shuffledWords.map((word, index) => (
              <div
                key={index}
                className="text-center text-xl m-2 cursor-pointer border-2 border-[#66d400] p-4 rounded-lg bg-transparent p-4 rounded-lg w-40 h-40"
                onDrop={() => handleDrop(word, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                {word}
                {positions[index] && (
                  <img
                    src={randomItems.find(item => item.id === positions[index]).image}
                    alt={word}
                    className="absolute w-24 h-24 object-cover z-10"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingGame;