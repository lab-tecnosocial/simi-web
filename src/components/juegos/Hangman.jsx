import { useState, useEffect, useCallback } from 'react';
import Word from './Word';
import Keyboard from './Keyboard';
import GameOver from './GameOver';
import wordList from './WordList';
import fondoCielo from '../assets/images/fondo_cielo.png';
import globo from '../assets/images/globo.png';

function Game() {
  const [selectedList, setSelectedList] = useState('animales');
  const [selectedWord, setSelectedWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const maxAttempts = 4;

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
      style={{ backgroundImage: `url(${fondoCielo.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className='text-3xl font-bold mb-8 text-left'>Salva a Simi -  Simiman yanapay</h1>
      <p className="text-sm mb-4 text-left">Un juego donde debes descubrir la palabra oculta letra por letra antes de que el globo de Simi se caiga.</p>
      <p className="text-sm mb-8 text-left">QUE: Kaypi tarinayki tiyan ima sananpachus kaypi kachkan. Simita yanapayki tiyan mana globomanta urmamunanpaq.</p>

      <img src={globo.src} alt="Globo" className="mb-4 w-64" />

      <div className="w-full max-w-md text-center">
        <label htmlFor="word-list">Selecciona una lista de palabras: </label>
        <select id="word-list" value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
          {Object.keys(wordList).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitaliza la primera letra */}
            </option>
          ))}
        </select>
      </div>

      <Word selectedWord={selectedWord} guessedLetters={guessedLetters} />
      <Keyboard handleGuess={handleGuess} />
      <div className='bg-gray-300 mt-2 mb-4 py-2 px-4 rounded'>
        <h3>Estadísticas</h3>
        <p>Partidas ganadas: {wins}</p>
        <p>Partidas perdidas: {losses}</p>
      </div>

      {isGameOver || isWinner ? (
        <GameOver
          isWinner={isWinner}
          selectedWord={selectedWord}
          resetGame={resetGame}
        />
      ) : (
        <div>
          <h2>Intentos fallidos: {wrongGuesses} / {maxAttempts}</h2>
        </div>
      )}
    </div>
  );
}

export default Game;