import { useState, useEffect, useCallback } from 'react';
import GameOver from './GameOver';
import wordList from './WordList';

function Anagram() {
  const [currentWord, setCurrentWord] = useState('');
  const [shuffledWord, setShuffledWord] = useState('');
  const [guess, setGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('animales');

  const selectRandomWord = useCallback((category) => {
    if (wordList[category] && wordList[category].length > 0) {
      const words = wordList[category];
      const word = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(word);
      setShuffledWord(shuffleWord(word));
      setGuess('');
      setIsGameOver(false);
    } else {
      console.error('La categoría no existe o está vacía.');
    }
  }, []);

  useEffect(() => {
    selectRandomWord(selectedCategory);
  }, [selectedCategory, selectRandomWord]);

  const shuffleWord = (word) => {
    if (!word) {
      return '';
    }
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const checkGuess = () => {
    setIsGameOver(true);
  };

  const resetGame = () => {
    selectRandomWord(selectedCategory);
  };

  const changeWord = () => {
    selectRandomWord(selectedCategory);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="text-center">
        <h1 className='text-3xl font-bold mb-8'>Anagrama - T’ikraspa pukllay</h1>
        <p className="text-sm mb-8">Kaypi t’ukunayki kay sananpakunamanta tikraspa t’ikraspa allin simikunata tarinaykikama</p>
        <p className="text-sm mb-4">Desafía tu mente reorganizando letras para formar palabras. Encuentra todas las combinaciones posibles antes de que el tiempo se agote.</p>
        <div className="border rounded p-12 bg-[#bef789] mb-8">
          <label htmlFor="category" className="block mb-4 text-base font-bold">Selecciona un tema:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded w-64"
          >
            {Object.keys(wordList).map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

        <h2 className="text-xl font-bold mt-4 mb-4">Reordena las letras:</h2>
        {shuffledWord && !isGameOver && (
          <div className='flex flex-col items-center'>
          <p className="text-4xl mb-4">{shuffledWord}</p>
          <div className='flex items-center mb-4'>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-64 mr-2"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Escribe tu respuesta"
            />
            <button
              onClick={checkGuess}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Comprobar
            </button>
          </div>
          <button
                onClick={changeWord}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-4"
              >
                Cambiar Palabra
              </button>
        </div>
        )}
        </div>
        {/* Mostrar el resultado */}
        {isGameOver && (
          <GameOver
            isWinner={guess.toLowerCase() === currentWord}
            selectedWord={currentWord}
            resetGame={resetGame}
          />
        )}
      </div>
    </div>
  );
}

export default Anagram;