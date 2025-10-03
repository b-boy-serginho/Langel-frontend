// src/api/productApi.js

import { apiClient } from './axiosApi';
const basePath = '/products';

export const getProducts = async () => {
  try {
    const { data } = await apiClient.get(basePath);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    await apiClient.post(basePath, productData);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    await apiClient.put(`${basePath}/${id}`, productData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
