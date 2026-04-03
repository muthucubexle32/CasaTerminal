// src/pages/ProductsPage.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Package,
  ChevronDown,
  Loader,
  X
} from 'lucide-react';

// ==================== TYPES ====================

interface Product {
  id: number;
  name: string;
  category: string;
  seller: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  stock: number;
}

// ==================== MOCK DATA ====================

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'UltraTech Cement (50kg)',
    category: 'Cement',
    seller: 'ABC Constructions',
    price: 350,
    rating: 4.5,
    reviews: 1250,
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500',
    stock: 5000,
  },
  {
    id: 2,
    name: 'TATA TMT Steel Bars (12mm)',
    category: 'Steel',
    seller: 'XYZ Enterprises',
    price: 750,
    rating: 4.8,
    reviews: 850,
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500',
    stock: 2500,
  },
  {
    id: 3,
    name: 'Asian Paints Royale',
    category: 'Paint',
    seller: 'PQR Builders',
    price: 2200,
    rating: 4.3,
    reviews: 430,
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500',
    stock: 0,
  },
  {
    id: 4,
    name: 'JCB 3DX Backhoe Loader',
    category: 'Equipment',
    seller: 'JCB Rentals',
    price: 8500,
    rating: 4.2,
    reviews: 12,
    location: 'Ahmedabad',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500',
    stock: 5,
  },
  {
    id: 5,
    name: 'Birla White Putty',
    category: 'Paint',
    seller: 'Singh Traders',
    price: 450,
    rating: 4.6,
    reviews: 320,
    location: 'Pune',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500',
    stock: 1200,
  },
  {
    id: 6,
    name: 'Kohler Bathroom Fittings',
    category: 'Sanitary',
    seller: 'Modern Bathrooms',
    price: 12500,
    rating: 4.7,
    reviews: 89,
    location: 'Chennai',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500',
    stock: 45,
  },
];

// List of supported locations (extracted from products)
const LOCATIONS = [...new Set(mockProducts.map(p => p.location))];

// ==================== CUSTOM HOOKS ====================

// Geolocation hook to detect user's city
const useGeolocation = () => {
  const [location, setLocation] = useState<{
    city: string;
    loading: boolean;
    error: string | null;
  }>({
    city: '',
    loading: false,
    error: null
  });

  const detectLocation = () => {
    setLocation(prev => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setLocation({
        city: '',
        loading: false,
        error: 'Geolocation is not supported by your browser'
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Using OpenStreetMap Nominatim API for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
          );
          const data = await response.json();
          // Extract city/town/village
          const city = data.address.city || data.address.town || data.address.village || 'Unknown';
          
          // Check if the detected city exists in our locations list
          const matchedLocation = LOCATIONS.find(loc => 
            loc.toLowerCase() === city.toLowerCase()
          ) || city; // Fallback to detected city even if not in list
          
          setLocation({
            city: matchedLocation,
            loading: false,
            error: null
          });
        } catch (error) {
          setLocation({
            city: '',
            loading: false,
            error: 'Could not detect your city'
          });
        }
      },
      (error) => {
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    );
  };

  return { location, detectLocation };
};

// ==================== COMPONENTS ====================

// Location Selector Component
interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  onAutoDetect: () => void;
  isDetecting: boolean;
}

const LocationSelector = ({ 
  selectedLocation, 
  onLocationChange, 
  onAutoDetect, 
  isDetecting 
}: LocationSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = LOCATIONS.filter(loc =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors text-left flex items-center justify-between"
          >
            <span className={selectedLocation ? 'text-gray-900' : 'text-gray-500'}>
              {selectedLocation || 'All Locations'}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <button
          onClick={onAutoDetect}
          disabled={isDetecting}
          className="px-3 py-2 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors disabled:opacity-50"
          title="Auto-detect my location"
        >
          {isDetecting ? (
            <Loader className="w-4 h-4 animate-spin text-secondary-500" />
          ) : (
            <MapPin className="w-4 h-4 text-secondary-500" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl"
          >
            <div className="p-2">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
                />
              </div>

              <div className="max-h-60 overflow-y-auto">
                {/* Option to clear location filter */}
                <button
                  onClick={() => {
                    onLocationChange('');
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg transition-colors hover:bg-primary-50 text-gray-700"
                >
                  All Locations
                </button>
                
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        onLocationChange(loc);
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                        selectedLocation === loc
                          ? 'bg-secondary-500 text-white'
                          : 'hover:bg-primary-50 text-gray-700'
                      }`}
                    >
                      {loc}
                    </button>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4 text-sm">No locations found</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating_desc'>('rating_desc');
  const [showFilters, setShowFilters] = useState(false);
  
  // Location state
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const { location: detectedLocation, detectLocation } = useGeolocation();

  // Auto-set location when detected
  useEffect(() => {
    if (detectedLocation.city && !selectedLocation) {
      setSelectedLocation(detectedLocation.city);
    }
  }, [detectedLocation.city, selectedLocation]);

  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  // Apply all filters (including location)
  const filteredProducts = mockProducts
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  p.seller.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => !selectedLocation || p.location === selectedLocation)
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating_desc') return b.rating - a.rating;
      return 0;
    });

  // Clear all filters including location
  const handleClearAllFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSelectedLocation('');
    setSortBy('rating_desc');
  };

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-500 mb-2">Construction Materials</h1>
          <p className="text-gray-600">Find the best quality construction materials at competitive prices</p>
        </motion.div>

        {/* Location Selector - Prominent placement */}
        <div className="mb-6 max-w-md mx-auto">
          <LocationSelector
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            onAutoDetect={detectLocation}
            isDetecting={detectedLocation.loading}
          />
          {detectedLocation.error && (
            <p className="text-xs text-red-500 mt-1 text-center">{detectedLocation.error}</p>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 bg-white"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4 text-secondary-500" />
            <span className="text-sm">Filters</span>
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 bg-white"
          >
            <option value="rating_desc">Top Rated</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleClearAllFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-secondary-500 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <p>
            Showing <span className="font-semibold text-secondary-500">{filteredProducts.length}</span> products
            {selectedLocation && <span> in <span className="font-medium">{selectedLocation}</span></span>}
          </p>
          {selectedLocation && (
            <button
              onClick={() => setSelectedLocation('')}
              className="text-secondary-500 hover:text-secondary-600 flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear location
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-1">
              {selectedLocation 
                ? `No products available in ${selectedLocation}. Try a different location.`
                : 'Try adjusting your search or filters'}
            </p>
            {(selectedLocation || searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={handleClearAllFilters}
                className="mt-4 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative h-48">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">Out of Stock</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-secondary-500 shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-secondary-500 text-lg mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {product.seller}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-secondary-500">₹{product.price.toLocaleString()}</span>
                    <button
                      disabled={product.stock === 0}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        product.stock === 0
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-secondary-500 text-white hover:bg-secondary-600'
                      }`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;