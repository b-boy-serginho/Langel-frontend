import React, { useState } from 'react';
import { 
  HiBell, 
  HiSearch, 
  HiUser, 
  HiCog, 
  HiLogout,
  HiMenuAlt2,
  HiSun,
  HiMoon
} from 'react-icons/hi';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-900/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-50/30 via-transparent to-blue-50/30"></div>
      <div className="relative px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Lado izquierdo - Breadcrumb y búsqueda */}
          <div className="flex items-center space-x-6">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm">
              {/* <span className="font-semibold text-gray-700 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Dashboard</span> */}
              {/* <span className="text-gray-400">/</span> */}
              <span className="text-gray-500 font-medium">Panel Principal</span>
            </div>
          </div>

          {/* Lado derecho - Acciones */}
          <div className="flex items-center space-x-4">
            {/* Barra de búsqueda */}
            {/* <div className="relative hidden md:block group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                className="block w-64 pl-10 pr-3 py-2.5 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 focus:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div> */}

            {/* Botón de modo oscuro */}
            {/* <button
              onClick={toggleDarkMode}
              className="group relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md"
              aria-label="Toggle dark mode"
            >
              <div className="relative">
                {isDarkMode ? (
                  <HiSun className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <HiMoon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                )}
              </div>
            </button> */}

            {/* Notificaciones */}
            {/* <button className="group relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md">
              <HiBell className="h-5 w-5 group-hover:animate-bounce" />
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-sm animate-pulse"></span>
            </button> */}

            {/* Menú de perfil */}
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="group flex items-center space-x-3 p-2 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/25 ring-2 ring-teal-500/20 group-hover:scale-110 transition-transform duration-300">
                  <HiUser className="h-4 w-4 text-white drop-shadow-sm" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-semibold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Luis Angel</div>
                  <div className="text-xs text-gray-500 font-medium">Administrador</div>
                </div>
              </button>

              {/* Dropdown del perfil */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-900/10 border border-gray-200/50 py-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-gray-100/50">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cuenta</div>
                  </div>
                  <button className="group flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                      <HiUser className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium">Mi Perfil</span>
                  </button>
                  <button className="group flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                      <HiCog className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="font-medium">Configuración</span>
                  </button>
                  <div className="my-2 border-t border-gray-100/50"></div>
                  <button className="group flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                      <HiLogout className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
