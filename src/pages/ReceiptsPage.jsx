// src/pages/ReceiptsPage.jsx

import React, { useState } from 'react';
// import ReceiptForm from '../components/receipt/ReceiptForm';
import ReceiptList from '../components/receipt/ReceiptList';
import useReceipts from '../hooks/useReceipts';
import ReceiptModal from '../components/receipt/ReceiptModal';

const ReceiptsPage = () => {
  const { receipts, loading, handleCreate, handleUpdate, handleDelete } = useReceipts();
  const [editingReceipt, setEditingReceipt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Abrir el modal

  const handleEdit = (receipt) => {
    setEditingReceipt(receipt);
    setIsModalOpen(true); // Abrir el modal para editar
  };

  const handleCancelEdit = () => {
    setEditingReceipt(null);
    setIsModalOpen(false); // Cerrar el modal cuando se cancela
  };

  const handleSubmit = (receiptData) => {
    // Filtra los campos que quieres enviar, solo id_client, nro y description
    const { id_client, nro, description } = receiptData;
    const updatedData = { id_client, nro, description };

    if (editingReceipt) {
      handleUpdate(editingReceipt.id, updatedData); // Llama a handleUpdate con los datos actualizados
      setEditingReceipt(null); // Limpia el estado de edición
    } else {
      handleCreate(updatedData); // Si es creación, llama a handleCreate
    }

    setIsModalOpen(false); // Cierra el modal después de la operación
  };


  return (
    <div>
      <br />
      <br />
      <div className='flex justify-end'>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Crear Recibo
        </button>
      </div>

      <br />
      <br />

      <h1 className='text-center text-3xl font-semibold' >Lista de Recibos</h1>
      {loading ? <p>Loading...</p> : <ReceiptList receipts={receipts} onEdit={handleEdit} onDelete={handleDelete} />}

      <ReceiptModal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        onSubmit={handleSubmit}
        initialData={editingReceipt}
      />
    </div>
  );
};

export default ReceiptsPage;
