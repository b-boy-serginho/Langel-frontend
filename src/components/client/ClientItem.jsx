// src/components/client/ClientItem.jsx

import React from 'react';

const ClientItem = ({ client, onEdit, onDelete }) => {
  return (
    <li className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
      <div>
        <div className="text-lg font-semibold">{client.name}</div>
        <div className="text-sm text-gray-500">{client.email}</div>
        <div className="text-sm text-gray-500">{client.phone}</div>
      </div>
      <div className="space-x-2">
        <button onClick={() => onEdit(client)} className="text-blue-500 hover:text-blue-700">Editar</button>
        <button onClick={() => onDelete(client.id)} className="text-red-500 hover:text-red-700">Eliminar</button>
      </div>
    </li>
  );
};

export default ClientItem;

