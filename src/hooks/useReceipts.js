// src/hooks/useReceipts.js

import { useState, useEffect } from 'react';
import { getReceipts, createReceipt, updateReceipt, deleteReceipt } from '../api/receiptApi';


const useReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      const receiptsData = await getReceipts();
      setReceipts(receiptsData);
    } catch (error) {
      console.error('Error fetching receipts:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleCreate = async (receiptData) => {
    const created = await createReceipt(receiptData);
    await fetchReceipts();
    return created;
  };

  const handleUpdate = async (id, receiptData) => {
    await updateReceipt(id, receiptData);
    fetchReceipts();
  };

  const handleDelete = async (id) => {
    await deleteReceipt(id);
    fetchReceipts();
  };

  return {
    receipts,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};

export default useReceipts;
