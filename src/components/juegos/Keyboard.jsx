
const Keyboard = ({ handleGuess }) => {
  const letters = 'acdhijklmnñpqrstuwy‘'.split('');

  return (
    <div>
      {letters.map((letter) => (
        <button key={letter} onClick={() => handleGuess(letter)} className='bg-green-400 text-white font-bold py-2 px-2 m-2 rounded hover:bg-gray-300 transition duration-200'>
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;