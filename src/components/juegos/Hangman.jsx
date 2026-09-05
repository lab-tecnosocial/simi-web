import { useState, useEffect, useCallback } from 'react';
import Word from './Word';
import Keyboard from './Keyboard';
import GameOver from './GameOver';
import { wordList } from '../data';

function Game({ fondoCielo, globo, mancha }) {
  const [selectedList, setSelectedList] = useState('animales');
  const [selectedWord, setSelectedWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [manchas, setManchas] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const maxAttempts = 4;
  const maxHints = 2;

  
  const generarPosicionManchaSegura = (manchasExistentes) => {
    const radius = 130;
    const manchaSize = 80; // w-20
    const innerRadius = radius - manchaSize / 2;
    const distanciaMinima = 60;

    for (let intentos = 0; intentos < 30; intentos++) {
      const angle = Math.random() * 2 * Math.PI;
      const r = Math.random() * innerRadius;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);

      const muyCerca = manchasExistentes.some(m => {
        const dx = m.x - x;
        const dy = m.y - y;
        return Math.sqrt(dx * dx + dy * dy) < distanciaMinima;
      });

      if (!muyCerca) return { x, y };
    }

    return { x: 0, y: 0 }; 
  };

  const resetGame = useCallback(() => {
    const words = wordList[selectedList];
    if (words) {
      setSelectedWord(words[Math.floor(Math.random() * words.length)]);
      setGuessedLetters([]);
      setWrongGuesses(0);
      setManchas([]);
      setHintsUsed(0);
    } else {
      console.error(`No existe la lista de palabras para: ${selectedList}`);
    }
  }, [selectedList]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || wrongGuesses >= maxAttempts) return;

    setGuessedLetters([...guessedLetters, letter]);
    if (!selectedWord.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
      const nuevaMancha = generarPosicionManchaSegura(manchas);
      setManchas(prev => [...prev, nuevaMancha]);
    }
  };

  const handleHint = () => {
    if (hintsUsed >= maxHints) return;

    const remainingLetters = selectedWord.split('').filter(letter => !guessedLetters.includes(letter));
    if (remainingLetters.length > 0) {
      const randomLetter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
      setGuessedLetters([...guessedLetters, randomLetter]);
      setHintsUsed(hintsUsed + 1);

      const nuevaMancha = generarPosicionManchaSegura(manchas);
      setManchas(prev => [...prev, nuevaMancha]);
    }
  };

  const isGameOver = wrongGuesses >= maxAttempts;
  const isWinner = selectedWord.length > 0 && selectedWord.split('').every(letter => guessedLetters.includes(letter));

  useEffect(() => {
    if (isWinner) setWins(w => w + 1);
    else if (isGameOver) setLosses(l => l + 1);
  }, [isWinner, isGameOver]);


  return (
    <div
      className="flex flex-col items-center min-h-screen bg-gray-100 pt-12 pb-2 px-4"
      style={{
        backgroundImage: `url(${fondoCielo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-qumir">Salva a Simi</h1>
        <h2 lang="qu" className="text-lg text-gray-700">Simita yanapay</h2>
        <div className="flex justify-center gap-6 mt-3">
          <span className="text-qumir font-bold text-lg">✓ {wins} victorias</span>
          <span className="text-yawar font-bold text-lg">✗ {losses} derrotas</span>
        </div>
      </div>

      <div
        className="rounded-lg p-4 mb max-w-lg text-center mx-auto border-2 border-qumir bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
      >
        <p className="text-gray-700">
          Un juego donde debes descubrir la palabra oculta letra por<br />
          letra antes de que el globo de Simi se caiga.
        </p>
      </div>

      <div className="relative w-[500px] h-[500px] mb-4">
        <img src={globo.src} alt="Globo" className="w-full h-full object-contain" />

        <div className="absolute top-[20px] left-1/2 w-[260px] h-[260px] -translate-x-1/2 overflow-hidden rounded-full">
          {manchas.map((pos, index) => (
            <img
              key={index}
              src={mancha.src}
              alt="Mancha"
              className="absolute w-20" 
              style={{
                top: `calc(50% + ${pos.y}px)`,
                left: `calc(50% + ${pos.x}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-[350px] mb-2 mx-auto text-center">
        <label htmlFor="word-list" className="block text-lg font-bold text-black mb-2">
          Selecciona una lista de palabras:
        </label>
        <select
          id="word-list"
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
          className="w-full py-4 px-4 h-14 text-lg font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          {Object.keys(wordList).map((key) => (
            <option key={key} value={key} className="text-lg font-bold">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <Word selectedWord={selectedWord} guessedLetters={guessedLetters} />
      <Keyboard handleGuess={handleGuess} />

      <button
        onClick={handleHint}
        disabled={hintsUsed >= maxHints}
        className={`bg-qumir text-white font-bold py-3 px-6 rounded-xl hover:bg-[#4bb306] transition duration-200 ${hintsUsed >= maxHints ? 'opacity-50 cursor-not-allowed' : ''} text-lg shadow-md hover:shadow-lg mt-4`}
      >
        Dame una pista
      </button>

      {isGameOver || isWinner ? (
        <GameOver
          isWinner={isWinner}
          selectedWord={selectedWord}
          resetGame={resetGame}
        />

      ) : (
        <div>
          <p className="text-sm">Intentos fallidos: {wrongGuesses} / {maxAttempts}</p>
        </div>
      )}




    </div>
  );
}

export default Game;
