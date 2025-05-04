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
        <h2 className="text-2xl font-semibold mb-4">{nombre}</h2>
        <p className="text-2xl font-light">{profesion}</p>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin text-5xl mt-2 text-[#3489b7]" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

export default Card;