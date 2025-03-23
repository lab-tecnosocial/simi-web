import React, { useState } from 'react';

const Header = () => {
  console.log('Header renderizado');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleDropdown = () => {
  console.log('Botón de dropdown clicado'); // Esto debería aparecer al hacer clic
  setIsDropdownOpen(prev => {
    const newState = !prev;
    console.log('Dropdown abierto:', newState); // Esto debería mostrar el nuevo estado
    return newState;
  });
};

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className="bg-white shadow text-2xl font-bold">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src="/assets/images/logo_simi2025.png" alt="Logo" className="h-16 mr-2" />
        </div>
        <button className="md:hidden text-gray-800 hover:text-green-500 focus:outline-none" onClick={toggleMenu}>
          Menu
        </button>
        <ul className={`flex-col md:flex md:flex-row md:space-x-8 header-navbar ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/">Inicio</a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/sobre_nosotros">Sobre nosotros</a>
          </li>
          <li className="relative">
            <button
              className="text-gray-800 hover:text-green-500 focus:outline-none"
              onClick={toggleDropdown}
            >
              Juegos <i className="fa fa-chevron-down ml-1"></i>
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                <li>
                  <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200" href="/juegos">Juegos</a>
                </li>
                <li>
                  <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200" href="/juego_de_mesa">Juego de mesa</a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/eventos">Comunidad <i className="fa fa-chevron-down ml-1"></i></a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="/apoyenos">Apóyenos</a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="#">
              <i className="fas fa-globe"></i>
            </a>
          </li>
          <li>
            <a className="text-gray-800 hover:text-green-500" href="#">
              <i className="fas fa-sun"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;