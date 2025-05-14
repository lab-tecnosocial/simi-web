import { useEffect, useState } from "react";
import { answerWords } from "./words";
import wordList from "./WordList";
import GameOver from "./GameOver";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const generateRandomMatrix = (rows, cols, words) => {
    const letters = "abcdefghijklmnopqrstuvwxyz’";
    const matrix = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
            letter: letters[Math.floor(Math.random() * letters.length)],
            isAnswer: false
        }))
    );

    words.forEach((word) => {
        let placed = false;
        while (!placed) {
            const direction = Math.random() < 0.33 ? 'horizontal' : (Math.random() < 0.5 ? 'vertical' : 'diagonal');
            const startRow = Math.floor(Math.random() * rows);
            const startCol = Math.floor(Math.random() * cols);

            if (direction === 'horizontal' && startCol + word.length <= cols) {
                let canPlace = true;
                for (let i = 0; i < word.length; i++) {
                    if (matrix[startRow][startCol + i].isAnswer) {
                        canPlace = false;
                        break;
                    }
                }
                if (canPlace) {
                    for (let i = 0; i < word.length; i++) {
                        matrix[startRow][startCol + i] = { letter: word[i], isAnswer: true };
                    }
                    placed = true;
                }
            } else if (direction === 'vertical' && startRow + word.length <= rows) {
                let canPlace = true;
                for (let i = 0; i < word.length; i++) {
                    if (matrix[startRow + i][startCol].isAnswer) {
                        canPlace = false;
                        break;
                    }
                }
                if (canPlace) {
                    for (let i = 0; i < word.length; i++) {
                        matrix[startRow + i][startCol] = { letter: word[i], isAnswer: true };
                    }
                    placed = true;
                }
            } else if (direction === 'diagonal' && startRow + word.length <= rows && startCol + word.length <= cols) {
                let canPlace = true;
                for (let i = 0; i < word.length; i++) {
                    if (matrix[startRow + i][startCol + i].isAnswer) {
                        canPlace = false;
                        break;
                    }
                }
                if (canPlace) {
                    for (let i = 0; i < word.length; i++) {
                        matrix[startRow + i][startCol + i] = { letter: word[i], isAnswer: true };
                    }
                    placed = true;
                }
            }
        }
    });

    return matrix;
};

