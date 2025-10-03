// src/components/product/ProductModal.jsx

const ProductModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  if (!isOpen) return null; // Si no está abierto, no renderizamos nada

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-30 flex justify-center items-center z-50"> {/* Modal encima con z-50 */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl relative z-50"> {/* Modal con z-50 */}
        <h2 className="text-xl font-semibold mb-4">{initialData ? 'Editar Producto' : 'Crear Producto'}</h2>
        
        {/* El formulario dentro del modal */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              name: e.target.name.value,
              price: e.target.price.value,
              // description: e.target.description.value,
            });
            onClose(); // Cerrar el modal después de enviar el formulario
          }}
          className="space-y-4 mt-4"
        >
          <input
            type="text"
            name="name"
            defaultValue={initialData?.name || ''}
            placeholder="Nombre"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="price"
            defaultValue={initialData?.price || ''}
            placeholder="Ingresa el precio"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {/* <input
            type="text"
            name="description"
            defaultValue={initialData?.description || ''}
            placeholder="Ingresa una descripción"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            
          /> */}
          
          <div className="flex justify-between items-center mt-4">
            <button type="submit" className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
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

export default ProductModal;
