// src/pages/DetailsPage.jsx

import React, { useState } from 'react';
import DetailForm from '../components/detail/DetailForm';
import DetailList from '../components/detail/DetailList';
import useDetails from '../hooks/useDetails';

const DetailsPage = () => {
  const { details, loading, handleCreate, handleUpdate, handleDelete } = useDetails();
  const [editingDetail, setEditingDetail] = useState(null);

  const handleEdit = (detail) => {
    setEditingDetail(detail);
  };

  const handleCancelEdit = () => {
    setEditingDetail(null);
  };

  const handleSubmit = (detailData) => {
    if (editingDetail) {
      handleUpdate(editingDetail.id, detailData);
      setEditingDetail(null);
    } else {
      handleCreate(detailData);
    }
  };

  return (
    <div>
      <h1>Details CRUD</h1>
      <DetailForm onSubmit={handleSubmit} initialData={editingDetail} onCancel={handleCancelEdit} />
      <h2>Detail List</h2>
      {loading ? <p>Loading...</p> : <DetailList details={details} onEdit={handleEdit} onDelete={handleDelete} />}
    </div>
  );
};

export default DetailsPage;
