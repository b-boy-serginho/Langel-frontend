// src/hooks/useClients.js

import { useState, useEffect } from 'react';
import { getClients, createClient, updateClient, deleteClient } from '../api/clientApi';

const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const clientsData = await getClients();
      setClients(clientsData);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (clientData) => {
    await createClient(clientData);
    fetchClients();
  };

  const handleUpdate = async (id, clientData) => {
    await updateClient(id, clientData);
    fetchClients();
  };

  const handleDelete = async (id) => {
    await deleteClient(id);
    fetchClients();
  };

  return {
    clients,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};

export default useClients;
