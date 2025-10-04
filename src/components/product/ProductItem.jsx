import React from 'react';
import { HiPencil, HiTrash, HiShoppingBag, HiCurrencyDollar } from 'react-icons/hi';

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 group">
      {/* Header del producto */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <HiShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">Producto</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onEdit(product)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="Editar producto"
          >
            <HiPencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Eliminar producto"
          >
            <HiTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Información del producto */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Precio:</span>
          <div className="flex items-center space-x-1">
            <HiCurrencyDollar className="w-4 h-4 text-green-600" />
            <span className="text-lg font-bold text-gray-900">Bs {product.price}</span>
          </div>
        </div>
        
        {product.description && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          </div>
        )}
      </div>

      {/* Footer con acciones */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-500">Disponible</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full hover:bg-red-100 transition-colors duration-200"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
