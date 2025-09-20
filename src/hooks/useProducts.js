// src/hooks/useProducts.js

import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/productApi';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (productData) => {
    await createProduct(productData);
    fetchProducts();
  };

  const handleUpdate = async (id, productData) => {
    await updateProduct(id, productData);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return {
    products,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};

export default useProducts;
