// src/components/ReceiptItem.jsx

const ReceiptItem = ({ receipt, onEdit, onDelete }) => {
  return (
    <li className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
      <div>
        <div className="text-lg font-bold">{receipt.client?.name}</div> {/* Acceso al nombre del cliente */}
        <div className="text-lg font-semibold">{receipt.nro} </div>
        <div className="text-sm text-gray-500">{receipt.total} </div>
        <div className="text-sm text-gray-500">{receipt.description}</div>
        <div className="text-sm text-gray-500">{receipt.day}</div>
        <div className="text-sm text-gray-500">{receipt.hour}</div>
        <div className="text-sm text-gray-500">{receipt.date}</div>
      </div>

      <div className="space-x-2">
        <button onClick={() => onEdit(receipt)} className="text-blue-500 hover:text-blue-700">Edit</button>
        <button onClick={() => onDelete(receipt.id)} className="text-red-500 hover:text-red-700">Delete</button>
      </div>
    </li>
  );
};

export default ReceiptItem;
