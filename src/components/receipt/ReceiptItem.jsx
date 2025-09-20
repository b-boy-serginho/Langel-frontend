// src/components/ReceiptItem.jsx

import React from 'react';

const ReceiptItem = ({ receipt, onEdit, onDelete }) => {
  return (
    <li>
      {receipt.nro} - {receipt.total} - {receipt.description}
      <button onClick={() => onEdit(receipt)}>Edit</button>
      <button onClick={() => onDelete(receipt.id)}>Delete</button>
    </li>
  );
};

export default ReceiptItem;
