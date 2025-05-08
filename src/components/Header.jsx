import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
  const [isDropdownGamesOpen, setIsDropdownGamesOpen] = useState(false);
  const [isDropdownCommunityOpen, setIsDropdownCommunityOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const dropdownGamesRef = useRef(null);
  const dropdownCommunityRef = useRef(null);

  // Efecto para manejar clics fuera de los dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownGamesRef.current && !dropdownGamesRef.current.contains(event.target)
      ) {
        setIsDropdownGamesOpen(false);
      }
      
      if (
        dropdownCommunityRef.current && !dropdownCommunityRef.current.contains(event.target)
      ) {
        setIsDropdownCommunityOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdownGames = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownGamesOpen(prev => !prev);
    // Cerrar el otro dropdown
    setIsDropdownCommunityOpen(false);
  };

  const toggleDropdownCommunity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownCommunityOpen(prev => !prev);
    // Cerrar el otro dropdown
    setIsDropdownGamesOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    // Cerrar dropdowns cuando se abre/cierra el menú móvil
    setIsDropdownGamesOpen(false);
    setIsDropdownCommunityOpen(false);
  };

  return (
    <header className="bg-white shadow text-2xl font-bold text-futuro">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center justify-center md:justify-start">
          <img src="/assets/images/logo_simi2025.png" alt="Logo" className="h-16 mr-2" />
        </div>
        
        {/* Botón Hamburguesa */}
        <button 
          className="md:hidden text-futuro hover:text-green-500 focus:outline-none z-50"
          onClick={toggleMenu}
        >
          <span className="block w-6 h-0.5 bg-futuro my-1"></span>
          <span className="block w-6 h-0.5 bg-futuro my-1"></span>
          <span className="block w-6 h-0.5 bg-futuro my-1"></span>
        </button>

        {/* Menú principal */}
        <ul 
          className={`
            fixed inset-0 bg-white flex-col items-center justify-center 
            md:static md:flex md:flex-row md:space-x-8 
            ${isMenuOpen ? 'flex' : 'hidden'} 
            md:flex z-40
          `}
        >
          <li className="md:hidden absolute top-4 right-4">
            <button 
              className="text-futuro hover:text-green-500 focus:outline-none"
              onClick={toggleMenu}
            >
              ✕
            </button>
          </li>
          
          <li className="my-2 md:my-0">
            <a className="text-futuro hover:text-green-500" href="/" onClick={toggleMenu}>Inicio</a>
          </li>
          
          <li className="my-2 md:my-0">
            <a className="text-futuro hover:text-green-500" href="/sobre_nosotros" onClick={toggleMenu}>Sobre nosotros</a>
          </li>
          
          {/* Dropdown Juegos */}
          <li className="relative my-2 md:my-0" ref={dropdownGamesRef}>
            <button
              type="button"
              className="text-futuro hover:text-green-500 focus:outline-none flex items-center"
              onClick={toggleDropdownGames}
            >
              Juegos 
              <i className={`fa fa-chevron-${isDropdownGamesOpen ? 'up' : 'down'} ml-1`}></i>
            </button>
            {isDropdownGamesOpen && (
              <ul 
                className="md:absolute left-0 mt-2 w-48 bg-white rounded z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <li>
                  <a 
                    className="block px-4 py-2 text-futuro hover:bg-gray-200" 
                    href="/juegos"
                    onClick={() => {
                      setIsDropdownGamesOpen(false);
                      toggleMenu();
                    }}
                  >
                    Juegos
                  </a>
                </li>
                <li>
                  <a 
                    className="block px-4 py-2 text-futuro hover:bg-gray-200" 
                    href="/simiwanpullkana"
                    onClick={() => {
                      setIsDropdownGamesOpen(false);
                      toggleMenu();
                    }}
                  >
                    Juego de mesa
                  </a>
                </li>
              </ul>
            )}
          </li>
          
          {/* Dropdown Comunidad */}
          <li className="relative my-2 md:my-0" ref={dropdownCommunityRef}>
            <button
              type="button"
              className="text-futuro hover:text-green-500 focus:outline-none flex items-center"
              onClick={toggleDropdownCommunity}
            >
              Comunidad 
              <i className={`fa fa-chevron-${isDropdownCommunityOpen ? 'up' : 'down'} ml-1`}></i>
            </button>
            {isDropdownCommunityOpen && (
              <ul 
                className="md:absolute left-0 mt-2 w-48 bg-white rounded z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <li>
                  <a 
                    className="block px-4 py-2 text-futuro hover:bg-gray-200" 
                    href="/eventos"
                    onClick={() => {
                      setIsDropdownCommunityOpen(false);
                      toggleMenu();
                    }}
                  >
                    Eventos
                  </a>
                </li>
                <li>
                  <a 
                    className="block px-4 py-2 text-futuro hover:bg-gray-200" 
                    href="/blog"
                    onClick={() => {
                      setIsDropdownCommunityOpen(false);
                      toggleMenu();
                    }}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a 
                    className="block px-4 py-2 text-futuro hover:bg-gray-200" 
                    href="/preguntas_frecuentes"
                    onClick={() => {
                      setIsDropdownCommunityOpen(false);
                      toggleMenu();
                    }}
                  >
                    Preguntas frecuentes
                  </a>
                </li>
              </ul>
            )}
          </li>
          
          <li className="my-2 md:my-0">
            <a className="text-futuro hover:text-green-500" href="/apoyenos" onClick={toggleMenu}>Apóyenos</a>
          </li>
          
          <li className="my-2 md:my-0">
            <a className="text-futuro hover:text-green-500" href="#">
              <i className="fas fa-globe"></i>
            </a>
          </li>
          
          <li className="my-2 md:my-0">
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