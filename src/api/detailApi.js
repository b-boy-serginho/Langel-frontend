// src/api/detailApi.js

import { apiClient } from './axiosApi';
const basePath = '/details';

export const getDetails = async () => {
  try {
    const { data } = await apiClient.get(basePath);
    return data;
  } catch (error) {
    console.error('Error fetching details:', error);
    throw error;
  }
};

export const createDetail = async (detailData) => {
  // NO mandes amount; lo calcula el backend
  const payload = {
    id_receipt: Number(detailData.id_receipt),
    id_product: Number(detailData.id_product),
    quantity: Number(detailData.quantity),
    ...(detailData.unit_price !== undefined && detailData.unit_price !== ''
      ? { unit_price: Number(detailData.unit_price) }
      : {}),
  };
  await apiClient.post('/details', payload);
  // return created detail if needed
};

export const updateDetail = async (id, detailData) => {
  const payload = {
    id_receipt: Number(detailData.id_receipt),
    id_product: Number(detailData.id_product),
    quantity: Number(detailData.quantity),
    ...(detailData.unit_price !== undefined && detailData.unit_price !== ''
      ? { unit_price: Number(detailData.unit_price) }
      : {}),
  };
  await apiClient.put(`${basePath}/${id}`, payload);
};


// export const createDetail = async (detailData) => {
//   try {
//     await axios.post(apiUrl, detailData);
//   } catch (error) {
//     console.error('Error creating detail:', error);
//     throw error;
//   }
// };

// export const updateDetail = async (id, detailData) => {
//   try {
//     await axios.put(`${apiUrl}/${id}`, detailData);
//   } catch (error) {
//     console.error('Error updating detail:', error);
//     throw error;
//   }
// };

export const deleteDetail = async (id) => {
  try {
    await apiClient.delete(`${basePath}/${id}`);
  } catch (error) {
    console.error('Error deleting detail:', error);
    throw error;
  }
};
