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
  const client = clients.find(c => c.id === parseInt(clientId, 10));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState(null);

  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleEdit = (receipt) => {
    setEditingReceipt(receipt);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingReceipt(null);
    setIsModalOpen(false);
  };

  // Normaliza la respuesta del create por si tu API envuelve el dato en data/data.data
  const normalizeCreated = (created) => {
    if (!created) return null;
    if (created.id) return created;
    if (created?.data?.id) return created.data;
    if (created?.data?.data?.id) return created.data.data;
    return created;
  };

  const handleSubmit = async (receiptData) => {
    const { id_client, nro, description } = receiptData;
    const payload = { id_client, nro, description };

    try {
      if (editingReceipt) {
        await handleUpdate(editingReceipt.id, payload);
        setEditingReceipt(null);
        setIsModalOpen(false); // en edición sí cerramos
        return null;
      } else {
        // 👉 NO cerramos el modal ni abrimos otro.
        // Devolvemos el "created" y dejamos que ReceiptModal muestre el Paso 2.
        const createdRaw = await handleCreate(payload);
        const created = normalizeCreated(createdRaw);
        return created;
      }
    } catch (error) {
      console.error('Error al crear/actualizar recibo:', error);
      return null;
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

      {/* Modal de creación/edición (con Paso 2 interno) */}
      <ReceiptModal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        onSubmit={handleSubmit}
        initialData={editingReceipt}
        fixedClientId={client?.id}
        fixedClientName={client?.name}
      />

      {/* Modal separado de detalles (para ver/agregar desde la lista si quisieras) */}
      <ReceiptDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        receipt={selectedReceipt}
      />
    </div>
  );
};

export default ReceiptsPageId;
