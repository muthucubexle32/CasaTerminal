// src/pages/ProductsPage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, MapPin, Package } from 'lucide-react';

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

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating_desc'>('rating_desc');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  const filteredProducts = mockProducts
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.seller.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating_desc') return b.rating - a.rating;
      return 0;
    });

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
              {/* Add more filters if needed */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-secondary-500"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
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