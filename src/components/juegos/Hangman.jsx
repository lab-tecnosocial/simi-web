import { useState, useEffect, useCallback } from 'react';
import Word from './Word';
import Keyboard from './Keyboard';
import GameOver from './GameOver';
import wordList from './WordList';
import fondoCielo from '../assets/images/Nubes.gif';
import globo from '../assets/images/globo.png';
import mancha from '../assets/images/mancha.png';

function Game() {
  const [selectedList, setSelectedList] = useState('animales');
  const [selectedWord, setSelectedWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [manchas, setManchas] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0); // Estado para controlar el número de pistas usadas

  const maxAttempts = 4;
  const maxHints = 2; // Máximo número de pistas permitidas

  // Estados para estadísticas
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  // Estado para controlar si el juego ha comenzado
  const [gameStarted, setGameStarted] = useState(false);

  const resetGame = useCallback(() => {
    const words = wordList[selectedList];
    if (words) {
      setSelectedWord(words[Math.floor(Math.random() * words.length)]);
      setGuessedLetters([]);
      setWrongGuesses(0);
      setManchas([]); // Para reiniciar manchas
      setHintsUsed(0); // Reiniciar el contador de pistas
      setGameStarted(true); // El juego ha comenzado
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
      setManchas([...manchas, mancha]); // Para añadir una nueva mancha
    }
  };

  const handleHint = () => {
    if (hintsUsed >= maxHints) return;

    const remainingLetters = selectedWord.split('').filter(letter => !guessedLetters.includes(letter));
    if (remainingLetters.length > 0) {
      const randomLetter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
      setGuessedLetters([...guessedLetters, randomLetter]);
      setHintsUsed(hintsUsed + 1);
    }
  };

  const isGameOver = wrongGuesses >= maxAttempts;
  const isWinner = selectedWord.split('').every(letter => guessedLetters.includes(letter));

  useEffect(() => {
    // Actualizar estadísticas solo si el juego ha comenzado
    if (gameStarted) {
      if (isGameOver) {
        setLosses(prevLosses => prevLosses + 1); // Aumenta las pérdidas
      }
      if (isWinner) {
        setWins(prevWins => prevWins + 1); // Aumenta las victorias
      }
    }
  }, [isGameOver, isWinner, gameStarted]); // To update statistics

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8"
      style={{ 
        backgroundImage: `url(${fondoCielo.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="text-center mb-8">
      <h1 className="text-2xl font-bold" style={{ color: '#59CB07' }}>Salva a Simi</h1>
        <h2 className="text- text-gray-700">Simiman yanapay</h2>
      </div>
      <div 
        className="rounded-lg p-4 mb-8 max-w-lg text-center mx-auto"
        style={{
          border: '2px solid #59CB07',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }}
      >
        <p className="text-gray-700">
          Un juego donde debes descubrir la palabra oculta letra por<br />
          letra antes de que el globo de Simi se caiga.
        </p>
      </div>

      <div className="relative">
        <img src={globo.src} alt="Globo" className="mb-4 w-64" />   
        {manchas.map((_, index) => (
          <img
            key={index}
            src={mancha.src} // Asegúrate de usar 'mancha' directamente si es una importación
            alt="Mancha"
            className="absolute w-14"
            style={{
              top: `${Math.random() * 30 + 20}px`, // Aleatorio entre 20px y 50px
              left: `${Math.random() * 100 + 85}px`, // Aleatorio entre 0px y 100px
              transform: 'translateX(-50%)'
            }} />
        ))}
      </div>

      <div className="w-full max-w-[280px] mb-8 mx-auto text-center">
        <label htmlFor="word-list" className="block text-sm font-medium text-black mb-2">
          Selecciona una lista de palabras:
        </label>
        <select
          id="word-list"
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
          className="w-full py-3 px-2 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          {Object.keys(wordList).map((key) => (
            <option key={key} value={key}>
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
        className={`bg-[#59CB07] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#4bb306] transition duration-200 ${hintsUsed >= maxHints ? 'opacity-50 cursor-not-allowed' : ''} text-lg shadow-md hover:shadow-lg mt-4`}
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
      {/*
      <div className='bg-[#bef789] mt-2 mb-4 py-2 px-4 rounded'>
        <h3>Estadísticas</h3>
        <p>Partidas ganadas: {wins}</p>
        <p>Partidas perdidas: {losses}</p>
      </div>
      */}


    </div>
  );
}

export default Game;