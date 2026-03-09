import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Store, 
  Hammer, 
  Truck,
  ChevronRight,
  CheckCircle,
  Shield,
  Star,
  Clock,
  Users,
  X,
  ArrowRight
} from 'lucide-react';
import SellerSection from './Seller/SellerSection';
import ContractorSection from './Contractor/ContractorSection';
import RentalSection from './Rental/RentalSection';

// Define types
interface Contractor {
  id: number;
  name: string;
  owner: string;
  rating: number;
  reviews: number;
  projects: number;
  location: string;
  specialties: string[];
  verified: boolean;
  image: string;
}

interface Rental {
  id: number;
  name: string;
  owner: string;
  rating: number;
  reviews: number;
  equipmentCount: number;
  location: string;
  categories: string[];
  verified: boolean;
  image: string;
}

// Mock Contractor Data with proper typing
const mockContractors: Contractor[] = [
  {
    id: 1,
    name: 'XX XXXX Construction',
    owner: 'XX XXXX',
    rating: 4.8,
    reviews: 156,
    projects: 85,
    location: 'XXXX, YYY',
    specialties: ['Civil', 'Structural'],
    verified: true,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200'
  },
  {
    id: 2,
    name: 'YYYY Builders',
    owner: 'YYYY YYYY',
    rating: 4.9,
    reviews: 203,
    projects: 120,
    location: 'XXXX, YYY',
    specialties: ['Electrical', 'Plumbing'],
    verified: true,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'
  },
  {
    id: 3,
    name: 'ZZZZ Developers',
    owner: 'ZZZZ ZZZZ',
    rating: 4.7,
    reviews: 98,
    projects: 45,
    location: 'XXXX, YYY',
    specialties: ['Interior', 'Renovation'],
    verified: true,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200'
  },
  {
    id: 4,
    name: 'AAAA Contractors',
    owner: 'AAAA AAAA',
    rating: 4.6,
    reviews: 112,
    projects: 67,
    location: 'XXXX, YYY',
    specialties: ['Waterproofing', 'MEP'],
    verified: false,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200'
  }
];

// Mock Rental Data with proper typing
const mockRentals: Rental[] = [
  {
    id: 1,
    name: 'ABC Equipment Rentals',
    owner: 'Rajesh Kumar',
    rating: 4.9,
    reviews: 234,
    equipmentCount: 45,
    location: 'Mumbai, Maharashtra',
    categories: ['Heavy Equipment', 'Generators', 'Scaffolding'],
    verified: true,
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200'
  },
  {
    id: 2,
    name: 'XYZ Construction Rentals',
    owner: 'Priya Singh',
    rating: 4.7,
    reviews: 178,
    equipmentCount: 32,
    location: 'Delhi, NCR',
    categories: ['Construction Tools', 'Material Handling', 'Compressors'],
    verified: true,
    image: 'https://images.unsplash.com/photo-1581092335871-4c7ff3e832b5?w=200'
  },
  {
    id: 3,
    name: 'PQR Heavy Machinery',
    owner: 'Amit Patel',
    rating: 4.8,
    reviews: 156,
    equipmentCount: 28,
    location: 'Ahmedabad, Gujarat',
    categories: ['Excavators', 'Cranes', 'Loaders'],
    verified: true,
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200'
  },
  {
    id: 4,
    name: 'LMN Tool Rentals',
    owner: 'Sneha Reddy',
    rating: 4.6,
    reviews: 98,
    equipmentCount: 15,
    location: 'Bangalore, Karnataka',
    categories: ['Power Tools', 'Safety Equipment', 'Surveying'],
    verified: false,
    image: 'https://images.unsplash.com/photo-1581092335871-4c7ff3e832b5?w=200'
  }
];

// Login Modal Component with proper return type
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  userType: 'contractor' | 'seller' | 'rental';
}

