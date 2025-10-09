import ReceiptItem from './ReceiptItem';

const ReceiptList = ({ receipts, onEdit, onDelete, onAddDetail, onViewDetails }) => {
  return (
    <div className="overflow-x-auto mt-4 bg-white rounded-lg shadow-md p-6">
      {receipts.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No hay recibos</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
               {/* <th className="py-2 px-4 text-left text-sm text-gray-800 border border-gray-300">Recibo Nro.</th> */}
              {/* <th className="py-2 px-4 text-left text-sm text-gray-800 border border-gray-300">Cliente</th>              */}
              <th className="py-2 px-4 text-left text-sm text-gray-800 border border-gray-300">Total</th>
              {/* <th className="py-2 px-4 text-left text-sm text-gray-800 border border-gray-300">Nro</th> */}
              {/* <th className="py-2 px-4 text-left text-sm text-gray-800 border border-gray-300">Descripción</th> */}
              <th className="py-2 px-4 text-left text-sm text-gray-800 border border-gray-300">Día</th>
              {/* <th className="py-2 px-4 text-left text-sm text-gray-800 border border-gray-300">Hora</th> */}
              <th className="py-2 px-4 text-left text-sm text-gray-800 border border-gray-300">Fecha</th>
              <th className="py-2 px-4 text-left text-sm text-gray-800 border border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt) => (
              <ReceiptItem
                key={receipt.id}
                receipt={receipt}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddDetail={onAddDetail}
                onViewDetails={onViewDetails}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReceiptList;
