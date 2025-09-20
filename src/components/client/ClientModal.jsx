import React from 'react';

const ClientModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  if (!isOpen) return null; // Si no está abierto, no renderizamos nada

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-30 flex justify-center items-center z-50"> {/* Modal encima con z-50 */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl relative z-50"> {/* Modal con z-50 */}
        <h2 className="text-xl font-semibold mb-4">{initialData ? 'Editar Cliente' : 'Crear Cliente'}</h2>
        
        {/* El formulario dentro del modal */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              name: e.target.name.value,
              email: e.target.email.value,
              phone: e.target.phone.value,
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
            type="email"
            name="email"
            defaultValue={initialData?.email || ''}
            placeholder="Correo Electrónico"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="phone"
            defaultValue={initialData?.phone || ''}
            placeholder="Teléfono"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex justify-between items-center mt-4">
            <button type="submit" className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              {initialData ? 'Actualizar' : 'Crear'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;
