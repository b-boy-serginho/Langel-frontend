import React, { useState } from 'react';
// import ClientForm from '../components/client/ClientForm';
import ClientList from '../components/client/ClientList';
import ClientModal from '../components/client/ClientModal';
import useClients from '../hooks/useClients';

const ClientsPage = () => {
  const { clients, loading, handleCreate, handleUpdate, handleDelete } = useClients();
  const [editingClient, setEditingClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (client) => {
    setEditingClient(client);
    setIsModalOpen(true); // Abrir el modal para editar
  };

  const handleCancelEdit = () => {
    setEditingClient(null);
    setIsModalOpen(false); // Cerrar el modal cuando se cancela
  };

  const handleSubmit = (clientData) => {
    if (editingClient) {
      handleUpdate(editingClient.id, clientData);
    } else {
      handleCreate(clientData);
    }
    setIsModalOpen(false); // Cerrar el modal después de la operación
  };

  return (
    <div>
      {/* <h1>Client CRUD</h1> */}
      {/* Botón para abrir el modal de crear cliente */}
      <br />
      <br />
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Crear Cliente
      </button>

      {/* Lista de clientes */}
      <br />
      <br />
      <h1 className='text-center text-3xl font-semibold' >Lista de clientes</h1>
      {loading ? <p>Loading...</p> : <ClientList clients={clients} onEdit={handleEdit} onDelete={handleDelete} />}

      {/* Modal para crear/editar cliente */}
      <ClientModal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        onSubmit={handleSubmit}
        initialData={editingClient}
      />
    </div>
  );
};

export default ClientsPage;
