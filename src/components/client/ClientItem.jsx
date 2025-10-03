import React from 'react';
import { Link } from 'react-router-dom';

const ClientItem = ({ client, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
      <div className="text-lg font-semibold mb-2">{client.name}</div>
      {/* <div className="text-sm text-gray-500 mb-2">Correo: {client.email}</div>
      <div className="text-sm text-gray-500 mb-4">Telefono: {client.phone}</div> */}
       {/* Aquí agregamos el botón para redirigir a la página de recibos */}
      <Link 
        to={`/receipts/${client.id}`} 
        className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Ver Recibos
      </Link>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(client)}
          className="text-blue-500 hover:text-blue-700"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(client.id)}
          className="text-red-500 hover:text-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ClientItem;
