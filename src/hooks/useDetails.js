// src/hooks/useDetails.js

import { useState, useEffect } from 'react';
import { getDetails, createDetail, updateDetail, deleteDetail } from '../api/detailApi';

const useDetails = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const data = await getDetails();
      setDetails(Array.isArray(data?.data) ? data.data : data); // soporta paginate o array
    } catch (e) {
      console.error('Error fetching details:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (detailData) => {
    await createDetail(detailData);
    fetchDetails();
  };

  const handleUpdate = async (id, detailData) => {
    await updateDetail(id, detailData);
    fetchDetails();
  };

  const handleDelete = async (id) => {
    await deleteDetail(id);
    fetchDetails();
  };

  return {
    details,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};

export default useDetails;
