import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Botón de menú para pantallas pequeñas */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 text-white bg-blue-800 fixed top-4 left-4 z-50"
      >
        ☰
      </button>

      {/* Barra lateral */}
      <div className={`md:w-64 bg-gray-800 text-white p-6 h-full transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-64'} md:translate-x-0 fixed md:relative`}>
        <h2 className="text-2xl font-semibold mb-8">NEXUS OS</h2>
        <ul>
          <li className="mb-4">
            <Link to="/" className="hover:bg-gray-700 p-2 rounded block">Inicio</Link>
          </li>
          <li className="mb-4">
            <Link to="/clients" className="hover:bg-gray-700 p-2 rounded block">Clientes</Link>
          </li>
          <li className="mb-4">
            <Link to="/products" className="hover:bg-gray-700 p-2 rounded block">Productos</Link>
          </li>
          <li className="mb-4">
            <Link to="/receipts" className="hover:bg-gray-700 p-2 rounded block">Recibos</Link>
          </li>
          <li className="mb-4">
            <Link to="/details" className="hover:bg-gray-700 p-2 rounded block">Detalles</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
