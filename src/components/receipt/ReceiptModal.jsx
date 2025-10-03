import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/axiosApi';
import { createDetail, deleteDetail } from '../../api/detailApi';

const ReceiptModal = ({ isOpen, onClose, onSubmit, initialData, fixedClientId, fixedClientName }) => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(
        fixedClientId ?? (initialData?.id_client ?? '')
    );

    // Paso 2: estado del recibo creado y datos para detalles
    const [createdReceipt, setCreatedReceipt] = useState(null);
    const [products, setProducts] = useState([]);
    const [details, setDetails] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(false);

    // Formulario de detalle
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [amount, setAmount] = useState('');

    // Reset cuando se abre/cierra o cambia initialData
    useEffect(() => {
        if (!isOpen) {
            setCreatedReceipt(null);
            setSelectedClient(fixedClientId ?? (initialData?.id_client ?? ''));
            setProducts([]);
            setDetails([]);
            setSelectedProduct('');
            setQuantity('');
            setUnitPrice('');
            setAmount('');
        }
    }, [isOpen, initialData]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const { data } = await apiClient.get('/clients');
                setClients(Array.isArray(data?.data) ? data.data : data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };
        if (isOpen && fixedClientId == null) fetchClients();
    }, [isOpen]);

    useEffect(() => {
        if (createdReceipt) {
            fetchProducts();
            fetchDetails();
        }
    }, [createdReceipt]);

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
            setLoadingDetails(true);
            const { data } = await apiClient.get('/details');
            const allDetails = Array.isArray(data?.data) ? data.data : data;
            const receiptDetails = allDetails.filter(d => Number(d.id_receipt) === Number(createdReceipt.id));
            setDetails(receiptDetails);
        } catch (e) {
            console.error('Error fetching details:', e);
            setDetails([]);
        } finally {
            setLoadingDetails(false);
        }
    };

    if (!isOpen) return null;

    const handleCreateOrUpdate = async (e) => {
        e.preventDefault();
        const receiptData = {
            id_client: Number(fixedClientId ?? selectedClient),
        };

        // Edición: mantener comportamiento anterior
        if (initialData) {
            await onSubmit(receiptData);
            onClose();
            return;
        }

        // Creación: continuar al paso de detalles sin cerrar
        const created = await onSubmit(receiptData);
        if (created && created.id) {
            setCreatedReceipt(created);
        }
    };

    const handleProductChange = (e) => {
        const productId = Number(e.target.value);
        setSelectedProduct(productId);
        const selected = products.find(p => Number(p.id) === productId);
        if (selected) {
            const price = Number(selected.price ?? selected.unit_price ?? 0);
            setUnitPrice(price);
            setAmount(Number(quantity || 0) * price);
        } else {
            setUnitPrice(0);
            setAmount(0);
        }
    };

    const handleQuantityChange = (e) => {
        // const q = Number(e.target.value);
        const q = parseFloat(e.target.value); // Usar parseFloat en lugar de Number para manejar decimales
        setQuantity(q);
        setAmount(q * Number(unitPrice || 0));
    };

    const handleAddDetail = async (e) => {
        e.preventDefault();
        try {
            if (!createdReceipt) return;
            const payload = {
                id_receipt: Number(createdReceipt.id),
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
        } catch (err) {
            console.error('Error creating detail:', err);
        }
    };

    const handleDeleteDetail = async (detailId) => {
        try {
            await deleteDetail(detailId);
            fetchDetails();
        } catch (err) {
            console.error('Error deleting detail:', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl relative z-50">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold mb-4">
                        {initialData ? 'Editar Recibo' : (createdReceipt ? `Recibo #${createdReceipt?.nro || createdReceipt?.id}` : 'Crear Recibo')}
                    </h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-2xl">×</button>
                </div>

                {/* Paso 1: Crear/editar recibo */}
                {!createdReceipt && (
                    <form onSubmit={handleCreateOrUpdate} className="space-y-4 mt-2">
                        {fixedClientId != null ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                                <input
                                    type="text"
                                    value={fixedClientName || `ID: ${fixedClientId}`}
                                    readOnly
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                                />
                            </div>
                        ) : (
                            <select
                                name="id_client"
                                value={selectedClient}
                                onChange={(e) => setSelectedClient(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Selecciona un cliente</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        <div className="flex justify-between items-center mt-4">
                            <button type="submit" className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                {initialData ? 'Actualizar' : 'Crear y agregar detalles'}
                            </button>
                            <button type="button" onClick={onClose} className="text-red-600 hover:text-gray-800">
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}

                {/* Paso 2: Agregar detalles al recibo creado */}
                {createdReceipt && (
                    <div className="mt-4">
                        <div className="mb-3">
                            <p className="text-sm text-gray-600">
                                Cliente: <span className="font-semibold">{createdReceipt.client?.name || clients.find(c => Number(c.id) === Number(createdReceipt.id_client))?.name}</span>
                            </p>
                        </div>

                        <div className="mb-6 p-4 border border-gray-300 rounded-lg">
                            <h3 className="text-lg font-medium mb-4">Agregar Nuevo Detalle</h3>
                            <form onSubmit={handleAddDetail} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
                                        <select
                                            value={selectedProduct}
                                            onChange={handleProductChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Selecciona un producto</option>
                                            {products.map((p) => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                                        <input
                                            type="number"
                                            min="1"
                                            // step="1"
                                            step="any"  // Permite números decimales
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            placeholder="Cantidad"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unitario</label>
                                        <input
                                            type="text"
                                            value={unitPrice}
                                            readOnly
                                            placeholder="Precio Unitario"
                                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Monto Total</label>
                                        <input
                                            type="text"
                                            value={
                                                Number.isFinite(Number(amount)) && amount !== ''
                                                    ? Number(amount).toFixed(2)
                                                    : ''
                                            }
                                            readOnly
                                            placeholder="Monto Total"
                                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <button type="submit" className="bg-blue-800 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
                                        Agregar Detalle
                                    </button>
                                    <button type="button" onClick={onClose} className="text-red-600 hover:text-gray-800">Cerrar</button>
                                </div>
                            </form>
                        </div>

                        <div className="overflow-x-auto">
                            <h3 className="text-lg font-medium mb-4">Detalles del Recibo</h3>
                            {loadingDetails ? (
                                <p className="text-center text-gray-500 py-4">Cargando detalles...</p>
                            ) : details.length === 0 ? (
                                <p className="text-center text-gray-500 py-4">No hay detalles para este recibo</p>
                            ) : (
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="py-2 px-4 text-left text-sm text-gray-600 border border-gray-300">Producto</th>
                                            <th className="py-2 px-4 text-left text-sm text-gray-600 border border-gray-300">Cantidad</th>
                                            <th className="py-2 px-4 text-left text-sm text-gray-600 border border-gray-300">Precio Unit.</th>
                                            <th className="py-2 px-4 text-left text-sm text-gray-600 border border-gray-300">Monto</th>
                                            <th className="py-2 px-4 text-left text-sm text-gray-600 border border-gray-300">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {details.map((detail) => (
                                            <tr key={detail.id} className="border-b border-gray-300">
                                                <td className="py-2 px-4 text-sm border border-gray-300">{detail.product?.name}</td>
                                                <td className="py-2 px-4 text-sm border border-gray-300">{detail.quantity}</td>
                                                <td className="py-2 px-4 text-sm border border-gray-300">BS {Number(detail.unit_price ?? 0).toFixed(2)}</td>
                                                <td className="py-2 px-4 text-sm font-semibold border border-gray-300">BS {Number(detail.amount ?? 0).toFixed(2)}</td>
                                                <td className="py-2 px-4 text-sm border border-gray-300">
                                                    <button onClick={() => handleDeleteDetail(detail.id)} className="text-red-600 hover:text-red-800">Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReceiptModal;
