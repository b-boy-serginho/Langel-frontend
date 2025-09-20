// src/components/DetailList.jsx

import React from 'react';
import DetailItem from './DetailItem';

const DetailList = ({ details, onEdit, onDelete }) => {
  return (
    <ul>
      {details.map((detail) => (
        <DetailItem
          key={detail.id}
          detail={detail}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default DetailList;
