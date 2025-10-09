import { FaPlus, FaEye, FaTrash } from "react-icons/fa";

const ReceiptItem = ({ receipt, onEdit, onDelete, onAddDetail, onViewDetails }) => {
  return (
    <tr className="border-b border-gray-300">
      {/* <td className="py-2 px-4 text-sm border border-gray-300">Recibo: {receipt.id}</td> */}
      {/* <td className="py-2 px-4 text-sm border border-gray-300">{receipt.client?.name}</td> */}
      <td className="py-2 px-4 text-sm border font-bold border-gray-300">BS {receipt.total}</td>
       {/* <td className="py-2 px-4 text-sm border border-gray-300">BS {receipt.nro}</td> */}
      {/* <td className="py-2 px-4 text-sm border border-gray-300">{receipt.description}</td> */}
      <td className="py-2 px-4 text-sm border border-gray-300">{receipt.day}</td>
      {/* <td className="py-2 px-4 text-sm border border-gray-300">{receipt.hour}</td> */}
      <td className="py-2 px-4 text-sm border border-gray-300">{receipt.date}</td>
      <td className="py-2 px-4 text-sm border border-gray-300 space-x-2">
        <button
          onClick={() => onAddDetail(receipt)}
          className="text-green-600 hover:text-green-800 mr-2 flex items-center gap-1"
        >
          <FaPlus /> Agregar Detalle
        </button>
        <button
          onClick={() => onViewDetails(receipt)}
          className="text-blue-600 hover:text-blue-800 mr-2 flex items-center gap-1"
        >
          <FaEye /> Ver Detalles
        </button>
        <button
          onClick={() => onDelete(receipt.id)}
          className="text-red-500 hover:text-red-700 flex items-center gap-1"
        >
          <FaTrash /> Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ReceiptItem;
