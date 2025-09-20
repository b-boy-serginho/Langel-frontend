// src/pages/ClientsPage.jsx

import React, { useState } from 'react';
import ClientForm from '../components/client/ClientForm';
import ClientList from '../components/client/ClientList';
import useClients from '../hooks/useClients';

const ClientsPage = () => {
  const { clients, loading, handleCreate, handleUpdate, handleDelete } = useClients();
  const [editingClient, setEditingClient] = useState(null);

  const handleEdit = (client) => {
    setEditingClient(client);
  };

  const handleCancelEdit = () => {
    setEditingClient(null);
  };

  const handleSubmit = (clientData) => {
    if (editingClient) {
      handleUpdate(editingClient.id, clientData);
      setEditingClient(null);
    } else {
      handleCreate(clientData);
    }
  };

  return (
    <div>
      <h1>Client CRUD</h1>
      <ClientForm onSubmit={handleSubmit} initialData={editingClient} onCancel={handleCancelEdit} />
      <h2>Client List</h2>
      {loading ? <p>Loading...</p> : <ClientList clients={clients} onEdit={handleEdit} onDelete={handleDelete} />}
    </div>
  );
};

export default ClientsPage;
