
const Word = ({ selectedWord, guessedLetters }) => {
  return (
    <div className="flex justify-center my-4">
      <div className="
        flex items-center justify-center 
        bg-white/40 border border-[#59CB07] 
        rounded-md p-2
        shadow-[0_6px_12px_rgba(89,203,7,0.4)]
        transition-all duration-200
      ">
        <div className="flex flex-wrap justify-center gap-1">
          {selectedWord.split('').map((letter, index) => (
            <span 
              key={index} 
              className="
                inline-flex items-center justify-center
                text-xl font-medium
                w-5 h-6
                text-black
                transition-all duration-100
              "
            >
              {guessedLetters.includes(letter) ? letter : '_'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Word;