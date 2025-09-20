// src/components/DetailItem.jsx

import React from 'react';

const DetailItem = ({ detail, onEdit, onDelete }) => {
  return (
    <li>
      {`Product ID: ${detail.id_product}, Receipt ID: ${detail.id_receipt}, Quantity: ${detail.quantity}, Amount: ${detail.amount}`}
      <button onClick={() => onEdit(detail)}>Edit</button>
      <button onClick={() => onDelete(detail.id)}>Delete</button>
    </li>
  );
};

export default DetailItem;
