import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReceiptModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(initialData?.id_client || '');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/clients');
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const receiptData = {
            id_client: selectedClient,
            nro: e.target.nro.value,
            description: e.target.description.value,
        };
        onSubmit(receiptData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl relative z-50">
                <h2 className="text-xl font-semibold mb-4">{initialData ? 'Editar Recibo' : 'Crear Recibo'}</h2>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Selección del Cliente */}
                    <select
                        name="id_client"
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)} // Actualiza el cliente seleccionado
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

                    <input
                        type="text"
                        name="nro"
                        defaultValue={initialData?.nro || ''}
                        placeholder="Número de recibo"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        defaultValue={initialData?.description || ''}
                        placeholder="Descripción (opcional)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex justify-between items-center mt-4">
                        <button type="submit" className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                            {initialData ? 'Actualizar' : 'Crear'}
                        </button>
                        <button type="button" onClick={onClose} className="text-red-600 hover:text-gray-800">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReceiptModal;
