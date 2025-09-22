// src/components/ProductItem.jsx

import React from 'react';

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <li className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
      <div >
        <div className="text-lg font-semibold"> {product.name}</div>
        <div className="text-sm text-gray-500"> {product.price} </div>
        <div className="text-sm text-gray-500"> {product.description}</div>
      </div>
      <div className="space-x-2">
        <button onClick={() => onEdit(product)} className="text-blue-500 hover:text-blue-700">Edit</button>
        <button onClick={() => onDelete(product.id)} className="text-red-500 hover:text-red-700">Delete</button>
      </div>     
    </li>
  );
};

export default ProductItem;
