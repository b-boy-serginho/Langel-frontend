import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/axiosApi';
import { createDetail, deleteDetail } from '../../api/detailApi';
import { FaPlus, FaTable, FaTrash, FaTimes, FaEye } from "react-icons/fa";

const ReceiptDetailModal = ({ isOpen, onClose, receipt }) => {
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showTable, setShowTable] = useState(true);

  // Form data
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (isOpen && receipt) {
      fetchProducts();
      fetchDetails();
      setShowForm(true);
      setShowTable(true);
    }
  }, [isOpen, receipt]);

  const fetchProducts = async () => {
    try {
      const { data } = await apiClient.get('/products');
      setProducts(Array.isArray(data?.data) ? data.data : data);
    } catch (e) {
      console.error('Error fetching products:', e);
    }
  };

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get('/details');
      const allDetails = Array.isArray(data?.data) ? data.data : data;
      const receiptDetails = allDetails.filter(detail => detail.id_receipt === receipt.id);
      setDetails(receiptDetails);
    } catch (e) {
      console.error('Error fetching details:', e);
      setDetails([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (e) => {
    const productId = Number(e.target.value);
    setSelectedProduct(productId);

    const selectedProd = products.find((p) => Number(p.id) === productId);
    if (selectedProd) {
      const price = Number(selectedProd.price ?? selectedProd.unit_price ?? 0);
      setUnitPrice(price);
      setAmount(Number(quantity || 0) * price);
    } else {
      setUnitPrice(0);
      setAmount(0);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseFloat(e.target.value);
    setQuantity(newQuantity);
    setAmount(newQuantity * Number(unitPrice || 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id_receipt: Number(receipt.id),
        id_product: Number(selectedProduct),
        quantity: Number(quantity),
        unit_price: unitPrice !== '' ? Number(unitPrice) : undefined,
      };

      await createDetail(payload);

      setSelectedProduct('');
      setQuantity('');
      setUnitPrice('');
      setAmount('');

      fetchDetails();
    } catch (error) {
      console.error('Error creating detail:', error);
    }
  };

  const handleDeleteDetail = async (detailId) => {
    try {
      await deleteDetail(detailId);
      fetchDetails();
    } catch (error) {
      console.error('Error deleting detail:', error);
    }
  };

  if (!isOpen || !receipt) return null;

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto relative z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Detalles del Recibo #{receipt.nro} - {receipt.client?.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl flex items-center"
            title="Cerrar"
          >
            <FaTimes />
          </button>
        </div>

        {/* Toggle buttons */}
        <div className="mb-4 flex space-x-2">
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              showForm
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {/* FaEye */}
            < FaPlus />
            {showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
          </button>
          <button
            onClick={() => setShowTable(!showTable)}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              showTable
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FaTable />
            {showTable ? 'Ocultar Tabla' : 'Mostrar Tabla'}
          </button>
        </div>

        {/* Form to add details */}
        {showForm && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <FaPlus /> Agregar Nuevo Detalle
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Producto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Producto
                  </label>
                  <select
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
                </div>

                {/* Cantidad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="Cantidad"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Precio Unitario */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio Unitario
                  </label>
                  <input
                    type="text"
                    value={unitPrice}
                    readOnly
                    placeholder="Precio Unitario"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                {/* Monto Total */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monto Subtotal
                  </label>
                  <input
                    type="text"
                    value={
                      Number.isFinite(Number(amount)) && amount !== ''
                        ? Number(amount).toFixed(2)
                        : ''
                    }
                    readOnly
                    placeholder="Monto Subtotal"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-800 text-white py-2 px-6 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <FaPlus /> Agregar Detalle
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Table of details */}
        {showTable && (
          <div className="overflow-x-auto">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <FaTable /> Detalles del Recibo
            </h3>
            {loading ? (
              <p className="text-center text-gray-500 py-4">Cargando detalles...</p>
            ) : details.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No hay detalles para este recibo</p>
            ) : (
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm text-gray-600 border border-gray-300">
                      Producto
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-gray-600 border border-gray-300">
                      Cantidad
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-gray-600 border border-gray-300">
                      Precio Unit.
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-gray-600 border border-gray-300">
                      Subtotal
                    </th>
                    <th className="py-2 px-4 text-left text-sm text-gray-600 border border-gray-300">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((detail) => (
                    <tr key={detail.id} className="border-b border-gray-300">
                      <td className="py-2 px-4 text-sm border border-gray-300">
                        {detail.product?.name}
                      </td>
                      <td className="py-2 px-4 text-sm border border-gray-300">
                        {detail.quantity}
                      </td>
                      <td className="py-2 px-4 text-sm border border-gray-300">
                        BS {Number(detail.unit_price ?? 0).toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-sm font-semibold border border-gray-300">
                        BS {Number(detail.amount ?? 0).toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-sm border border-gray-300">
                        <button
                          onClick={() => handleDeleteDetail(detail.id)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1"
                          title="Eliminar"
                        >
                          <FaTrash /> Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptDetailModal;
