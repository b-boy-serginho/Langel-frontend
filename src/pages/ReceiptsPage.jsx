// src/pages/ReceiptsPage.jsx

import React, { useState } from 'react';
import ReceiptForm from '../components/receipt/ReceiptForm';
import ReceiptList from '../components/receipt/ReceiptList';
import useReceipts from '../hooks/useReceipts';

const ReceiptsPage = () => {
  const { receipts, loading, handleCreate, handleUpdate, handleDelete } = useReceipts();
  const [editingReceipt, setEditingReceipt] = useState(null);

  const handleEdit = (receipt) => {
    setEditingReceipt(receipt);
  };

  const handleCancelEdit = () => {
    setEditingReceipt(null);
  };

  const handleSubmit = (receiptData) => {
    if (editingReceipt) {
      handleUpdate(editingReceipt.id, receiptData);
      setEditingReceipt(null);
    } else {
      handleCreate(receiptData);
    }
  };

  return (
    <div>
      <h1>Receipt CRUD</h1>
      <ReceiptForm onSubmit={handleSubmit} initialData={editingReceipt} onCancel={handleCancelEdit} />
      <h2>Receipt List</h2>
      {loading ? <p>Loading...</p> : <ReceiptList receipts={receipts} onEdit={handleEdit} onDelete={handleDelete} />}
    </div>
  );
};

export default ReceiptsPage;
