import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter,
  Star, 
  MapPin, 
  Clock,
  CheckCircle,
 
  SlidersHorizontal,
  Truck,
  Wrench,
  Package,
  Fuel,
  Users,
  
} from 'lucide-react';

const RentalListing = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    location: '',
    verified: false,
  });

  const equipment = [
    {
      id: 1,
      name: 'JCB 3DX Backhoe Loader',
      category: 'Heavy Equipment',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500',
      price: '₹8,500/day',
      rating: 4.8,
      location: 'Mumbai',
      provider: 'Mumbai Rentals',
      verified: true,
      available: true,
    },
    {
      id: 2,
      name: 'Concrete Mixer 10/7',
      category: 'Construction Equipment',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500',
      price: '₹2,500/day',
      rating: 4.6,
      location: 'Delhi',
      provider: 'Delhi Tools',
      verified: true,
      available: true,
    },
    {
      id: 3,
      name: 'Tower Crane 20 Ton',
      category: 'Heavy Equipment',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500',
      price: '₹25,000/day',
      rating: 4.9,
      location: 'Mumbai',
      provider: 'High Rise Rentals',
      verified: true,
      available: false,
    },
    {
      id: 4,
      name: 'Scaffolding Set (1000 sqft)',
      category: 'Scaffolding',
      image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=500',
      price: '₹3,500/day',
      rating: 4.5,
      location: 'Bangalore',
      provider: 'Bangalore Scaffolds',
      verified: true,
      available: true,
    },
    {
      id: 5,
      name: 'Power Generator 50kVA',
      category: 'Power Equipment',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500',
      price: '₹5,000/day',
      rating: 4.7,
      location: 'Pune',
      provider: 'Power Solutions',
      verified: false,
      available: true,
    },
    {
      id: 6,
      name: 'Compactor/Roller 8 Ton',
      category: 'Heavy Equipment',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500',
      price: '₹7,500/day',
      rating: 4.6,
      location: 'Ahmedabad',
      provider: 'Gujarat Rentals',
      verified: true,
      available: true,
    },
    {
      id: 7,
      name: 'Forklift 3 Ton',
      category: 'Material Handling',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500',
      price: '₹4,000/day',
      rating: 4.4,
      location: 'Chennai',
      provider: 'Chennai Equipments',
      verified: true,
      available: true,
    },
    {
      id: 8,
      name: 'Poclain 210',
      category: 'Heavy Equipment',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500',
      price: '₹12,000/day',
      rating: 4.9,
      location: 'Hyderabad',
      provider: 'Hyderabad Rentals',
      verified: true,
      available: false,
    },
  ];

  const categories = [
    { icon: Truck, label: 'Heavy Equipment', count: 24 },
    { icon: Wrench, label: 'Construction Tools', count: 42 },
    { icon: Package, label: 'Scaffolding', count: 18 },
    { icon: Fuel, label: 'Generators', count: 15 },
    { icon: Users, label: 'Material Handling', count: 12 },
  ];

  return (
    <div className="min-h-screen bg-primary-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-500">Rental Equipment & Vehicles</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Find construction equipment and vehicles for rent</p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6"
        >
          {categories.map((category) => (
            <button
              key={category.label}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all border border-gray-200"
            >
              <category.icon className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">{category.label}</span>
              <span className="text-xs bg-primary-100 px-1.5 py-0.5 rounded-full text-secondary-500">{category.count}</span>
            </button>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-4 sm:mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by equipment name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500" />
              <span className="text-sm sm:text-base text-gray-700">Filters</span>
              <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4 mt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    >
                      <option value="">All Categories</option>
                      <option value="heavy">Heavy Equipment</option>
                      <option value="construction">Construction Tools</option>
                      <option value="scaffolding">Scaffolding</option>
                      <option value="generators">Generators</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Price Range</label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    >
                      <option value="">Any Price</option>
                      <option value="0-5000">Under ₹5,000/day</option>
                      <option value="5000-10000">₹5,000 - ₹10,000/day</option>
                      <option value="10000+">Above ₹10,000/day</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Location</label>
                    <select
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    >
                      <option value="">All Locations</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.verified}
                        onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                        className="w-4 h-4 text-secondary-500 rounded focus:ring-secondary-500"
                      />
                      <span className="text-sm text-gray-700">Verified Providers Only</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-between items-center mb-4 sm:mb-6"
        >
          <p className="text-xs sm:text-sm text-gray-600">
            Showing <span className="font-semibold text-secondary-500">{equipment.length}</span> equipment items
          </p>
          <select className="text-xs sm:text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-secondary-500">
            <option>Most Relevant</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: High to Low</option>
          </select>
        </motion.div>

        {/* Equipment Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {equipment.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/rental/${item.id}`)}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="relative h-36 sm:h-40 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {!item.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">Not Available</span>
                  </div>
                )}
                {item.verified && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-secondary-500 text-sm sm:text-base mb-1 line-clamp-1">{item.name}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs sm:text-sm font-semibold text-secondary-500">{item.rating}</span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500">{item.category}</span>
                </div>

                <div className="space-y-1 mb-2">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{item.provider}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600">from</span>
                  <span className="font-bold text-secondary-500 text-sm sm:text-base">{item.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RentalListing;