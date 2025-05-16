import { useEffect, useState } from "react";
import { answerWords } from "./words";
import wordList from "./WordList";
import GameOver from "./GameOver";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const generateRandomMatrix = (rows, cols, words) => {
    const letters = "abcdefghijklmnopqrstuvwxyz'";
    const matrix = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
            letter: letters[Math.floor(Math.random() * letters.length)],
            isAnswer: false
        }))
    );

    const wordPositions = []; // Almacena todas las posiciones de palabras

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
                    const positions = [];
                    for (let i = 0; i < word.length; i++) {
                        matrix[startRow][startCol + i] = { letter: word[i], isAnswer: true };
                        positions.push({ row: startRow, col: startCol + i });
                    }
                    wordPositions.push({ word, positions });
                    placed = true;
                }
            }
            // ... (similar para vertical y diagonal)
        }
    });

    return { matrix, wordPositions };
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
const [foundWordsData, setFoundWordsData] = useState([]); // Almacena palabra + posiciones
const [allWordPositions, setAllWordPositions] = useState([]); // Nuevo estado

    const getRandomWords = (category, count) => {
        const words = wordList[category];
        const shuffled = words.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    useEffect(() => {
        const selectedWord = selectedLetters.map((l) => l.letter).join("");
        
        if (answerWords.includes(selectedWord) && !foundWords.includes(selectedWord)) {
            // Actualiza todos los estados de forma consistente
            setFoundWords(prev => [...prev, selectedWord]);
            setFoundWordsData(prev => [...prev, {
                word: selectedWord,
                positions: [...selectedLetters]
            }]);
            
            // Elimina la palabra de answerWords
            setAnswerWords(prev => prev.filter(word => word !== selectedWord));
            
            // Limpia las letras seleccionadas
            setSelectedLetters([]);
        }
    }, [selectedLetters, answerWords, foundWords]);

    useEffect(() => {
        setAnswerWords(getRandomWords(selectedCategory, 4));
    }, [selectedCategory]);

    const initializeGame = () => {
        const { matrix, wordPositions } = generateRandomMatrix(11, 12, answerWords);
        setMatrix(matrix);
        setAllWordPositions(wordPositions); // Guarda todas las posiciones
        setFoundWords([]);
        setFoundWordsData([]);
        setSelectedLetters([]);
        setTimeLeft(180);
        setIsGameActive(true);
    };

    const revealAllWords = () => {
        const newMatrix = [...matrix];
        allWordPositions.forEach(({ positions }) => {
            positions.forEach(({ row, col }) => {
                newMatrix[row][col] = {
                    ...newMatrix[row][col],
                    revealed: true // Marca como revelada
                };
            });
        });
        setMatrix(newMatrix);
    };

    useEffect(() => {
        if (isGameActive && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setIsGameActive(false);
            revealAllWords(); // Revela las palabras al terminar el tiempo
        }
    }, [isGameActive, timeLeft]);

    

    useEffect(() => {
        if (foundWords.length === 4) {
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

    const getCellBorderRadius = (row, col, selectedLetters, foundWordsData) => {
        // Para palabras seleccionadas temporalmente
        const selectedIndex = selectedLetters.findIndex(l => l.row === row && l.col === col);
        if (selectedIndex !== -1) {
            if (selectedLetters.length === 1) return '50%';
            
            const isFirst = selectedIndex === 0;
            const isLast = selectedIndex === selectedLetters.length - 1;
            
            if (isFirst || isLast) {
                const direction = getSelectionDirection(selectedLetters);
                return getRoundedCornersForEnd(selectedIndex, selectedLetters.length, direction);
            }
            return '0';
        }
        
        // Para palabras ya encontradas
        const foundWord = foundWordsData.find(wordData => 
            wordData.positions.some(pos => pos.row === row && pos.col === col)
        );
        
        if (foundWord) {
            const positionIndex = foundWord.positions.findIndex(pos => pos.row === row && pos.col === col);
            const isFirst = positionIndex === 0;
            const isLast = positionIndex === foundWord.positions.length - 1;
            
            if (isFirst || isLast) {
                const direction = getSelectionDirection(foundWord.positions);
                return getRoundedCornersForEnd(positionIndex, foundWord.positions.length, direction);
            }
        }
        
        return '0';
    };
    
    const getSelectionDirection = (positions) => {
        if (positions.length < 1) return 'single';
        
        const first = positions[0];
        const last = positions[positions.length - 1];
        
        // Umbral para considerar diagonal (ajusta según necesidad)
        const diagonalThreshold = 0.2;
        
        const rowDiff = Math.abs(first.row - last.row);
        const colDiff = Math.abs(first.col - last.col);
        
        if (rowDiff === 0) return 'horizontal';
        if (colDiff === 0) return 'vertical';
        
        const ratio = rowDiff / colDiff;
        if (Math.abs(ratio - 1) < diagonalThreshold) return 'diagonal';
        
        return 'single';
      };
    
    const getRoundedCornersForEnd = (index, length, direction) => {
        const isFirst = index === 0;
        const isLast = index === length - 1;
        
        if (direction === 'horizontal') {
            if (isFirst) return '30px 0 0 30px';
            if (isLast) return '0 30px 30px 0';
        }
        else if (direction === 'vertical') {
            if (isFirst) return '30px 30px 0 0';
            if (isLast) return '0 0 30px 30px';
        }
        else if (direction === 'diagonal') {
            if (isFirst) return '30px 0 0 30px';
            if (isLast) return '0 30px 30px 0';
        }
        
        return '0';
    };

    const DiagonalLine = ({ start, end, color }) => {
        const cells = (Math.abs(end.col - start.col) + 1);
        const length = (cells * 65);
        const angle = Math.atan2(end.row - start.row, end.col - start.col) * 192 / Math.PI;

        const posY = (start.row * 50) + 120;
        const posX = (start.col * 45) + 480;

        useEffect(() => {
            console.log("Fila inicial: ", start.row);
            console.log("Columna inicial: ", start.col);
            console.log("Fila final: ", end.row);
            console.log("Columna final: ", end.col);

            console.log("Casillas: ", cells);
            console.log("Longitud: ", length);

            console.log("Posicion Y: ", posY);
            console.log("Posicion Y: ", posX);
          }, []); // Array vacío significa que solo se ejecuta en el montaje
        
        return (
          <div 
            style={{
              position: 'absolute',
              top: `${posY}px`,
              left: `${posX}px`,
              width: `${length}px`,
              height: '50px',
              backgroundColor: color,
              transformOrigin: '0 0',
              transform: `rotate(${angle}deg)`,
              zIndex: 1,
              borderRadius: '25px'
            }}
          />
        );
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
                                {foundWordsData.map((wordData, index) => (
                                    <span key={index} className="flex items-center justify-center font-black font-[Nunito] w-[73.94px] h-[41.79px] bg-white text-gray-800 px-2 py-1 rounded-[5.36px] m-1 drop-shadow-[2px_2px_5px_rgba(89,203,7,0.25)]">
                                        {wordData.word}
                                    </span>
                                ))}
                            </div>
                        </div> 
                    </div>
                {!isGameActive && foundWords.length === 4 && (
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
                <div className="lg:w-[552px] lg:h-[552px] flex items-center justify-center ml-[55px] mt-[-100px] md:w-[400px] md:h-[400px]">
                    <table className="lg:w-[552px] lg:h-[552px] table-auto border-collapse border border-gray-300 font-nunito font-bold text-[24px] text-neutral-600 md:w-[400px] md:h-[400px]">
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
                                // Dentro del return del componente, modifica el estilo de las celdas:
                                style={{
                                    backgroundColor: 
                                    getSelectionDirection(selectedLetters) !== 'diagonal' && 
                                    (selectedLetters.some(l => l.row === rowIndex && l.col === colIndex) ||
                                    foundWordsData.some(wordData => 
                                    wordData.positions.some(pos => pos.row === rowIndex && pos.col === colIndex)
                                    ))
                                    ? 'rgba(89, 203, 7, 0.5)'
                                        :cell.revealed && !foundWordsData.some(w => w.positions.some(p => p.row === rowIndex && p.col === colIndex))
                                            ? 'rgba(255, 0, 0, 0.3)'
                                            : selectedLetters.some(l => l.row === rowIndex && l.col === colIndex)
                                                ? 'rgba(89, 203, 7, 0.5)'
                                                : foundWordsData.some(wordData =>
                                                    wordData.positions.some(
                                                        pos => pos.row === rowIndex && pos.col === colIndex
                                                    )
                                                )
                                                    ? 'rgba(89, 203, 7, 0.5)'
                                                    : highlightAnswers && cell.isAnswer
                                                        ? 'black'
                                                        : 'white',
                                    cursor: 'pointer',
                                    width: '46px',
                                    height: '46px',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderRadius: getCellBorderRadius(rowIndex, colIndex, selectedLetters, foundWordsData),
                                    border: '1px solid gray',
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

                    {/* Renderizado de líneas diagonales */}
  {selectedLetters.length > 1 && 
    getSelectionDirection(selectedLetters) === 'diagonal' && (
      <DiagonalLine 
        start={selectedLetters[0]}
        end={selectedLetters[selectedLetters.length - 1]}
        color="rgba(89, 203, 7, 0.5)"
      />
    )
  }
  
  {foundWordsData.map((wordData) => (
    wordData.positions.length > 1 && 
    getSelectionDirection(wordData.positions) === 'diagonal' && (
      <DiagonalLine
        key={wordData.word}
        start={wordData.positions[0]}
        end={wordData.positions[wordData.positions.length - 1]}
        color="rgba(89, 203, 7, 0.5)"
      />
    )
  ))}
                </div>
                </div>

        </div>
    );
};

export default WordPuzzleGame;