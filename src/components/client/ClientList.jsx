// src/components/client/ClientList.jsx

import ClientItem from './ClientItem';

const ClientList = ({ clients, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-4 bg-white rounded-lg shadow-md p-6">
      <ul>
        {clients.map((client) => (
          <ClientItem
            key={client.id}
            client={client}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default ClientList;

