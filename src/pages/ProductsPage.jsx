import React, { useState } from 'react';
import { HiPlus, HiShoppingBag, HiSearch, HiFilter } from 'react-icons/hi';
import ProductList from '../components/product/ProductList';
import useProducts from '../hooks/useProducts';
import ProductModal from '../components/product/ProductModal';

const ProductsPage = () => {
  const { products, loading, handleCreate, handleUpdate, handleDelete } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(''); // Estado para manejar los mensajes

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (productData) => {
    if (editingProduct) {
      handleUpdate(editingProduct.id, productData).then(() => {
        setMessage('Producto actualizado exitosamente'); // Mensaje de éxito
        setTimeout(() => setMessage(''), 5000); // Elimina el mensaje después de 5 segundos
      }).catch((error) => {
        setMessage('Error al actualizar el producto'); // Mensaje de error
        setTimeout(() => setMessage(''), 5000); // Elimina el mensaje después de 5 segundos
      });
    } else {
      handleCreate(productData).then(() => {
        setMessage('Producto creado exitosamente'); // Mensaje de éxito
        setTimeout(() => setMessage(''), 5000); // Elimina el mensaje después de 5 segundos
      }).catch((error) => {
        setMessage('Error al crear el producto'); // Mensaje de error
        setTimeout(() => setMessage(''), 5000); // Elimina el mensaje después de 5 segundos
      });
    }
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (isConfirmed) {
      handleDelete(id).then(() => {
        setMessage('Producto eliminado exitosamente'); // Mensaje de éxito
        setTimeout(() => setMessage(''), 5000); // Elimina el mensaje después de 5 segundos
      }).catch((error) => {
        setMessage('Error al eliminar el producto'); // Mensaje de error
        setTimeout(() => setMessage(''), 5000); // Elimina el mensaje después de 5 segundos
      });
    } else {
      setMessage('Eliminación cancelada'); // Mensaje si el usuario cancela
      setTimeout(() => setMessage(''), 5000); // Elimina el mensaje después de 5 segundos
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header de la página */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <HiShoppingBag className="w-8 h-8 text-teal-600 mr-3" />
            Productos Agregados
          </h1>
          <p className="text-gray-600 mt-2">
            Administra tu inventario de productos de manera eficiente
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-6 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <HiPlus className="w-5 h-5" />
          <span>Agregar Producto</span>
        </button>
      </div>

      {/* Mostrar mensaje de éxito o error */}
      {message && (
        <div className="p-4 bg-teal-100 text-teal-800 rounded-lg shadow-md">
          <p>{message}</p>
        </div>
      )}

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiSearch className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors duration-200" />
            </div>
            <input
              type="text"
              placeholder="Buscar productos..."
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

      {/* Lista de productos */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-xl transition-all duration-300">
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                <HiShoppingBag className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Lista de Productos
                {searchTerm && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({filteredProducts.length} resultados)
                  </span>
                )}
              </h2>
            </div>
            <div className="flex items-center space-x-2 bg-teal-50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-teal-700">Activo</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin"></div>
                <span className="text-gray-600 font-medium">Cargando productos...</span>
              </div>
            </div>
          ) : (
            <ProductList
              products={filteredProducts}
              onEdit={handleEdit}
              onDelete={handleDeleteProduct}  // Asegúrate de pasar la función de eliminar
            />
          )}
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <HiShoppingBag className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Productos</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">{products.length}</p>
            </div>
          </div>
        </div>
        {/* <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <HiShoppingBag className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">En Stock</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">{products.length}</p>
            </div>
          </div>
        </div> */}
        {/* <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <HiShoppingBag className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Categorías</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">5</p>
            </div>
          </div>
        </div> */}
      </div>


      {/* Modal para agregar/editar producto */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        onSubmit={handleSubmit}
        initialData={editingProduct}
      />
    </div>
  );
};

export default ProductsPage;
