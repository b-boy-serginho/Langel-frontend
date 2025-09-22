// src/components/ReceiptList.jsx

import ReceiptItem from './ReceiptItem';

const ReceiptList = ({ receipts, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-4 bg-white rounded-lg shadow-md p-6">
      <ul>
        {receipts.map((receipt) => (
          <ReceiptItem
            key={receipt.id}
            receipt={receipt}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default ReceiptList;
