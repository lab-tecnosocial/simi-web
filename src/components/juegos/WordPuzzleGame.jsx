// src/components/WordPuzzleGame.js
import { useEffect, useState } from "react";
import { answerWords } from "./words"; // Asegúrate de que la ruta sea correcta

const generateRandomMatrix = (rows, cols, words) => {
    const letters = "abcdefghijklmnopqrstuvwxyz"; // Letras para elegir
    const matrix = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => letters[Math.floor(Math.random() * letters.length)])
    );

    // Intentamos colocar las palabras en la matriz
    words.forEach((word) => {
        let placed = false;
        while (!placed) {
            const direction = Math.random() < 0.33 ? 'horizontal' : (Math.random() < 0.5 ? 'vertical' : 'diagonal'); // Elegir dirección al azar
            const startRow = Math.floor(Math.random() * rows);
            const startCol = Math.floor(Math.random() * cols);

            // Comprobar si la palabra cabe en la dirección elegida
            if (direction === 'horizontal' && startCol + word.length <= cols) {
                let canPlace = true;
                for (let i = 0; i < word.length; i++) {
                    if (matrix[startRow][startCol + i] !== letters[Math.floor(Math.random() * letters.length)]) {
                        canPlace = false;
                        break;
                    }
                }
                if (canPlace) {
                    for (let i = 0; i < word.length; i++) {
                        matrix[startRow][startCol + i] = word[i]; // Colocar la palabra
                    }
                    placed = true;
                }
            } else if (direction === 'vertical' && startRow + word.length <= rows) {
                let canPlace = true;
                for (let i = 0; i < word.length; i++) {
                    if (matrix[startRow + i][startCol] !== letters[Math.floor(Math.random() * letters.length)]) {
                        canPlace = false;
                        break;
                    }
                }
                if (canPlace) {
                    for (let i = 0; i < word.length; i++) {
                        matrix[startRow + i][startCol] = word[i]; // Colocar la palabra
                    }
                    placed = true;
                }
            } else if (direction === 'diagonal' && startRow + word.length <= rows && startCol + word.length <= cols) {
                let canPlace = true;
                for (let i = 0; i < word.length; i++) {
                    if (matrix[startRow + i][startCol + i] !== letters[Math.floor(Math.random() * letters.length)]) {
                        canPlace = false;
                        break;
                    }
                }
                if (canPlace) {
                    for (let i = 0; i < word.length; i++) {
                        matrix[startRow + i][startCol + i] = word[i]; // Colocar la palabra
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
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [foundWords, setFoundWords] = useState([]);

    const initializeGame = () => {
        const newMatrix = generateRandomMatrix(11, 12, answerWords); // Generar matriz con palabras
        setMatrix(newMatrix);
        setFoundWords([]); // Reiniciar palabras encontradas
    };

    useEffect(() => {
        initializeGame(); // Inicializar el juego al cargar
    }, []);

    const handleMouseDown = (letter, row, col) => {
        setIsSelecting(true);
        setSelectedLetters([{ letter, row, col }]);
    };

    const handleMouseOver = (letter, row, col) => {
        if (isSelecting) {
            const lastSelected = selectedLetters[selectedLetters.length - 1];
            const rowDiff = row - lastSelected.row;
            const colDiff = col - lastSelected.col;

            // Verificar si es selección horizontal, vertical o diagonal
            if (Math.abs(rowDiff) === Math.abs(colDiff) || rowDiff === 0 || colDiff === 0) {
                setSelectedLetters((prev) => {
                    const newSelection = [...prev];
                    // Añadir letras seleccionadas
                    if (rowDiff === 0) {
                        // Horizontal
                        for (let i = Math.min(lastSelected.col, col); i <= Math.max(lastSelected.col, col); i++) {
                            if (!newSelection.find(l => l.row === lastSelected.row && l.col === i)) {
                                newSelection.push({ letter: matrix[lastSelected.row][i], row: lastSelected.row, col: i });
                            }
                        }
                    } else if (colDiff === 0) {
                        // Vertical
                        for (let i = Math.min(lastSelected.row, row); i <= Math.max(lastSelected.row, row); i++) {
                            if (!newSelection.find(l => l.row === i && l.col === lastSelected.col)) {
                                newSelection.push({ letter: matrix[i][lastSelected.col], row: i, col: lastSelected.col });
                            }
                        }
                    } else {
                        // Diagonal
                        const stepRow = rowDiff > 0 ? 1 : -1;
                        const stepCol = colDiff > 0 ? 1 : -1;
                        for (let i = 0; i <= Math.abs(rowDiff); i++) {
                            const newRow = lastSelected.row + i * stepRow;
                            const newCol = lastSelected.col + i * stepCol;
                            if (!newSelection.find(l => l.row === newRow && l.col === newCol)) {
                                newSelection.push({ letter: matrix[newRow][newCol], row: newRow, col: newCol });
                            }
                        }
                    }
                    return newSelection;
                });
            }
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        const selectedWord = selectedLetters.map((l) => l.letter).join("");

        if (answerWords.includes(selectedWord)) {
            setFoundWords((prev) => [...prev, selectedWord]);
        }

        setSelectedLetters([]);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-4 max-w-screen-lg mx-auto">
            <div className="flex flex-col items-start mb-6 w-full md:w-1/3">
                <h1 className="text-2xl mb-4">Sopa de letras - Qillqa jilli</h1>
                <p className="mb-2">Busca y resalta palabras ocultas en una cuadrícula de letras en el menor tiempo posible.</p>
                <p className="mb-2">QUE: Usqayta pakasqa simikunata tarinayki tiyan.</p>
                <div className="bg-gray-200 p-4 rounded mb-4">
                    <div className="mb-4">
                        <h2>Palabras a buscar: {answerWords.join(", ")}</h2>
                    </div>
                    <div className="mb-4">
                        <h2>Palabras encontradas: {foundWords.join(", ")}</h2>
                    </div>
                    <button
                        onClick={initializeGame}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Reiniciar Juego
                    </button>
                </div>
            </div>
            <div className="flex-grow flex items-center justify-center"> {/* Cuadrícula de letras */}
                <table className="table-auto border-collapse border border-gray-300" onMouseLeave={() => setIsSelecting(false)}>
                    <tbody>
                        {matrix.map((rowData, rowIndex) => (
                            <tr key={rowIndex}>
                                {rowData.map((letter, colIndex) => (
                                    <td
                                        key={colIndex}
                                        onMouseDown={() => handleMouseDown(letter, rowIndex, colIndex)}
                                        onMouseOver={() => handleMouseOver(letter, rowIndex, colIndex)}
                                        onMouseUp={handleMouseUp}
                                        style={{
                                            backgroundColor: selectedLetters.some((l) => l.row === rowIndex && l.col === colIndex) ? 'lightblue' : 'white',
                                            cursor: 'pointer',
                                            width: '40px',
                                            height: '40px',
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                        }}
                                        className="border border-gray-300"
                                    >
                                        <h3>{letter}</h3>
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