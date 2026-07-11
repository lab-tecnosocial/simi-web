
const Keyboard = ({ handleGuess }) => {
  const letters = "achijklmnñpqrstuwy'".split("");

  return (
    <div className="flex flex-wrap justify-center gap-2 p-4">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          className="bg-white text-black font-bold w-14 h-14 text-2xl rounded-lg border-2 border-qumir shadow-[0_4px_0_theme(colors.qumir)] hover:shadow-[0_2px_0_theme(colors.qumir)] hover:translate-y-0.5 transition-all duration-200 flex items-center justify-center"
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;