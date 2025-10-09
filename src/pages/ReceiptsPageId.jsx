// src/pages/ReceiptsPageId.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useReceiptsId from '../hooks/useReceiptsId';
import ReceiptList from '../components/receipt/ReceiptList';
import useClients from '../hooks/useClients';
import ReceiptModal from '../components/receipt/ReceiptModal';
import ReceiptDetailModal from '../components/receipt/ReceiptDetailModal';

const ReceiptsPageId = () => {
  const { clientId } = useParams();
  const { receipts, loading, handleDelete, handleCreate, handleUpdate } = useReceiptsId(clientId);
  const { clients } = useClients();
  const client = clients.find(c => c.id === parseInt(clientId));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [message, setMessage] = useState(''); // Estado para el mensaje

  const handleEdit = (receipt) => {
    setEditingReceipt(receipt);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingReceipt(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (receiptData) => {
    const { id_client, nro, description } = receiptData;
    const updatedData = { id_client, nro, description };

    if (editingReceipt) {
      try {
        await handleUpdate(editingReceipt.id, updatedData);
        setMessage('Recibo actualizado exitosamente');
      } catch (error) {
        setMessage('Error al actualizar el recibo');
      }
      setTimeout(() => setMessage(''), 5000);
      setEditingReceipt(null);
      setIsModalOpen(false);
      return null;
    } else {
      try {
        await handleCreate(updatedData);
        setMessage('Recibo creado exitosamente');
      } catch (error) {
        setMessage('Error al crear el recibo');
      }
      setTimeout(() => setMessage(''), 5000);
      setIsModalOpen(false);
    }
  };

  const handleAddDetail = (receipt) => {
    setSelectedReceipt(receipt);
    setIsDetailModalOpen(true);
  };

  const handleViewDetails = (receipt) => {
    setSelectedReceipt(receipt);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedReceipt(null);
    setIsDetailModalOpen(false);
  };

  const handleDeleteReceipt = async (id) => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este recibo?");
    if (isConfirmed) {
      try {
        await handleDelete(id);
        setMessage('Recibo eliminado exitosamente');
      } catch (error) {
        setMessage('Error al eliminar el recibo');
      }
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div>
      {/* Mostrar mensaje de éxito o error */}
      {message && (
        <div className="p-4 bg-teal-100 text-teal-800 rounded-lg shadow-md mb-4">
          <p>{message}</p>
        </div>
      )}

      {/* Botón para abrir el modal de creación */}
      <div className='flex justify-end'>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Crear Recibo
        </button>
      </div>

      {client && <h1 className='text-3xl font-semibold'>Recibos de {client.name}</h1>}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ReceiptList
          receipts={receipts}
          onDelete={handleDeleteReceipt}
          onEdit={handleEdit}
          onAddDetail={handleAddDetail}
          onViewDetails={handleViewDetails}
        />
      )}

      {/* Modal de creación y edición */}
      <ReceiptModal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        onSubmit={handleSubmit}
        initialData={editingReceipt}
        fixedClientId={client?.id}
        fixedClientName={client?.name}
      />

      {/* Modal de detalles */}
      <ReceiptDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        receipt={selectedReceipt}
      />
    </div>
  );
};

export default ReceiptsPageId;
