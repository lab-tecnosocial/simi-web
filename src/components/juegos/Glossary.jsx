// src/components/Glossary.jsx
import React from 'react';

const Glossary = ({ gameData }) => {
    const playAudio = (audio) => {
        if (audio) {
            const audioElement = new Audio(audio);
            audioElement.play().catch((error) => {
                console.error("Error al reproducir el audio:", error);
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold mb-4 text-center">GLOSARIO</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(gameData.temas).map(([tema, palabras]) => (
                    <div key={tema} className="mb-4">
                        <h2 className="text-2xl font-semibold">{tema}</h2>
                        <ul className="list-disc pl-5">
                            {palabras.map((palabra) => (
                                <li key={palabra.id} className="my-2 flex items-center">
                                    <span 
                                        className="mr-2 cursor-pointer" 
                                        onClick={() => playAudio(palabra.audio)}
                                    >
                                        🔊 
                                    </span>
                                    <span>{palabra.word}: {palabra.definition || 'Definición no disponible'}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Glossary;