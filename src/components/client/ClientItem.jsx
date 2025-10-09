import React from 'react';
import { Link } from 'react-router-dom';
import { HiPencil, HiTrash, HiUser, HiDocumentText, HiMail, HiPhone } from 'react-icons/hi';

const ClientItem = ({ client, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 group">
      {/* Header del cliente */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <HiUser className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
              {client.name}
            </h3>
            <p className="text-sm text-gray-500">Cliente</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onEdit(client)}
            className="p-2 text-blue-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="Editar cliente"
          >
            <HiPencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(client.id)}
            className="p-2 text-red-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Eliminar cliente"
          >
            <HiTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Información del cliente */}
      <div className="space-y-3">
        {client.email && (
          <div className="flex items-center space-x-2">
            <HiMail className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{client.email}</span>
          </div>
        )}
        {client.phone && (
          <div className="flex items-center space-x-2">
            <HiPhone className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{client.phone}</span>
          </div>
        )}
      </div>

      {/* Footer con acciones */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-500">Activo</span>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            to={`/receipts/${client.id}`}
            className="text-xs bg-teal-50 text-teal-600 px-3 py-1 rounded-full hover:bg-teal-100 transition-colors duration-200 flex items-center space-x-1"
          >
            <HiDocumentText className="w-3 h-3" />
            <span>Ver Recibos</span>
          </Link>
          {/* <button
            onClick={() => onEdit(client)}
            className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
          >
            Editar
          </button> */}
          {/* <button
            onClick={() => onDelete(client.id)}
            className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full hover:bg-red-100 transition-colors duration-200"
          >
            Eliminar
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ClientItem;
