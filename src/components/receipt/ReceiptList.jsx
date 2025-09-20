// src/components/ReceiptList.jsx

import React from 'react';
import ReceiptItem from './ReceiptItem';

const ReceiptList = ({ receipts, onEdit, onDelete }) => {
  return (
    <ul>
      {receipts.map((receipt) => (
        <ReceiptItem
          key={receipt.id}
          receipt={receipt}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default ReceiptList;
