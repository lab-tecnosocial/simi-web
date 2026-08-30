// src/components/sobreNosotros/Logos.jsx
import React from 'react';

const Logos = ({ labTecnosocialLogo, atuqYachachiqLogo, quichwaNina }) => {
  return (
    <div className="p-8">
      <h2 className="text-4xl font-medium mb-20 text-center">Una iniciativa de:</h2>
      <div className="grid grid-cols-2  md:grid-cols-2 mb-24">
        <div className="flex justify-center">
          <img src={labTecnosocialLogo?.src} alt="logolabtecnosocial" className="h-52 w-auto" />
        </div>
        <div className="flex justify-center">
          <img src={atuqYachachiqLogo?.src} alt="logoatuqyachachiq" className="h-72" />
        </div>
      </div>

      <h2 className="text-4xl font-medium mb-20 text-center">Colaboradores</h2>
        <div className="flex justify-center mb-18">
          <img src={quichwaNina?.src} alt="qhichwa" className="h-96" />
        </div>
    </div>
  );
};

export default Logos;