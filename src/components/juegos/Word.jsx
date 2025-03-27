
const Word = ({ selectedWord, guessedLetters }) => {
  return (
    <div>
      {selectedWord.split('').map((letter, index) => (
        <span key={index} style={{ margin: '0 5px', fontSize: '24px' }}>
          {guessedLetters.includes(letter) ? letter : '_'}
        </span>
      ))}
    </div>
  );
};

export default Word;