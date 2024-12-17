import React from 'react';
//import zorrito from '../assets/images/juego/zorrito.png';

const cardsData = [
    {
        title: "ILUSTRACIÓN",
        description: "Te ofrecemos servicios de ilustración para tu proyecto teniendo en cuenta la pertinencia cultural",
        image: "src/components/assets/images/juego/zorrito.png",
    },
    {
        title: "TALLERES",
        description: "Realizamos talleres de iniciación en la ilustración y escritura de cuentos y comics en diferentes lenguas indígenas",
        image: "src/components/assets/images/juego/zorrito.png",
    },
    {
        title: "TRADUCCIÓN",
        description: "Te ayudamos en la traducción y edición de textos BILINGÛES (Quechua-Castellano)",
        image: "src/components/assets/images/juego/zorrito.png",
    },
];

const Simiwanpullkana = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">
                {cardsData.map((card, index) => (
                    <div key={index} style={{ backgroundColor: '#FCFEED' }} className="rounded-lg h-120 w-80 mx-auto">
                        <h2 className="text-xl text-center p-4">{card.title}</h2>
                        <img src={card.image} alt={card.title} className="w-full h-30 object-cover" />
                        <p className="text-gray-600 text-center p-4">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Simiwanpullkana;