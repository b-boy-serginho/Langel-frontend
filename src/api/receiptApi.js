// src/api/receiptApi.js

import { apiClient } from './axiosApi';
const basePath = '/receipts';

export const getReceipts = async () => {
  try {
    const { data } = await apiClient.get(basePath);
    return data;
  } catch (error) {
    console.error('Error fetching receipts:', error);
    throw error;
  }
};

export const createReceipt = async (receiptData) => {
  try {
    const { data } = await apiClient.post(basePath, receiptData);
    return data;
  } catch (error) {
    console.error('Error creating receipt:', error);
    throw error;
  }
};

export const updateReceipt = async (id, receiptData) => {
  try {
    await apiClient.put(`${basePath}/${id}`, receiptData);
  } catch (error) {
    console.error('Error updating receipt:', error);
    throw error;
  }
};

export const deleteReceipt = async (id) => {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error('Error deleting receipt:', error);
    throw error;
  }
};

// Nueva función para obtener los recibos de un cliente específico
export const getReceiptsByClient = async (clientId) => {
  try {
    const { data } = await apiClient.get(`/receipts/client/${clientId}`);
    return data;
  } catch (error) {
    console.error('Error fetching receipts for client:', error);
    throw error;
  }
};
