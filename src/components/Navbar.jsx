import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      {/* Opciones de perfil */}
      <div className="flex items-center space-x-4">
        <button className="text-white hover:bg-gray-700 px-4 py-2 rounded">Perfil</button>
        <button className="text-white hover:bg-gray-700 px-4 py-2 rounded">Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Navbar;