const LoginModal = ({ isOpen, onClose, onLogin, userType }: LoginModalProps): JSX.Element | null => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    company: ''
  });

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-secondary-500">
              {isRegistering ? 'Create Account' : 'Welcome Back'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            {isRegistering 
              ? `Register as a ${userType} to start listing your services`
              : `Login to your ${userType} account to continue`}
          </p>

          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
            {isRegistering && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500"
                    placeholder="Enter phone number"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-secondary-500 to-primary-500 text-white rounded-lg font-medium hover:from-secondary-600 hover:to-primary-600 transition-all"
            >
              {isRegistering ? 'Create Account & Continue' : 'Login & Continue'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm text-secondary-500 hover:text-primary-600"
            >
              {isRegistering 
                ? 'Already have an account? Login' 
                : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Contractor List Component with proper typing
interface ContractorListProps {
  contractors: Contractor[];
  onViewAll: () => void;
}

const ContractorList = ({ contractors, onViewAll }: ContractorListProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-secondary-500">Featured Contractors</h3>
            <p className="text-sm text-gray-600 mt-1">Top-rated professionals near you</p>
          </div>
          <button
            onClick={onViewAll}
            className="flex items-center gap-2 text-secondary-500 hover:text-primary-600 font-medium"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {contractors.map((contractor) => (
          <motion.div
            key={contractor.id}
            whileHover={{ x: 5 }}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => navigate(`/contractor/${contractor.id}`)}
          >
            <div className="flex items-center gap-4">
              <img
                src={contractor.image}
                alt={contractor.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-secondary-500">{contractor.name}</h4>
                  {contractor.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{contractor.owner}</p>
                
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{contractor.rating} ({contractor.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span>{contractor.projects} projects</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {contractor.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-primary-50 text-secondary-500 rounded-full text-xs"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Rental List Component with proper typing
interface RentalListProps {
  rentals: Rental[];
  onViewAll: () => void;
}

const RentalList = ({ rentals, onViewAll }: RentalListProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-secondary-500">Featured Rental Providers</h3>
            <p className="text-sm text-gray-600 mt-1">Top-rated equipment rental services near you</p>
          </div>
          <button
            onClick={onViewAll}
            className="flex items-center gap-2 text-secondary-500 hover:text-primary-600 font-medium"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {rentals.map((rental) => (
          <motion.div
            key={rental.id}
            whileHover={{ x: 5 }}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => navigate(`/rental/${rental.id}`)}
          >
            <div className="flex items-center gap-4">
              <img
                src={rental.image}
                alt={rental.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-secondary-500">{rental.name}</h4>
                  {rental.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{rental.owner}</p>
                
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{rental.rating} ({rental.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-gray-400" />
                    <span>{rental.equipmentCount} equipment</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {rental.categories.map((category, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-primary-50 text-secondary-500 rounded-full text-xs"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Main MemberPage Component
const MemberPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeMember, setActiveMember] = useState<'seller' | 'contractor' | 'rental' | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showContractorList, setShowContractorList] = useState(false);
  const [showRentalList, setShowRentalList] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'contractor' | 'seller' | 'rental'>('contractor');

  const membershipCards = [
    {
      id: 'seller' as const,
      title: 'Seller',
      icon: Store,
      description: 'Sell construction materials and products',
      color: 'from-orange-500 to-red-500',
      stats: '500+ Active Sellers',
      features: ['Product Listing', 'Order Management', 'Payment Protection'],
    },
    {
      id: 'contractor' as const,
      title: 'Contractor',
      icon: Hammer,
      description: 'Offer construction and renovation services',
      color: 'from-blue-500 to-cyan-500',
      stats: '1000+ Verified Contractors',
      features: ['Project Management', 'Client Connect', 'Rating System'],
    },
    {
      id: 'rental' as const,
      title: 'Rental Support',
      icon: Truck,
      description: 'Provide equipment and vehicle rentals',
      color: 'from-green-500 to-emerald-500',
      stats: '300+ Rental Partners',
      features: ['Asset Management', 'Booking System', 'Insurance Cover'],
    },
  ];

  const handleCardClick = (id: typeof activeMember): void => {
    if (expandedCard === id) {
      setExpandedCard(null);
      setActiveMember(null);
    } else {
      setExpandedCard(id);
      setActiveMember(id);
      setShowContractorList(false);
      setShowRentalList(false);
    }
  };

  const handleClose = (): void => {
    setExpandedCard(null);
    setActiveMember(null);
    setShowContractorList(false);
    setShowRentalList(false);
  };

  const handleGetStarted = (type: 'seller' | 'contractor' | 'rental'): void => {
    setSelectedUserType(type);
    
    if (type === 'contractor') {
      // For contractor, show contractor list immediately without login
      setShowContractorList(true);
      setShowRentalList(false);
      setShowLoginModal(false);
      
      // Scroll to contractor list
      setTimeout(() => {
        document.getElementById('contractor-list')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    } else if (type === 'rental') {
      // For rental, show rental list immediately without login
      setShowRentalList(true);
      setShowContractorList(false);
      setShowLoginModal(false);
      
      // Scroll to rental list
      setTimeout(() => {
        document.getElementById('rental-list')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    } else {
      // For seller, show login modal
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = (): void => {
    setShowLoginModal(false);
    
    if (selectedUserType === 'contractor') {
      navigate('/contractor/dashboard');
    } else if (selectedUserType === 'rental') {
      navigate('/rental/dashboard');
    } else if (selectedUserType === 'seller') {
      navigate('/seller/dashboard');
    }
  };

  const handleViewAllContractors = (): void => {
    navigate('/contractors');
  };

  const handleViewAllRentals = (): void => {
    navigate('/rentals');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12"
      >
        <div className="max-w-7xl mx-auto container-padding">
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-500 mb-4">
              Join Our Marketplace
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your membership type and start your journey with India's leading
              construction platform
            </p>
          </motion.div>

          {/* Membership Cards with Expanded Sections */}
          <div className="space-y-8">
            {membershipCards.map((card, index) => (
              <div key={card.id} className="relative">
                {/* Membership Card */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: expandedCard === card.id ? 0 : -5 }}
                  className={`relative cursor-pointer group ${
                    expandedCard === card.id ? 'ring-4 ring-secondary-500 rounded-2xl' : ''
                  }`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                  
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                    {/* Close button when expanded */}
                    {expandedCard === card.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClose();
                        }}
                        className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    )}

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} p-4 mb-6`}
                    >
                      <card.icon className="w-full h-full text-white" />
                    </motion.div>

                    <h2 className="text-2xl font-bold text-secondary-500 mb-2">
                      {card.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4">
                      {card.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center space-x-2 text-sm text-primary-600 mb-4">
                      <CheckCircle className="w-4 h-4" />
                      <span>{card.stats}</span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {card.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <ChevronRight className="w-4 h-4 text-primary-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetStarted(card.id);
                        }}
                        className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary-600 transition-colors"
                      >
                        Get Started
                      </button>
                      <ChevronRight className={`w-5 h-5 text-secondary-500 transition-transform ${
                        expandedCard === card.id ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`} />
                    </div>

                    {/* Verification Badge */}
                    <div className="absolute top-4 right-4">
                      <Shield className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                </motion.div>

                {/* Expanded Section - Directly below the card */}
                <AnimatePresence>
                  {expandedCard === card.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      {card.id === 'seller' && <SellerSection />}
                      {card.id === 'contractor' && <ContractorSection />}
                      {card.id === 'rental' && <RentalSection />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Contractor List Section */}
          <AnimatePresence>
            {showContractorList && (
              <motion.div
                id="contractor-list"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
                className="mt-12"
              >
                <ContractorList 
                  contractors={mockContractors}
                  onViewAll={handleViewAllContractors}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rental List Section */}
          <AnimatePresence>
            {showRentalList && (
              <motion.div
                id="rental-list"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
                className="mt-12"
              >
                <RentalList 
                  rentals={mockRentals}
                  onViewAll={handleViewAllRentals}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-center text-secondary-500 mb-12">
              Why Partner With Us?
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Users, title: 'Large Customer Base', desc: 'Access to thousands of customers' },
                { icon: Shield, title: 'Secure Payments', desc: 'Guaranteed and timely payments' },
                { icon: Star, title: 'Build Reputation', desc: 'Earn ratings and reviews' },
                { icon: Clock, title: '24/7 Support', desc: 'Dedicated support team' },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-secondary-500" />
                  </div>
                  <h3 className="font-semibold text-secondary-500 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSuccess}
        userType={selectedUserType}
      />
    </>
  );
};

export default MemberPage;