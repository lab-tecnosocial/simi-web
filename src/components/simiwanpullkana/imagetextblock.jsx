import React from 'react';

const ImageTextBlock = ({ imageSrc, title, description }) => {
    return (
        <div className="flex flex-col md:flex-row items-center my-4">
            <div className="md:w-1/2">
                <img src={imageSrc} alt={title} className="w-full h-auto rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                <h2 className="text-2xl font-bold text-blue-700">{title}</h2>
                <p className="mt-2 text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default ImageTextBlock;