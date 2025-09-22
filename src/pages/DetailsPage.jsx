// src/pages/DetailsPage.jsx
import React, { useState } from 'react'; // Importa useState desde React

import DetailList from '../components/detail/DetailList';
import useDetails from '../hooks/useDetails';
import DetailModal from '../components/detail/DetailModal';

const DetailsPage = () => {
  const { details, loading, handleCreate, handleUpdate, handleDelete } = useDetails();
  const [editingDetail, setEditingDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (detail) => {
    setEditingDetail(detail);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingDetail(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (detailData) => {
    if (editingDetail) {
      await handleUpdate(editingDetail.id, detailData);
      setEditingDetail(null);
    } else {
      await handleCreate(detailData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Agregar Detalle
        </button>
      </div>

      <h1 className="text-center text-2xl font-semibold">Detalles (Productos por Recibo)</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <DetailList details={details} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <DetailModal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        onSubmit={handleSubmit}
        initialData={editingDetail}
      />
    </div>
  );
};

export default DetailsPage;
