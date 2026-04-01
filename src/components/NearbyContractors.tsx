import React from 'react';
import { dummyContractors } from '../data/dummyData';
import NearbySection from './NearbySection';
import { Star } from 'lucide-react';

const ContractorCard: React.FC<{ contractor: any }> = ({ contractor }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
    <img src={contractor.image} alt={contractor.name} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-gray-800">{contractor.name}</h3>
      <p className="text-sm text-gray-500">{contractor.service}</p>
      <div className="flex items-center gap-1 mt-2">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-semibold">{contractor.rating}</span>
      </div>
    </div>
  </div>
);

const NearbyContractors: React.FC = () => {
  return (
    <NearbySection
      title="Nearby Contractors"
      items={dummyContractors}
      renderItem={(item) => <ContractorCard contractor={item} />}
      getLocation={(item) => item.location}
    />
  );
};

export default NearbyContractors;