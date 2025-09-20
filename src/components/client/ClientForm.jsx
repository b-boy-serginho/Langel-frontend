// src/components/client/ClientForm.jsx

import React, { useState, useEffect } from 'react';

const ClientForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errorMessage, setErrorMessage] = useState('');  // Para mostrar errores

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el teléfono antes de enviar
    if (formData.phone && formData.phone.length > 8) {
      setErrorMessage('El teléfono no puede tener más de 8 caracteres');
      return; // No se enviará si hay error
    }

    // Convertir el teléfono a una cadena
    formData.phone = formData.phone.toString();
    
    // Mostrar los datos que se enviarán en la solicitud PUT
    console.log('Datos enviados en el formulario:', formData);
    onSubmit(formData); // Pass the form data to the parent component (onSubmit handler)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* {errorMessage && <div className="text-red-500">{errorMessage}</div>}  Mostrar errores */}

      <input
        type="text"
        name="name"
        value={formData.name || ''}  
        onChange={handleInputChange}
        placeholder="Nombre"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        value={formData.email || ''}  
        onChange={handleInputChange}
        placeholder="Correo Electrónico"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone || ''}  
        onChange={handleInputChange}
        placeholder="Teléfono"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-between items-center">
        <button type="submit" className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          {initialData ? 'Actualizar' : 'Crear'}
        </button>
        {onCancel && <button type="button" onClick={onCancel} className="text-gray-600 hover:text-gray-800">Cancelar</button>}
      </div>
    </form>
  );
};

export default ClientForm;
