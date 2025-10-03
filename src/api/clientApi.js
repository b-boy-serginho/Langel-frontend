// src/api/clientApi.js

import { apiClient } from './axiosApi';

export const getClients = async () => {
  try {
    const { data } = await apiClient.get('/clients');
    return data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

export const createClient = async (clientData) => {
  try {
    await apiClient.post('/clients', clientData);
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const updateClient = async (id, clientData) => {
  try {
    const { data } = await apiClient.put(`/clients/${id}`, clientData);
    return data;
  } catch (error) {
    console.error(`Error updating client with id ${id}:`, error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    await apiClient.delete(`/clients/${id}`);
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};
