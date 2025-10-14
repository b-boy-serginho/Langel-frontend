import { useState, useEffect, useCallback } from 'react';
import { getReceiptsByClient, createReceipt, updateReceipt, deleteReceipt } from '../api/receiptApi';

export default function useReceiptsId(clientId, initialPage = 1, initialPageSize = 6) {
  const [receipts, setReceipts] = useState(null); // array o objeto con sections
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);
  const [total, setTotal] = useState(null);
  const [totalSections, setTotalSections] = useState(null);

  // nuevos estados para totales por sección
  const [sectionTotal, setSectionTotal] = useState(null);
  const [sectionsTotals, setSectionsTotals] = useState(null);

  const fetchReceipts = useCallback(async (p = page) => {
    if (!clientId) return;
    setLoading(true);
    try {
      const data = await getReceiptsByClient(clientId, p, pageSize);

      // Si el backend devuelve metadatos de paginación
      if (data && typeof data === 'object' && (data.receipts || data.sections || data.items)) {
        // distintos nombres posibles: receipts, items, sections
        const payload = data.receipts ?? data.items ?? data.sections ?? [];
        setReceipts(payload);
        setTotal(data.total ?? null);
        setTotalSections(data.totalSections ?? Math.ceil((data.total ?? (Array.isArray(payload) ? payload.length : 0)) / Math.max(1, pageSize)));
        setPage(data.page ?? p);

        // usar los totales que envía el backend cuando existan
        setSectionTotal(typeof data.sectionTotal !== 'undefined' ? Number(data.sectionTotal) : null);
        setSectionsTotals(Array.isArray(data.sectionsTotals) ? data.sectionsTotals : null);
      } else if (Array.isArray(data)) {
        // Backend devuelve arreglo plano
        setReceipts(data);
        setTotal(data.length);
        setTotalSections(Math.ceil(data.length / Math.max(1, pageSize)));
        setPage(1);

        setSectionTotal(null);
        setSectionsTotals(null);
      } else {
        setReceipts([]);
        setTotal(0);
        setTotalSections(0);
        setPage(1);

        setSectionTotal(null);
        setSectionsTotals(null);
      }
    } catch (err) {
      console.error('Error loading receipts by client:', err);
      setReceipts([]);
      setTotal(null);
      setTotalSections(null);

      setSectionTotal(null);
      setSectionsTotals(null);
    } finally {
      setLoading(false);
    }
  }, [clientId, page, pageSize]);

  // refetch al cambiar clientId o page
  useEffect(() => {
    fetchReceipts(page);
  }, [fetchReceipts, page, clientId]);

  const handleCreate = useCallback(async (receiptData) => {
    try {
      await createReceipt(receiptData);
      await fetchReceipts(page);
    } catch (err) {
      console.error('Error creating receipt:', err);
      throw err;
    }
  }, [fetchReceipts, page]);

  const handleUpdate = useCallback(async (id, receiptData) => {
    try {
      await updateReceipt(id, receiptData);
      await fetchReceipts(page);
    } catch (err) {
      console.error('Error updating receipt:', err);
      throw err;
    }
  }, [fetchReceipts, page]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteReceipt(id);
      // si eliminaste el último item de la última página, intenta retroceder una página
      if (total !== null && page > 1 && ((total - 1) <= (page - 1) * pageSize)) {
        setPage(prev => Math.max(1, prev - 1));
      } else {
        await fetchReceipts(page);
      }
    } catch (err) {
      console.error('Error deleting receipt:', err);
      throw err;
    }
  }, [fetchReceipts, page, pageSize, total]);

  return {
    receipts,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
    refresh: fetchReceipts,
    page,
    setPage,
    pageSize,
    total,
    totalSections,
    // exportamos los totales para la UI
    sectionTotal,
    sectionsTotals,
  };
}
