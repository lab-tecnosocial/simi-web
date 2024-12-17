import React, { useState } from 'react';

const Carousel = () => {
    const images = [
        '/src/components/assets/images/juego/carrusel_atuq/1.png',
        '/src/components/assets/images/juego/carrusel_atuq/2.png',
        '/src/components/assets/images/juego/carrusel_atuq/3.png',
        '/src/components/assets/images/juego/carrusel_atuq/4.png',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative my-4">
            <div className="overflow-hidden">
                <div 
                    className="flex transition-transform duration-500" 
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <img 
                            key={index} 
                            src={image} 
                            alt={`Slide ${index + 1}`} 
                            className="w-full h-80 object-contain flex-shrink-0" 
                        />
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index ? 'bg-blue-700' : 'bg-gray-300'}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;