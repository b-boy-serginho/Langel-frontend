// src/pages/ProductsPage.jsx

import React, { useState } from 'react';
// import ProductForm from '../components/product/ProductForm';
import ProductList from '../components/product/ProductList';
import useProducts from '../hooks/useProducts';
import ProductModal from '../components/product/ProductModal';

const ProductsPage = () => {
  const { products, loading, handleCreate, handleUpdate, handleDelete } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Abrir el modal


  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true); // Abrir el modal para editar
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsModalOpen(false); // Cerrar el modal cuando se cancela
  };

  const handleSubmit = (productData) => {
    if (editingProduct) {
      handleUpdate(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      handleCreate(productData);
    }
    setIsModalOpen(false); // Cerrar el modal después de la operación
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
          Crear Producto
        </button>
      </div>

      <br />
      <br />

      <h1 className='text-center text-3xl font-semibold' >Lista de productos</h1>
      {loading ? <p>Loading...</p> : <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />}

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        onSubmit={handleSubmit}
        initialData={editingProduct}
      />
    </div>
  );
};

export default ProductsPage;
