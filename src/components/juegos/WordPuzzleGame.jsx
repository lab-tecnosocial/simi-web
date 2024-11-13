import { useEffect, useState } from "react";
import { answerWords } from "./words";
import wordList from "./WordList";


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
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutos en segundos
    const [isGameActive, setIsGameActive] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('animales');
    const [answerWords, setAnswerWords] = useState([]);
    const [foundWords, setFoundWords] = useState([]);

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
                // Si la letra ya está seleccionada, deseleccionarla
                const newSelection = [...prev];
                newSelection.splice(existingIndex, 1);
                return newSelection;
            } else {
                // Si la letra no está seleccionada, seleccionarla
                return [...prev, { letter, row, col }];
            }
        });
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-4 max-w-screen-lg mx-auto">
            <div className="flex flex-col items-start mb-6 w-full md:w-1/3">
                <h1 className="text-2xl mb-4">Sopa de letras - Qillqa jilli</h1>
                <p className="mb-2">Busca y resalta palabras ocultas en una cuadrícula de letras en el menor tiempo posible.</p>
                <div className="bg-gray-200 p-4 rounded mb-4">
                    <label htmlFor="category" className="block mb-4 text-base font-bold">Selecciona una categoría:</label>
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
                </div>
                <p className="mb-2">QUE: Usqayta pakasqa simikunata tarinayki tiyan.</p>
                <div className="bg-gray-200 p-4 rounded mb-4">
                    <div className="mb-4">
                        <h2>Palabras a buscar: {answerWords.join(", ")}</h2>
                    </div>
                    <div className="mb-4">
                        <h2>Palabras encontradas: {foundWords.join(", ")}</h2>
                    </div>
                    <div className="mb-4">
                        <h2>Tiempo restante: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</h2>
                    </div>
                    <button
                        onClick={initializeGame}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {isGameActive ? 'Reiniciar Juego' : 'Iniciar Juego'}
                    </button>
                </div>
                {!isGameActive && foundWords.length === answerWords.length && (
                    <div className="bg-green-200 p-4 rounded mb-4">
                        <h2>¡Felicitaciones! Has encontrado todas las palabras.</h2>
                    </div>
                )}
                {!isGameActive && timeLeft === 0 && (
                    <div className="bg-red-200 p-4 rounded mb-4">
                        <h2>Fin del juego. Se acabó el tiempo.</h2>
                    </div>
                )}
            </div>
            <div className="flex-grow flex items-center justify-center">
                <table className="table-auto border-collapse border border-gray-300">
                    <tbody>
                        {matrix.map((rowData, rowIndex) => (
                            <tr key={rowIndex}>
                                {rowData.map((cell, colIndex) => (
                                    <td
                                        key={colIndex}
                                        onClick={() => handleLetterClick(cell.letter, rowIndex, colIndex)}
                                        style={{
                                            backgroundColor: selectedLetters.some((l) => l.row === rowIndex && l.col === colIndex) ? 'lightblue' : (highlightAnswers && cell.isAnswer ? 'aliceblue' : 'white'),
                                            cursor: 'pointer',
                                            width: '40px',
                                            height: '40px',
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                        }}
                                        className="border border-gray-300"
                                    >
                                        <h3>{cell.letter}</h3>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WordPuzzleGame;