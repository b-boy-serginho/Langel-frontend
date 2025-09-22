// src/components/detail/DetailList.jsx

import DetailItem from './DetailItem';

const DetailList = ({ details, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-4 bg-white rounded-lg shadow-md p-6">
      {details.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No hay detalles</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-sm text-gray-600">Producto</th>
              <th className="py-2 px-4 text-left text-sm text-gray-600">Recibo</th>
              <th className="py-2 px-4 text-left text-sm text-gray-600">Cantidad</th>
              <th className="py-2 px-4 text-left text-sm text-gray-600">P. Unit.</th>
              <th className="py-2 px-4 text-left text-sm text-gray-600">Monto</th>
              <th className="py-2 px-4 text-left text-sm text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail) => (
              <DetailItem
                key={detail.id}
                detail={detail}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DetailList;
