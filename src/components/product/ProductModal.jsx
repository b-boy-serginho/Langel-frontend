// src/components/product/ProductModal.jsx

import React from 'react';
import { HiX, HiShoppingBag, HiCurrencyDollar, HiTag } from 'react-icons/hi';

const ProductModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-900/20 border border-gray-200/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header del modal */}
        <div className="relative p-6 border-b border-gray-200/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-teal-500/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20">
                <HiShoppingBag className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {initialData ? 'Editar Producto' : 'Crear Producto'}
                </h2>
                <p className="text-sm text-gray-600 font-medium">
                  {initialData ? 'Modifica la información del producto' : 'Agrega un nuevo producto al inventario'}
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
              price: e.target.price.value,
            });
            onClose();
          }}
          className="p-6 space-y-8"
        >
          <div className="space-y-6">
            {/* Campo Nombre */}
            <div className="group">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <HiTag className="w-4 h-4 text-blue-600" />
                </div>
                <span>Nombre del Producto</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={initialData?.name || ''}
                placeholder="Ingresa el nombre del producto"
                className="w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
                required
              />
            </div>

            {/* Campo Precio */}
            <div className="group">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <HiCurrencyDollar className="w-4 h-4 text-green-600" />
                </div>
                <span>Precio</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-semibold">Bs</span>
                </div>
                <input
                  type="number"
                  name="price"
                  defaultValue={initialData?.price || ''}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
                  required
                />
              </div>
            </div>
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
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blue-500/25"
            >
              {initialData ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
