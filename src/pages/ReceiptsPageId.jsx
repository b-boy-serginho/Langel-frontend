// src/pages/ReceiptsPageId.jsx

import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useReceiptsId from '../hooks/useReceiptsId';
import ReceiptList from '../components/receipt/ReceiptList';
import useClients from '../hooks/useClients';
import ReceiptModal from '../components/receipt/ReceiptModal';
import ReceiptDetailModal from '../components/receipt/ReceiptDetailModal';

const ReceiptsPageId = () => {
  const { clientId } = useParams();
  const {
    receipts,
    loading,
    handleDelete,
    handleCreate,
    handleUpdate,
    page,
    setPage,
    pageSize,
    total,
    totalSections,
    refresh,
    sectionTotal,      // <- nuevo
    sectionsTotals,    // <- nuevo (array con sumas por sección)
  } = useReceiptsId(clientId);
  const { clients } = useClients();
  const client = clients.find(c => c.id === parseInt(clientId));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [message, setMessage] = useState(''); // Estado para el mensaje

  const handleEdit = (receipt) => {
    setEditingReceipt(receipt);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingReceipt(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (receiptData) => {
    const { id_client, nro, description } = receiptData;
    const updatedData = { id_client, nro, description };

    if (editingReceipt) {
      try {
        await handleUpdate(editingReceipt.id, updatedData);
        setMessage('Recibo actualizado exitosamente');
      } catch (error) {
        setMessage('Error al actualizar el recibo');
      }
      setTimeout(() => setMessage(''), 5000);
      setEditingReceipt(null);
      setIsModalOpen(false);
      return null;
    } else {
      try {
        await handleCreate(updatedData);
        setMessage('Recibo creado exitosamente');
      } catch (error) {
        setMessage('Error al crear el recibo');
      }
      setTimeout(() => setMessage(''), 5000);
      setIsModalOpen(false);
    }
  };

  const handleAddDetail = (receipt) => {
    setSelectedReceipt(receipt);
    setIsDetailModalOpen(true);
  };

  const handleViewDetails = (receipt) => {
    setSelectedReceipt(receipt);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedReceipt(null);
    setIsDetailModalOpen(false);
  };

  const handleDeleteReceipt = async (id) => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este recibo?");
    if (isConfirmed) {
      try {
        await handleDelete(id);
        setMessage('Recibo eliminado exitosamente');
      } catch (error) {
        setMessage('Error al eliminar el recibo');
      }
      setTimeout(() => setMessage(''), 5000);
    }
  };

  // Agrupa en secciones de 6, o utiliza la estructura que venga desde el backend (receipts.sections)
  const sections = useMemo(() => {
    if (!receipts) return [];

    // Cuando el backend devuelve la página actual (receipts array paginado)
    if (Array.isArray(receipts)) {
      // mostramos la página actual como una sección única
      const items = receipts;
      const computedTotal = (typeof sectionTotal === 'number')
        ? sectionTotal
        : items.reduce((s, r) => s + (parseFloat(r.total) || 0), 0);
      return [{
        title: `Sección ${page}`,
        receipts: items,
        total: computedTotal
      }];
    }

    // Si el backend devolviera múltiples secciones en el payload (no es tu caso actual)
    if (receipts && typeof receipts === 'object' && Array.isArray(receipts.sections)) {
      return receipts.sections.map((s, i) => {
        const items = Array.isArray(s.receipts) ? s.receipts : [];
        const computedTotal = (sectionsTotals && Array.isArray(sectionsTotals) && sectionsTotals[i])
          ? Number(sectionsTotals[i].sum)
          : items.reduce((sum, r) => sum + (parseFloat(r.total) || 0), 0);
        return {
          title: `Sección ${s.section ?? (i + 1)}`,
          receipts: items,
          total: computedTotal
        };
      });
    }

    return [];
  }, [receipts, page, pageSize, sectionTotal, sectionsTotals]);

  // helpers para paginación (si el backend soporta página/totalSections)
  const canPrev = page > 1;
  const canNext = totalSections ? page < totalSections : (total ? (page * pageSize) < total : false);

  return (
    <div>
      {/* Mostrar mensaje de éxito o error */}
      {message && (
        <div className="p-4 bg-teal-100 text-teal-800 rounded-lg shadow-md mb-4">
          <p>{message}</p>
        </div>
      )}

      {/* Botón para abrir el modal de creación */}
      <div className='flex justify-end'>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Crear Recibo
        </button>
      </div>

      {client && <h1 className='text-3xl font-semibold'>Recibos de {client.name}</h1>}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {sections.length === 0 ? (
            <p>No hay recibos.</p>
          ) : (
            sections.map((sec, idx) => (
              <section key={idx} className="mb-8">
                <h3 className="text-xl font-medium mb-2">{sec.title}</h3>
                <ReceiptList
                  receipts={sec.receipts}
                  sectionTotal={sec.total ?? 0} // <- pasamos el total de la sección
                  onDelete={handleDeleteReceipt}
                  onEdit={handleEdit}
                  onAddDetail={handleAddDetail}
                  onViewDetails={handleViewDetails}
                />
              </section>
            ))
          )}

          {/* Controles de paginación */}
          <div className="flex items-center justify-between mt-4">
            <button
              className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={!canPrev}
            >
              Anterior
            </button>

            {/* en el bloque de paginación muestra el total de la sección */}
            <div className="text-sm text-gray-700">
              {totalSections
                ? `Sección ${page} de ${totalSections} • Total sección: ${Number(sectionTotal ?? sectionsTotals?.[page-1]?.sum ?? 0).toFixed(2)}`
                : total
                  ? `Sección ${page} • ${Math.min(page * pageSize, total)}/${total} • Total sección: ${Number(sectionTotal ?? 0).toFixed(2)}`
                  : `Sección ${page} • Total sección: ${Number(sectionTotal ?? 0).toFixed(2)}`}
            </div>

            <button
              className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={!canNext}
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      {/* Modal de creación y edición */}
      <ReceiptModal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        onSubmit={handleSubmit}
        initialData={editingReceipt}
        fixedClientId={client?.id}
        fixedClientName={client?.name}
      />

      {/* Modal de detalles */}
      <ReceiptDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        receipt={selectedReceipt}
        onDetailsChange={() => refresh(page)} // recarga recibos (actualiza total de la sección)
      />
    </div>
  );
};

export default ReceiptsPageId;
