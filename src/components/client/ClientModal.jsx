// src/components/client/ClientModal.jsx
import React from 'react';
import { HiX, HiUser, HiMail, HiPhone, HiIdentification } from 'react-icons/hi';

const ClientModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-900/20 border border-gray-200/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header del modal */}
        <div className="relative p-6 border-b border-gray-200/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-teal-500/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 ring-2 ring-green-500/20">
                <HiUser className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {initialData ? 'Editar Cliente' : 'Crear Cliente'}
                </h2>
                <p className="text-sm text-gray-600 font-medium">
                  {initialData ? 'Modifica la información del cliente' : 'Agrega un nuevo cliente a tu base de datos'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="group p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Formulario */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              name: e.target.name.value,
              // email: e.target.email.value,
              // phone: e.target.phone.value,
            });
            onClose();
          }}
          className="p-6 space-y-8"
        >
          <div className="space-y-6">
            {/* Campo Nombre */}
            <div className="group">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <HiIdentification className="w-4 h-4 text-green-600" />
                </div>
                <span>Nombre Completo</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={initialData?.name || ''}
                placeholder="Ingresa el nombre completo del cliente"
                className="w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
                required
              />
            </div>

            {/* Campo Email */}
            {/* <div className="group">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <HiMail className="w-4 h-4 text-blue-600" />
                </div>
                <span>Correo Electrónico</span>
              </label>
              <input
                type="email"
                name="email"
                defaultValue={initialData?.email || ''}
                placeholder="cliente@ejemplo.com"
                className="w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div> */}

            {/* Campo Teléfono */}
            {/* <div className="group">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <HiPhone className="w-4 h-4 text-purple-600" />
                </div>
                <span>Teléfono</span>
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={initialData?.phone || ''}
                placeholder="+58 412 123 4567"
                className="w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div> */}
          </div>
          
          {/* Botones de acción */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-green-500/25"
            >
              {initialData ? 'Actualizar Cliente' : 'Crear Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;
