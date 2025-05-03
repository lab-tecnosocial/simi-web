// Card.jsx
import React from 'react';

const Card = ({ nombre, imagen, linkedin, profesion }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden flex flex-col items-center m-2">
      {/* Imagen circular y centrada */}
      <img
        className="w-48 h-48 object-cover rounded-full mt-4" 
        src={imagen}
        alt={nombre}
      />
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">{nombre}</h2>
        <p className="text-gray-600">{profesion}</p>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin w-6 h-6 mt-2 text-blue-700" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

export default Card;