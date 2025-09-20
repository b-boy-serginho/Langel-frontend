// src/components/ReceiptForm.jsx

import React, { useState, useEffect } from 'react';

const ReceiptForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    id_client: '',
    nro: '',
    total: '',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_client: initialData.id_client || '',
        nro: initialData.nro || '',
        total: initialData.total || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ id_client: '', nro: '', total: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="id_client"
        value={formData.id_client || ''}
        onChange={handleInputChange}
        placeholder="Client ID"
      />
      <input
        type="text"
        name="nro"
        value={formData.nro || ''}
        onChange={handleInputChange}
        placeholder="Receipt Number"
      />
      <input
        type="number"
        name="total"
        value={formData.total || ''}
        onChange={handleInputChange}
        placeholder="Total"
      />
      <input
        type="text"
        name="description"
        value={formData.description || ''}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <button type="submit">{initialData ? 'Update' : 'Create'}</button>
      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default ReceiptForm;
