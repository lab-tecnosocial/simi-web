import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow text-lg font-nunito">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <img
            src="/assets/images/logo_simi2025.png"
            alt="Logo"
            className="h-16 mr-2"
          />
        </div>
        <ul className="flex space-x-8 font-nunito">
          <li>
            <a className="text-gray-800 hover:text-green-500 font-nunito" href="/">Inicio</a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/sobre_nosotros">Sobre nosotros</a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/juegos">Juegos</a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/eventos">Comunidad</a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/apoyenos">Apóyenos</a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="">
              <i className="fas fa-globe"></i>
            </a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="">
              <i className="fas fa-sun"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;