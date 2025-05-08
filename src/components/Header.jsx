import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
  console.log('Header renderizado');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Efecto para manejar clics fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Añadir listener al documento
    document.addEventListener('mousedown', handleClickOutside);
    
    // Limpiar el listener al desmontar
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    // Prevenir comportamiento por defecto
    e.preventDefault();
    e.stopPropagation();

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
    <header className="bg-white shadow text-2xl font-bold text-futuro">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center justify-center md:justify-start">
          <img src="/assets/images/logo_simi2025.png" alt="Logo" className="h-16 mr-2" />
        </div>
        <button className="md:hidden text-futuro hover:text-green-500 focus:outline-none" onClick={toggleMenu}>
          Menu
        </button>
        <ul className={`flex-col md:flex md:flex-row md:space-x-8 header-navbar ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
          <li>
            <a className="text-futuro hover:text-green-500" href="/">Inicio</a>
          </li>
          <li>
            <a className="text-futuro hover:text-green-500" href="/sobre_nosotros">Sobre nosotros</a>
          </li>
          <li className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="text-futuro hover:text-green-500 focus:outline-none flex items-center"
              onClick={toggleDropdown}
            >
              Juegos 
              <i className={`fa fa-chevron-${isDropdownOpen ? 'up' : 'down'} ml-1`}></i>
            </button>
            {isDropdownOpen && (
              <ul 
                className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-50"
                onClick={(e) => e.stopPropagation()} // Prevenir que el clic cierre el dropdown
              >
                <li>
                  <a 
                    className="block px-4 py-2 text-futuro hover:bg-gray-200" 
                    href="/juegos"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Juegos
                  </a>
                </li>
                <li>
                  <a 
                    className="block px-4 py-2 text-futuro hover:bg-gray-200" 
                    href="/simiwanpullkana"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Juego de mesa
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="text-futuro hover:text-green-500 focus:outline-none flex items-center"
              onClick={toggleDropdown}
            >
              Comunidad 
              <i className={`fa fa-chevron-${isDropdownOpen ? 'up' : 'down'} ml-1`}></i>
            </button>
            {isDropdownOpen && (
              <ul 
                className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-50"
                onClick={(e) => e.stopPropagation()} // Prevenir que el clic cierre el dropdown
              >
                <li>
                  <a 
                    className="block px-4 py-2 text-futuro hover:bg-gray-200" 
                    href="/juegos"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Eventos
                  </a>
                </li>
                <li>
                  <a 
                    className="block px-4 py-2 text-futuro hover:bg-gray-200" 
                    href="/eventos"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a 
                    className="block px-4 py-2 text-futuro hover:bg-gray-200" 
                    href="/preguntas_frecuentes"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Preguntas frecuentes
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a className="text-futuro hover:text-green-500" href="/apoyenos">Apóyenos</a>
          </li>
          <li>
            <a className="text-futuro hover:text-green-500" href="#">
              <i className="fas fa-globe"></i>
            </a>
          </li>
          <li>
            <a className="text-futuro hover:text-green-500" href="#">
              <i className="fas fa-sun"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;