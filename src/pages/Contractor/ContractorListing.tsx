import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter,
  Star, 
  MapPin, 
  Clock,
  CheckCircle,
  ChevronRight,
  SlidersHorizontal,
  
} from 'lucide-react';

const ContractorListing = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: '',
    experience: '',
    location: '',
    verified: false,
  });

  const contractors = [
    {
      id: 1,
      name: 'John Smith',
      title: 'Master Builder',
      rating: 4.8,
      reviews: 156,
      location: 'Mumbai',
      experience: '15+ years',
      projects: 85,
      verified: true,
      specialties: ['Residential', 'Commercial'],
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200',
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      title: 'Civil Contractor',
      rating: 4.9,
      reviews: 203,
      location: 'Delhi',
      experience: '12+ years',
      projects: 120,
      verified: true,
      specialties: ['High-rise', 'Renovation'],
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      title: 'Interior Specialist',
      rating: 4.7,
      reviews: 98,
      location: 'Bangalore',
      experience: '8+ years',
      projects: 45,
      verified: true,
      specialties: ['Interior', 'Renovation'],
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200',
    },
    {
      id: 4,
      name: 'Amit Patel',
      title: 'Commercial Contractor',
      rating: 4.6,
      reviews: 112,
      location: 'Ahmedabad',
      experience: '10+ years',
      projects: 67,
      verified: false,
      specialties: ['Commercial', 'Industrial'],
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
    },
    {
      id: 5,
      name: 'Suresh Reddy',
      title: 'Infrastructure Expert',
      rating: 4.9,
      reviews: 178,
      location: 'Hyderabad',
      experience: '20+ years',
      projects: 150,
      verified: true,
      specialties: ['Infrastructure', 'Bridges'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    },
    {
      id: 6,
      name: 'Anita Desai',
      title: 'Green Building Specialist',
      rating: 4.8,
      reviews: 89,
      location: 'Pune',
      experience: '7+ years',
      projects: 34,
      verified: true,
      specialties: ['Eco-friendly', 'Residential'],
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    },
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
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-500">Find Verified Contractors</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Connect with trusted professionals for your construction needs</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-4 sm:mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, location, or specialty..."
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
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <select
                      value={filters.rating}
                      onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    >
                      <option value="">All Ratings</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4.0">4.0+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <select
                      value={filters.experience}
                      onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    >
                      <option value="">Any Experience</option>
                      <option value="5">5+ Years</option>
                      <option value="10">10+ Years</option>
                      <option value="15">15+ Years</option>
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
                      <span className="text-sm text-gray-700">Verified Only</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
       
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center mb-4 sm:mb-6"
        >
          <p className="text-xs sm:text-sm text-gray-600">
            Showing <span className="font-semibold text-secondary-500">{contractors.length}</span> contractors
          </p>
          <select className="text-xs sm:text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-secondary-500">
            <option>Most Relevant</option>
            <option>Rating: High to Low</option>
            <option>Experience: High to Low</option>
          </select>
        </motion.div>

        {/* Contractor Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {contractors.map((contractor, index) => (
            <motion.div
              key={contractor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/contractor/${contractor.id}`)}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="relative h-32 sm:h-36 overflow-hidden">
                <img
                  src={contractor.image}
                  alt={contractor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {contractor.verified && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-secondary-500 text-base sm:text-lg">{contractor.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{contractor.title}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary-50 px-2 py-1 rounded">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs sm:text-sm font-semibold text-secondary-500">{contractor.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{contractor.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{contractor.experience} experience</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {contractor.specialties.map((specialty, i) => (
                    <span key={i} className="px-2 py-0.5 bg-primary-50 text-secondary-500 rounded-full text-[10px] sm:text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600">
                    {contractor.projects} projects
                  </span>
                  <span className="text-secondary-500 font-medium text-xs sm:text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Profile
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ContractorListing;