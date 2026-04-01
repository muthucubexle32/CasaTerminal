import React from 'react';
import { dummyRentals } from '../data/dummyData';
import NearbySection from './NearbySection';

const RentalCard: React.FC<{ rental: any }> = ({ rental }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
    <img src={rental.image} alt={rental.name} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-gray-800">{rental.name}</h3>
      <p className="text-sm text-gray-500">{rental.equipment}</p>
      <p className="text-primary-600 font-bold mt-2">₹{rental.pricePerDay}/day</p>
    </div>
  </div>
);

const NearbyRentals: React.FC = () => {
  return (
    <NearbySection
      title="Nearby Rentals"
      items={dummyRentals}
      renderItem={(item) => <RentalCard rental={item} />}
      getLocation={(item) => item.location}
    />
  );
};

export default NearbyRentals;