import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow font-nunito">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <img
            src="/assets/images/logo_simi2025.png"
            alt="Logo"
            className="h-16 mr-2"
          />
        </div>
        <ul className="flex space-x-8">
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/">Inicio</a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/#cards-section">Sobre nosotros</a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/juegos">Juegos</a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/#footer">Comunidad</a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/juegos">Apóyenos</a>
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