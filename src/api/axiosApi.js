// src/api/axiosApi.js
// Reutiliza un solo cliente Axios para todo
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  //  baseURL: 'http://192.168.100.25:8000/api', 
  // baseURL: 'http://10.105.122.74:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Ejemplo de interceptor para loguear errores (opcional)
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API ERROR]', err?.response?.data || err.message);
    return Promise.reject(err);
  }
);
