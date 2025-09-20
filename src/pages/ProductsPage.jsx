// src/pages/ProductsPage.jsx

import React, { useState } from 'react';
import ProductForm from '../components/product/ProductForm';
import ProductList from '../components/product/ProductList';
import useProducts from '../hooks/useProducts';

const ProductsPage = () => {
  const { products, loading, handleCreate, handleUpdate, handleDelete } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleSubmit = (productData) => {
    if (editingProduct) {
      handleUpdate(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      handleCreate(productData);
    }
  };

  return (
    <div>
      <h1>Product CRUD</h1>
      <ProductForm onSubmit={handleSubmit} initialData={editingProduct} onCancel={handleCancelEdit} />
      <h2>Product List</h2>
      {loading ? <p>Loading...</p> : <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />}
    </div>
  );
};

export default ProductsPage;
