const ReceiptItem = ({ receipt, onEdit, onDelete }) => {
  return (
    <tr className="border-b border-gray-300">
      <td className="py-2 px-4 text-sm border border-gray-300">{receipt.client?.name}</td>
      <td className="py-2 px-4 text-sm border border-gray-300">{receipt.nro}</td>
      <td className="py-2 px-4 text-sm border border-gray-300">{receipt.total}</td>
      <td className="py-2 px-4 text-sm border border-gray-300">{receipt.description}</td>
      <td className="py-2 px-4 text-sm border border-gray-300">{receipt.day}</td>
      <td className="py-2 px-4 text-sm border border-gray-300">{receipt.hour}</td>
      <td className="py-2 px-4 text-sm border border-gray-300">{receipt.date}</td>
      <td className="py-2 px-4 text-sm border border-gray-300 space-x-2">
        <button
          onClick={() => onEdit(receipt)}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(receipt.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReceiptItem;
