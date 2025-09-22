// src/components/detail/DetailItem.jsx

const DetailItem = ({ detail, onEdit, onDelete }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-2 px-4 text-sm">{detail.product?.name}</td>
      <td className="py-2 px-4 text-sm">{detail.receipt?.nro} - {detail.receipt?.client?.name}</td>
      <td className="py-2 px-4 text-sm">{detail.quantity}</td>
      <td className="py-2 px-4 text-sm">{Number(detail.unit_price ?? 0).toFixed(2)}</td>
      <td className="py-2 px-4 text-sm font-semibold">{Number(detail.amount ?? 0).toFixed(2)}</td>
      <td className="py-2 px-4 text-sm space-x-2">
        <button
          onClick={() => onEdit(detail)}
          className="text-blue-600 hover:text-blue-800"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(detail.id)}
          className="text-red-600 hover:text-red-800"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default DetailItem;
