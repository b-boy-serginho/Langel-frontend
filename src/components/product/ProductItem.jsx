import React from 'react';

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
      <div className="text-lg font-semibold mb-2">{product.name}</div>
      <div className="text-sm text-gray-500 mb-2">Bs {product.price}</div>
      {/* <div className="text-sm text-gray-500 mb-4">Descripcion: {product.description}</div> */}
      <div className="space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
