// src/components/product/ProductForm.jsx

import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        price: initialData.price || '',
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
    setFormData({ name: '', price: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name || ''}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="price"
        value={formData.price || ''}
        onChange={handleInputChange}
        placeholder="Price"
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

export default ProductForm;