const WordPuzzleGame = () => {
    const [matrix, setMatrix] = useState([]);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [highlightAnswers, setHighlightAnswers] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180); 
    const [isGameActive, setIsGameActive] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('animales');
    const [answerWords, setAnswerWords] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [highlightedCells, setHighlightedCells] = useState([]);

    const getRandomWords = (category, count) => {
        const words = wordList[category];
        const shuffled = words.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    useEffect(() => {
        setAnswerWords(getRandomWords(selectedCategory, 4));
    }, [selectedCategory]);

    const initializeGame = () => {
        const newMatrix = generateRandomMatrix(11, 12, answerWords);
        setMatrix(newMatrix);
        setFoundWords([]);
        setSelectedLetters([]);
        setTimeLeft(180);
        setIsGameActive(true);
    };

    useEffect(() => {
        if (isGameActive && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setIsGameActive(false);
        }
    }, [isGameActive, timeLeft]);

    useEffect(() => {
        const selectedWord = selectedLetters.map((l) => l.letter).join("");
        if (answerWords.includes(selectedWord)) {
            setFoundWords((prev) => [...prev, selectedWord]);
            setAnswerWords((prev) => prev.filter(word => word !== selectedWord));
            setSelectedLetters([]);
        }
    }, [selectedLetters]);

    useEffect(() => {
        if (foundWords.length === answerWords.length) {
            setIsGameActive(false);
        }
    }, [foundWords]);

    const handleLetterClick = (letter, row, col) => {
        setSelectedLetters((prev) => {
            const existingIndex = prev.findIndex(l => l.row === row && l.col === col);
            if (existingIndex !== -1) {
                const newSelection = [...prev];
                newSelection.splice(existingIndex, 1);
                return newSelection;
            } else {
                return [...prev, { letter, row, col }];
            }
        });
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-4 max-w-screen-lg mx-auto">
            <div className="flex flex-col items-center justify-center text-center mb-24 w-full md:w-1/3 mx-auto">
                <h1 className="text-[32px] font-bold text-[#59CB07] font-[Nunito] mb-[1]">Sopa de letras</h1>
                <h2 className="text-[24px] font-bold text-neutral-600 font-[Nunito] mb-2">Quillqa jilli</h2>
                <p className="text-[16px] font-light text-neutral-600 font-[Nunito] mb-2">Busca y resalta palabras ocultas en una cuadrícula de letras en el menor tiempo posible.</p>
                <div className="w-[384.68px] h-[195px] bg-[#59CB07] bg-opacity-20 p-4 rounded-[10px] mb-4">
                    <label htmlFor="category" className="text-left block mb-4 mt-[-5px] ml-[27px] text-base font-bold">Elige un tema:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-[300px] h-[52.51px] mb-4 drop-shadow-[2px_2px_2px_rgba(75,75,75,0.25)]"
                    >
                        {Object.keys(wordList).map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                    <div className="mb-4 flex items-center gap-4">
                        
                        <div className="w-[156px] h-[52.51px] text-[16px] bg-white rounded-lg inline-block font-nunito text-gray-800 flex items-center justify-center font-semibold ml-[26px] mr-[-8px] drop-shadow-[2px_2px_2px_rgba(75,75,75,0.25)]">
                            <i className="fas fa-hourglass-half mr-[15px]"></i>
                            {String(Math.floor(timeLeft / 3600)).padStart(2, '0')}:
                            {String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0')}:
                            {String(timeLeft % 60).padStart(2, '0')}
                        </div>
                        <button
                            onClick={initializeGame}
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded text-white font-semibold w-[136px] h-[52.51px] text-[16px] drop-shadow-[2px_2px_4px_rgba(89,203,7,0.50)]"
                            style={{ backgroundColor: '#59CB07' }}
                            >
                            <i className="fas fa-play"></i>
                            <span>{isGameActive ? 'Reiniciar' : 'Jugar'}</span>
                        </button>
                        </div>
                </div>
                <div className="w-[384.68px] h-[190px] bg-[#59CB07] bg-opacity-20 p-4 rounded-[10px] mb-4 ">
                    <div className="mb-2">
                    <h2 className="text-left ml-[18px]">Palabras a buscar:</h2>
                        <div className="flex flex-wrap items-center justify-center">
                            {answerWords.map((word, index) => (
                                <span key={index} className="flex items-center justify-center font-black font-[Nunito] w-[73.94px] h-[41.79px] bg-white text-gray-800 px-2 py-1 rounded-[5.36px] m-1 drop-shadow-[2px_2px_5px_rgba(89,203,7,0.25)]">
                                    {word}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-left ml-[18px]">Palabras encontradas:</h2>
                        <div className="flex flex-wrap items-center justify-center">
                            {foundWords.map((word, index) => (
                                <span key={index} className="flex items-center justify-center font-black font-[Nunito] w-[73.94px] h-[41.79px] bg-white text-gray-800 px-2 py-1 rounded-[5.36px] m-1 drop-shadow-[2px_2px_5px_rgba(89,203,7,0.25)]">
                                    {word}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    
                </div>
                {!isGameActive && foundWords.length === 0 && (
                    <div className="bg-green-200 p-4 rounded mb-4">
                        <h2>¡Felicitaciones! Has encontrado todas las palabras.</h2>
                    </div>
                )}
                {!isGameActive && timeLeft === 0 && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white p-6 rounded shadow-lg text-center">
                            <h2>Fin del juego. Se acabó el tiempo.</h2>
                            <button onClick={initializeGame}
                                className='bg-green-500 text-white font-bold mt-6 py-2 px-4 rounded hover:bg-green-600 transition duration-500'>Reiniciar Juego</button>
                        </div>


                    </div>
                )}
            </div>
            <div className="flex-grow flex items-center justify-center rounded-[50px]">
                <div className="w-[570px] h-[550px] flex items-center justify-center ml-[55px] mt-[-100px]">
                    <table className="w-[570px] h-[550px] table-auto border-collapse border border-gray-300 font-nunito font-bold text-[24px] text-neutral-600">
                    <tbody>
                    {matrix.map((rowData, rowIndex) => (
                        <tr key={rowIndex}>
                        {rowData.map((cell, colIndex) => {
                            const isPartOfFoundWord = foundWords.some(word =>
                            word.split('').every((letter, i) => {
                                return selectedLetters.some(
                                l => l.letter === letter && l.row === rowIndex && l.col === colIndex + i
                                );
                            })
                            );

                            return (
                            <td
                                key={colIndex}
                                onClick={() => {
                                const index = selectedLetters.findIndex(
                                    (l) => l.row === rowIndex && l.col === colIndex
                                );

                                if (index !== -1) {
                                    // Si ya fue seleccionada
                                    if (index < selectedLetters.length - 1) {
                                    setSelectedLetters(selectedLetters.slice(0, index));
                                    } else {
                                    setSelectedLetters(selectedLetters.slice(0, -1));
                                    }
                                } else {
                                    setSelectedLetters([
                                    ...selectedLetters,
                                    { letter: cell.letter, row: rowIndex, col: colIndex },
                                    ]);
                                }
                                }}
                                style={{
                                backgroundColor: selectedLetters.some(
                                    (l) => l.row === rowIndex && l.col === colIndex
                                )
                                    ? 'rgba(89, 203, 7, 0.5)'
                                    : cell.isAnswer && foundWords.some(word => word.includes(cell.letter))

                                    ? 'rgba(89, 203, 7, 0.5)'
                                    : highlightAnswers && cell.isAnswer
                                    ? 'black'
                                    : 'white',
                                cursor: 'pointer',
                                width: '40px',
                                height: '40px',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                borderRadius: (() => {
                                    const index = selectedLetters.findIndex(
                                    (l) => l.row === rowIndex && l.col === colIndex
                                    );
                                    if (index === -1) return '0';

                                    if (selectedLetters.length === 1) return '50%';

                                    const first = selectedLetters[0];
                                    const last = selectedLetters[selectedLetters.length - 1];

                                    console.log("....");
                                    console.log(cell.isAnswer);
                                    console.log(foundWords.some(word => word.includes(cell.letter)));

                                    const isHorizontal = first.row === last.row;
                                    const isVertical = first.col === last.col;
                                    const isDiagonal =
                                    Math.abs(first.row - last.row) === Math.abs(first.col - last.col);

                                    const isRight = isHorizontal && first.col < last.col;
                                    const isLeft = isHorizontal && first.col > last.col;
                                    const isDown = isVertical && first.row < last.row;
                                    const isUp = isVertical && first.row > last.row;

                                    const isDownRight =
                                    isDiagonal && first.row < last.row && first.col < last.col;
                                    const isDownLeft =
                                    isDiagonal && first.row < last.row && first.col > last.col;
                                    const isUpRight =
                                    isDiagonal && first.row > last.row && first.col < last.col;
                                    const isUpLeft =
                                    isDiagonal && first.row > last.row && first.col > last.col;

                                    if (index === 0) {
                                    if (isRight) return '30px 0 0 30px';
                                    if (isLeft) return '0 30px 30px 0';
                                    if (isDown) return '30px 30px 0 0';
                                    if (isUp) return '0 0 30px 30px';
                                    if (isDownRight) return '30px 0 0 30px';
                                    if (isDownLeft) return '0 30px 30px 0';
                                    if (isUpRight) return '30px 0 0 30px';
                                    if (isUpLeft) return '0 30px 30px 0';
                                    }

                                    if (index === selectedLetters.length - 1) {
                                    if (isRight) return '0 30px 30px 0';
                                    if (isLeft) return '30px 0 0 30px';
                                    if (isDown) return '0 0 30px 30px';
                                    if (isUp) return '30px 30px 0 0';
                                    if (isDownRight) return '0 30px 30px 0';
                                    if (isDownLeft) return '30px 0 0 30px';
                                    if (isUpRight) return '0 30px 30px 0';
                                    if (isUpLeft) return '30px 0 0 30px';
                                    }

                                    return '0';
                                })(),
                                }}
                                className="border border-gray-300"
                            >
                                <h3>{cell.letter}</h3>
                            </td>
                            );
                        })}
                        </tr>
                    ))}
                    </tbody>


                    </table>
                </div>
                </div>

        </div>
    );
};

export default WordPuzzleGame;