import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HiHome, 
  HiShoppingBag, 
  HiUsers, 
  HiDocumentText, 
  HiViewList,
  HiMenu,
  HiX,
  HiChartBar
} from 'react-icons/hi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      path: '/',
      label: 'Inicio',
      icon: HiHome,
      description: 'Panel principal'
    },
    {
      path: '/products',
      label: 'Productos',
      icon: HiShoppingBag,
      description: 'Gestión de productos'
    },
    {
      path: '/clients',
      label: 'Clientes',
      icon: HiUsers,
      description: 'Gestión de clientes'
    },
    {
      path: '/receipts',
      label: 'Recibos',
      icon: HiDocumentText,
      description: 'Gestión de recibos'
    },
    {
      path: '/details',
      label: 'Detalles',
      icon: HiViewList,
      description: 'Detalles de recibos'
    }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div>
      {/* Botón de menú para pantallas pequeñas */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-200 hover:shadow-xl"
        aria-label="Toggle menu"
      >
        {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
      </button>

      {/* Overlay para pantallas pequeñas */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Barra lateral */}
      <div className={`
        md:w-72 w-80 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white h-full 
        transition-all duration-500 ease-out backdrop-blur-xl
        ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} 
        md:translate-x-0 md:opacity-100 fixed md:relative z-50
        shadow-2xl border-r border-gray-700/50
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-teal-500/10 before:to-blue-500/10 before:pointer-events-none
      `}>
        {/* Header del sidebar */}
        <div className="p-6 border-b border-gray-700/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5"></div>
          <div className="relative flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25 ring-2 ring-teal-500/20">
              <HiChartBar className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white drop-shadow-sm">LUIS ANGEL</h2>
              <p className="text-sm text-gray-300 font-medium">Sistema de Gestión</p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out
                  ${active 
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-600/30 scale-105' 
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white hover:scale-105 hover:shadow-md'
                  }
                  before:absolute before:inset-0 before:rounded-xl before:transition-opacity before:duration-300
                  ${active ? 'before:bg-gradient-to-r before:from-teal-500/20 before:to-blue-500/20 before:opacity-100' : 'before:opacity-0'}
                `}
              >
                <div className={`relative z-10 p-1 rounded-lg transition-all duration-300 ${active ? 'bg-white/20' : 'group-hover:bg-white/10'}`}>
                  <Icon className={`w-5 h-5 transition-all duration-300 ${active ? 'text-white drop-shadow-sm' : 'text-gray-400 group-hover:text-white group-hover:scale-110'}`} />
                </div>
                <div className="flex-1 relative z-10">
                  <div className="font-medium transition-all duration-300">{item.label}</div>
                  <div className={`text-xs transition-all duration-300 ${active ? 'text-teal-100' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {item.description}
                  </div>
                </div>
                {active && (
                  <div className="relative z-10 w-2 h-2 bg-white rounded-full shadow-sm animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer del sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50">
          <div className="relative group flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl backdrop-blur-sm border border-gray-600/30 hover:from-gray-700/60 hover:to-gray-600/60 transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              <HiUsers className="w-5 h-5 text-white drop-shadow-sm" />
            </div>
            <div className="flex-1 relative">
              <div className="text-sm font-semibold text-white drop-shadow-sm">Usuario</div>
              <div className="text-xs text-gray-300 font-medium">Administrador</div>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-sm animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
