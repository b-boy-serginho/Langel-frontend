import React, { useState } from 'react';
import { HiPlus, HiUsers, HiSearch, HiFilter, HiUserGroup } from 'react-icons/hi';
import ClientList from '../components/client/ClientList';
import ClientModal from '../components/client/ClientModal';
import useClients from '../hooks/useClients';

const ClientsPage = () => {
  const { clients, loading, handleCreate, handleUpdate, handleDelete } = useClients();
  const [editingClient, setEditingClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingClient(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (clientData) => {
    if (editingClient) {
      handleUpdate(editingClient.id, clientData);
    } else {
      handleCreate(clientData);
    }
    setIsModalOpen(false);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header de la página */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <HiUsers className="w-8 h-8 text-teal-600 mr-3" />
            Clientes registrados
          </h1>
          <p className="text-gray-600 mt-2">
            Administra tu base de datos de clientes de manera eficiente
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-6 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <HiPlus className="w-5 h-5" />
          <span>Agregar Cliente</span>
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiSearch className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors duration-200" />
            </div>
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 focus:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>
          <button className="group flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200/50 rounded-xl text-gray-700 hover:from-teal-50 hover:to-blue-50 hover:border-teal-200/50 hover:text-teal-700 transition-all duration-300 hover:scale-105 hover:shadow-md">
            <HiFilter className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
            <span className="font-medium">Filtros</span>
          </button>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-xl transition-all duration-300">
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <HiUsers className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Lista de Clientes
                {searchTerm && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({filteredClients.length} resultados)
                  </span>
                )}
              </h2>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">Activo</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin"></div>
                <span className="text-gray-600 font-medium">Cargando clientes...</span>
              </div>
            </div>
          ) : (
            <ClientList 
              clients={filteredClients} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          )}
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <HiUsers className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Clientes</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">{clients.length}</p>
            </div>
          </div>
        </div>
        {/* <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <HiUserGroup className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Clientes Activos</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">{clients.length}</p>
            </div>
          </div>
        </div> */}
        {/* <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <HiUsers className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Nuevos Este Mes</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">12</p>
            </div>
          </div>
        </div> */}
      </div>

      

      <ClientModal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        onSubmit={handleSubmit}
        initialData={editingClient}
      />
    </div>
  );
};

export default ClientsPage;
