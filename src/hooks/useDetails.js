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
      const detailsData = await getDetails();
      setDetails(detailsData);
    } catch (error) {
      console.error('Error fetching details:', error);
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
