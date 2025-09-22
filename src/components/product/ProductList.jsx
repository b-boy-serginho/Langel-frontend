// src/components/ProductList.jsx

import ProductItem from './ProductItem';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-4 bg-white rounded-lg shadow-md p-6">
      <ul>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
