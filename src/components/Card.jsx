// Card.jsx
import React from 'react';

const Card = ({ nombre, imagen, linkedin, profesion, portfolio }) => {
  // Determina si el link de portfolio es de Instagram
  const esInstagram = portfolio && portfolio.includes("instagram.com");

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
        <div className="flex justify-center gap-4 mt-2">
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin text-5xl text-[#3489b7]" aria-hidden="true"></i>
            </a>
          )}
          {portfolio && (
            <a href={portfolio} target="_blank" rel="noopener noreferrer">
              <i className={`${esInstagram ? "fab fa-instagram" : "fas fa-globe"} text-5xl ${esInstagram ? "text-[#E1306C]" : "text-[#4B4B4B]"}`} aria-hidden="true"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;