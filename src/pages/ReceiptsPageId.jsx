// src/pages/ReceiptsPageId.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useReceiptsId from '../hooks/useReceiptsId';  // Cambié esto de useReceipts a useReceiptsId
import ReceiptList from '../components/receipt/ReceiptList'; // Asegúrate de tener este componente
import useClients from '../hooks/useClients';
import ReceiptModal from '../components/receipt/ReceiptModal';
import ReceiptDetailModal from '../components/receipt/ReceiptDetailModal';

const ReceiptsPageId = () => {
  const { clientId } = useParams(); // Obtén el clientId de la URL
  const { receipts, loading, handleDelete, handleCreate, handleUpdate } = useReceiptsId(clientId);
  const { clients } = useClients();  // Obtener los datos de los clientes
  const client = clients.find(c => c.id === parseInt(clientId));  // Buscar al cliente por ID
  const [isModalOpen, setIsModalOpen] = useState(false);  // Abrir el modal
  const [editingReceipt, setEditingReceipt] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleEdit = (receipt) => {
    setEditingReceipt(receipt);
    setIsModalOpen(true); // Abrir el modal para editar
  };

  const handleCancelEdit = () => {
    setEditingReceipt(null);
    setIsModalOpen(false); // Cerrar el modal cuando se cancela
  };

  const handleSubmit = async (receiptData) => {
    const { id_client, nro, description } = receiptData;
    const updatedData = { id_client, nro, description };

    if (editingReceipt) {
      await handleUpdate(editingReceipt.id, updatedData);
      setEditingReceipt(null);
      setIsModalOpen(false);
      return null;
    } else {
      const created = await handleCreate(updatedData);
      return created;
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

  return (
    <div>

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
          onDelete={handleDelete}
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
