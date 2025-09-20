// src/api/receiptApi.js

import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/receipts/';

export const getReceipts = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching receipts:', error);
    throw error;
  }
};

export const createReceipt = async (receiptData) => {
  try {
    await axios.post(apiUrl, receiptData);
  } catch (error) {
    console.error('Error creating receipt:', error);
    throw error;
  }
};

export const updateReceipt = async (id, receiptData) => {
  try {
    await axios.put(`${apiUrl}${id}`, receiptData);
  } catch (error) {
    console.error('Error updating receipt:', error);
    throw error;
  }
};

export const deleteReceipt = async (id) => {
  try {
    await axios.delete(`${apiUrl}${id}`);
  } catch (error) {
    console.error('Error deleting receipt:', error);
    throw error;
  }
};
