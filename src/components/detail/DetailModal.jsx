// src/components/detail/DetailModal.jsx

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/axiosApi';

const DetailModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [receipts, setReceipts] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedReceipt, setSelectedReceipt] = useState(initialData?.id_receipt ?? '');
  const [selectedProduct, setSelectedProduct] = useState(initialData?.id_product ?? '');
  const [quantity, setQuantity] = useState(initialData?.quantity ?? '');
  const [unitPrice, setUnitPrice] = useState(initialData?.unit_price ?? '');
  const [amount, setAmount] = useState(initialData?.amount ?? '');

  // Sincroniza cuando abres/cambias modo edición
  useEffect(() => {
    setSelectedReceipt(initialData?.id_receipt ?? '');
    setSelectedProduct(initialData?.id_product ?? '');
    setQuantity(initialData?.quantity ?? '');
    setUnitPrice(initialData?.unit_price ?? '');
    setAmount(initialData?.amount ?? '');
  }, [initialData, isOpen]);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const { data } = await apiClient.get('/receipts');
        setReceipts(Array.isArray(data?.data) ? data.data : data);
      } catch (e) {
        console.error('Error fetching receipts:', e);
      }
    };
    const fetchProducts = async () => {
      try {
        const { data } = await apiClient.get('/products');
        setProducts(Array.isArray(data?.data) ? data.data : data);
      } catch (e) {
        console.error('Error fetching products:', e);
      }
    };
    if (isOpen) {
      fetchReceipts();
      fetchProducts();
    }
  }, [isOpen]);

  const handleReceiptChange = (e) => {
    setSelectedReceipt(Number(e.target.value));
  };

  const handleProductChange = (e) => {
    const productId = Number(e.target.value);
    setSelectedProduct(productId);

    const selectedProd = products.find((p) => Number(p.id) === productId);
    if (selectedProd) {
      // Ajusta: tu backend debe devolver 'price' o 'unit_price'. Usa el que tengas disponible.
      const price = Number(selectedProd.price ?? selectedProd.unit_price ?? 0);
      setUnitPrice(price);
      setAmount(Number(quantity || 0) * price);
    } else {
      setUnitPrice(0);
      setAmount(0);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    setAmount(newQuantity * Number(unitPrice || 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id_receipt: Number(selectedReceipt),
      id_product: Number(selectedProduct),
      quantity: Number(quantity),
      // unit_price es opcional: si lo omites, backend usa el del producto
      unit_price: unitPrice !== '' ? Number(unitPrice) : undefined,
    };
    onSubmit(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative z-50">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Editar Detalle' : 'Crear Detalle'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Recibo */}
          <select
            name="id_receipt"
            value={selectedReceipt}
            onChange={handleReceiptChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecciona un recibo</option>
            {receipts.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nro} - {r.client.name}
              </option>
            ))}
          </select>

          {/* Producto */}
          <select
            name="id_product"
            value={selectedProduct}
            onChange={handleProductChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecciona un producto</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Cantidad */}
          <input
            type="number"
            min="1"
            step="1"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Cantidad"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Precio Unitario (solo lectura si viene del producto) */}
          <input
            type="text"
            name="unit_price"
            value={unitPrice}
            readOnly
            placeholder="Precio Unitario"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Monto Total (calculado en el cliente solo para mostrar) */}
          <input
            type="text"
            name="amount"
            value={
              Number.isFinite(Number(amount)) && amount !== ''
                ? Number(amount).toFixed(2)
                : ''
            }
            readOnly
            placeholder="Monto Total"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              {initialData ? 'Actualizar' : 'Crear'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-red-600 hover:text-gray-800"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailModal;
