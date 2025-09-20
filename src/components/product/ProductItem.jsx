// src/components/ProductItem.jsx

import React from 'react';

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <li>
      {product.name} - {product.price} - {product.description}
      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </li>
  );
};

export default ProductItem;
