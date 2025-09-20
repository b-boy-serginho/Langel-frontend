// src/api/clientApi.js

import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/clients/';

export const getClients = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

export const createClient = async (clientData) => {
  try {
    await axios.post(apiUrl, clientData);
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const updateClient = async (id, clientData) => {
  try {
    const response = await axios.put(`${apiUrl}${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error(`Error updating client with id ${id}:`, error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    await axios.delete(`${apiUrl}${id}`);
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};
