import React from 'react';
import { motion } from 'framer-motion';
import { Package, Calendar } from 'lucide-react';

const NearbyProducts: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h2 className="text-2xl font-bold text-gray-800">Nearby Products</h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary-500/10 mb-4">
          <Package className="w-10 h-10 text-secondary-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Our product marketplace is under development. Soon you'll find the best construction materials near you.
        </p>
        <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
          <Calendar className="w-4 h-4" />
          Launching in weeks
        </div>
      </motion.div>
    </div>
  );
};

export default NearbyProducts;