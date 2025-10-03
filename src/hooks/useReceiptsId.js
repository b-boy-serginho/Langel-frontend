import { useState, useEffect } from 'react';
import { getReceiptsByClient, deleteReceipt, createReceipt, updateReceipt } from '../api/receiptApi';

const useReceiptsId = (clientId) => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReceipts();
  }, [clientId]);

  const fetchReceipts = async () => {
    try {
      const data = await getReceiptsByClient(clientId);
      setReceipts(data);
    } catch (error) {
      console.error('Error fetching receipts for client:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReceipt(id);
      // Filtramos el recibo eliminado para actualizar el estado
      setReceipts(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting receipt:', error);
    }
  };

  const handleCreate = async (receiptData) => {
    try {
      const created = await createReceipt(receiptData);
      await fetchReceipts();
      return created;
    } catch (error) {
      console.error('Error creating receipt:', error);
      return null;
    }
  };

  const handleUpdate = async (id, receiptData) => {
    try {
      await updateReceipt(id, receiptData);
      fetchReceipts();
    } catch (error) {
      console.error('Error updating receipt:', error);
    }
  };

  return {
    receipts,
    loading,
    handleDelete,
    handleCreate,
    handleUpdate
  };
};

export default useReceiptsId;
