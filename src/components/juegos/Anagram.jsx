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
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="text-center">
      <h1 className='text-3xl font-bold mb-0 text-titulo'>Anagrama</h1>
        <h1 className='text-2xl font-bold text-futuro mb-4'>T’ikraspa pukllay</h1>
        <p className="text-sm mb-4">Reordena las letras y forma tantas palabras como puedas antes que se acabe el tiempo.</p>
        <div className="flex flex-col items-center justify-center">
          <div className="border rounded-xl p-8 w-96 bg-qumir bg-opacity-20 mb-8 text-left items-center justify-center shadow-lg">
            <label htmlFor="category" className="blockmb-4 text-base font-bold">Elige un tema:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-riti border border-gray-300 p-2 rounded-lg w-72 shadow-lg mt-4"
            >
              {Object.keys(wordList).map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>  
        {/* <h2 className="text-xl font-bold mt-4 mb-4">Reordena las letras:</h2>*/}
          {shuffledWord && !isGameOver && (
              <div className='flex flex-col items-center'>
                  <p className="text-6xl font-extrabold mb-10 text-titulo tracking-[0.25em] border border-titulo p-4 rounded-lg shadow-lg w-full max-w-lg shadow-green">
                      {shuffledWord}
                  </p>
                  <div className='flex items-center mb-16 w-full max-w-lg'>
                      <input
                          type="text"
                          className="border border-qumir p-4 rounded-lg w-full max-w-lg shadow-lg shadow-green text-center text-3xl font-extrabold tracking-wide shadow-green-100"
                          value={guess}
                          onChange={(e) => setGuess(e.target.value)}
                          // placeholder="Escribe tu respuesta"
                      />
                  </div>
                  <div className='flex mb-12 justify-between'>
                      <button
                          onClick={changeWord}
                          className="bg-yawar text-white font-extrabold p-4 rounded-lg hover:bg-red-600 w-48 mr-12"
                      > <i className="fa fa-chevron-right ml-1 mr-2 text-xl"></i>
                          Cambiar Palabra
                      </button>
                      <button
                          onClick={checkGuess}
                          className="bg-azul_cool text-white font-extrabold p-4 rounded-lg hover:bg-blue-600 w-48 "
                      >
                          Comprobar <i className="fa fa-check-circle ml-1 mr-2 text-xl"></i>
                      </button>
                  </div>
              </div>
          )}


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