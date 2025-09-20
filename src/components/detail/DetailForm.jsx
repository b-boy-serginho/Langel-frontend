// src/components/DetailForm.jsx

import React, { useState, useEffect } from 'react';

const DetailForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    id_product: '',
    id_receipt: '',
    quantity: '',
    unit_price: '',
    amount: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_product: initialData.id_product || '',
        id_receipt: initialData.id_receipt || '',
        quantity: initialData.quantity || '',
        unit_price: initialData.unit_price || '',
        amount: initialData.amount || '',
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
    setFormData({ id_product: '', id_receipt: '', quantity: '', unit_price: '', amount: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="id_product"
        value={formData.id_product || ''}
        onChange={handleInputChange}
        placeholder="Product ID"
      />
      <input
        type="number"
        name="id_receipt"
        value={formData.id_receipt || ''}
        onChange={handleInputChange}
        placeholder="Receipt ID"
      />
      <input
        type="number"
        name="quantity"
        value={formData.quantity || ''}
        onChange={handleInputChange}
        placeholder="Quantity"
      />
      <input
        type="number"
        name="unit_price"
        value={formData.unit_price || ''}
        onChange={handleInputChange}
        placeholder="Unit Price"
      />
      <input
        type="number"
        name="amount"
        value={formData.amount || ''}
        onChange={handleInputChange}
        placeholder="Amount"
      />
      <button type="submit">{initialData ? 'Update' : 'Create'}</button>
      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default DetailForm;
