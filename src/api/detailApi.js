// src/api/detailApi.js

import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/details';

export const getDetails = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching details:', error);
    throw error;
  }
};

export const createDetail = async (detailData) => {
  try {
    await axios.post(apiUrl, detailData);
  } catch (error) {
    console.error('Error creating detail:', error);
    throw error;
  }
};

export const updateDetail = async (id, detailData) => {
  try {
    await axios.put(`${apiUrl}/${id}`, detailData);
  } catch (error) {
    console.error('Error updating detail:', error);
    throw error;
  }
};

export const deleteDetail = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.error('Error deleting detail:', error);
    throw error;
  }
};
