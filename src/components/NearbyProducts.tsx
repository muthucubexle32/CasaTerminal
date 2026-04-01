import React from 'react';
import { dummyProducts } from '../data/dummyData';
import NearbySection from './NearbySection';

const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.seller}</p>
      <p className="text-primary-600 font-bold mt-2">₹{product.price}</p>
    </div>
  </div>
);

const NearbyProducts: React.FC = () => {
  return (
    <NearbySection
      title="Nearby Products"
      items={dummyProducts}
      renderItem={(item) => <ProductCard product={item} />}
      getLocation={(item) => item.location}
    />
  );
};

export default NearbyProducts;