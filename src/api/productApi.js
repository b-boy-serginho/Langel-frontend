// src/api/productApi.js

import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/products/';

export const getProducts = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    await axios.post(apiUrl, productData);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    await axios.put(`${apiUrl}${id}`, productData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${apiUrl}${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
