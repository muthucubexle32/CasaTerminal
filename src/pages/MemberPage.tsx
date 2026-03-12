import { useState, useEffect } from 'react';
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

// Mock Contractor Data
const mockContractors: Contractor[] = [
  {
    id: 1,
    name: 'Shree Balaji Construction',
    owner: 'Rajesh Sharma',
    rating: 4.8,
    reviews: 156,
    projects: 85,
    location: 'Mumbai, MH',
    specialties: ['Civil', 'Structural'],
    verified: true,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'
  },
  {
    id: 2,
    name: 'Apex Builders',
    owner: 'Vikram Singh',
    rating: 4.9,
    reviews: 203,
    projects: 120,
    location: 'Delhi, NCR',
    specialties: ['Electrical', 'Plumbing'],
    verified: true,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  },
  {
    id: 3,
    name: 'Pioneer Developers',
    owner: 'Amit Patel',
    rating: 4.7,
    reviews: 98,
    projects: 45,
    location: 'Ahmedabad, GJ',
    specialties: ['Interior', 'Renovation'],
    verified: true,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400'
  },
  {
    id: 4,
    name: 'Global Contractors',
    owner: 'Sanjay Gupta',
    rating: 4.6,
    reviews: 112,
    projects: 67,
    location: 'Bangalore, KA',
    specialties: ['Waterproofing', 'MEP'],
    verified: false,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400'
  }
];

// Mock Rental Data
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
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400'
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
    image: 'https://images.unsplash.com/photo-1581092335871-4c7ff3e832b5?w=400'
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
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400'
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
    image: 'https://images.unsplash.com/photo-1581092335871-4c7ff3e832b5?w=400'
  }
];

// Contractor List Component
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
      className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden w-full"
    >
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-secondary-500">Featured Contractors</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Top-rated professionals near you</p>
          </div>
          <button
            onClick={onViewAll}
            className="flex items-center justify-center gap-2 text-secondary-500 hover:text-primary-600 font-medium bg-primary-50 px-4 sm:px-5 py-2.5 rounded-lg transition-colors w-full sm:w-auto text-sm sm:text-base"
          >
            View All Contractors
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:gap-[1px] bg-gray-200">
        {contractors.map((contractor) => (
          <motion.div
            key={contractor.id}
            whileHover={{ backgroundColor: '#f8fafc' }}
            className="p-4 sm:p-6 bg-white cursor-pointer transition-colors border-b xl:border-b-0 xl:border-r last:border-0 border-gray-200"
            onClick={() => navigate(`/contractor/${contractor.id}`)}
          >
            {/* Mobile: image on top (w-full h-48). Tablet/Desktop: image on side (w-24 h-24) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <img
                src={contractor.image}
                alt={contractor.name}
                className="w-full sm:w-24 h-48 sm:h-24 rounded-xl object-cover shadow-sm"
              />
              
              <div className="flex-1 w-full min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-secondary-500 text-base sm:text-lg truncate pr-2">{contractor.name}</h4>
                  {contractor.verified && (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  )}
                </div>
                
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 truncate">
                  {contractor.owner} • {contractor.location}
                </p>
                
                <div className="items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-3 bg-gray-50 p-2 rounded-lg inline-flex">
                  <div className="flex items-center gap-1 font-medium">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{contractor.rating} <span className="text-gray-400 font-normal">({contractor.reviews})</span></span>
                  </div>
                  <div className="w-[1px] h-3 bg-gray-300"></div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                    <span>{contractor.projects} projects</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                  {contractor.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-[10px] sm:text-xs font-medium border border-blue-100"
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

// Rental List Component
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
      className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden w-full"
    >
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-secondary-500">Featured Rental Providers</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Top-rated equipment rental services near you</p>
          </div>
          <button
            onClick={onViewAll}
            className="flex items-center justify-center gap-2 text-secondary-500 hover:text-primary-600 font-medium bg-primary-50 px-4 sm:px-5 py-2.5 rounded-lg transition-colors w-full sm:w-auto text-sm sm:text-base"
          >
            View All Rentals
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:gap-[1px] bg-gray-200">
        {rentals.map((rental) => (
          <motion.div
            key={rental.id}
            whileHover={{ backgroundColor: '#f8fafc' }}
            className="p-4 sm:p-6 bg-white cursor-pointer transition-colors border-b xl:border-b-0 xl:border-r last:border-0 border-gray-200"
            onClick={() => navigate(`/rental/${rental.id}`)}
          >
            {/* Mobile: image on top (w-full h-48). Tablet/Desktop: image on side (w-24 h-24) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <img
                src={rental.image}
                alt={rental.name}
                className="w-full sm:w-24 h-48 sm:h-24 rounded-xl object-cover shadow-sm"
              />
              
              <div className="flex-1 w-full min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-secondary-500 text-base sm:text-lg truncate pr-2">{rental.name}</h4>
                  {rental.verified && (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  )}
                </div>
                
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 truncate">
                  {rental.owner} • {rental.location}
                </p>
                
                <div className=" items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-3 bg-gray-50 p-2 rounded-lg inline-flex">
                  <div className="flex items-center gap-1 font-medium">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{rental.rating} <span className="text-gray-400 font-normal">({rental.reviews})</span></span>
                  </div>
                  <div className="w-[1px] h-3 bg-gray-300"></div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Truck className="w-3.5 h-3.5 text-green-500" />
                    <span>{rental.equipmentCount} machines</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                  {rental.categories.map((category, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-[10px] sm:text-xs font-medium border border-green-100"
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

  // Ensures page always starts perfectly at top when loaded via react-router
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Controls both the target section (seller/contractor/rental) and the view type (auth/list)
  const [expandedPanel, setExpandedPanel] = useState<{
    id: 'seller' | 'contractor' | 'rental' | null;
    view: 'auth' | 'list' | null;
  }>({ id: null, view: null });

  const membershipCards = [
    {
      id: 'seller' as const,
      title: 'Seller',
      icon: Store,
      description: 'Sell construction materials and products directly to buyers across the country.',
      color: 'from-orange-500 to-red-500',
      stats: '500+ Active Sellers',
      features: ['Product Listing', 'Order Management', 'Payment Protection'],
      hasList: false, // Sellers don't have a separate public list button in this view yet
    },
    {
      id: 'contractor' as const,
      title: 'Contractor',
      icon: Hammer,
      description: 'Offer construction, renovation, and professional maintenance services.',
      color: 'from-blue-500 to-cyan-500',
      stats: '1000+ Verified Contractors',
      features: ['Project Management', 'Client Connect', 'Rating System'],
      hasList: true,
    },
    {
      id: 'rental' as const,
      title: 'Rental Support',
      icon: Truck,
      description: 'Provide heavy equipment, tools, and vehicle rentals for site operations.',
      color: 'from-green-500 to-emerald-500',
      stats: '300+ Rental Partners',
      features: ['Asset Management', 'Booking System', 'Insurance Cover'],
      hasList: true,
    },
  ];

  const handleTogglePanel = (id: 'seller' | 'contractor' | 'rental', view: 'auth' | 'list'): void => {
    // Toggle off if clicking the exact same active button
    if (expandedPanel.id === id && expandedPanel.view === view) {
      setExpandedPanel({ id: null, view: null });
    } else {
      setExpandedPanel({ id, view });
      // Scroll down smoothly to the newly opened panel so it's fully visible on all devices
      setTimeout(() => {
        const element = document.getElementById('expanded-wide-panel');
        if (element) {
          const yOffset = -40; // Offset for mobile headers if any
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 200);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-8 sm:py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-500 mb-3 sm:mb-4">
            Join Our Marketplace
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Choose your membership type and start your journey with India's leading
            construction platform.
          </p>
        </motion.div>

        {/* 3 Cards Grid - Fully Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {membershipCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all h-full flex flex-col border-2 overflow-hidden ${
                expandedPanel.id === card.id ? 'border-secondary-500 scale-[1.02] shadow-2xl' : 'border-transparent'
              }`}
            >
              {/* Subtle top gradient bar matching the card theme */}
              <div className={`h-2 w-full bg-gradient-to-r ${card.color}`}></div>

              <div className="p-6 sm:p-8 flex-grow flex flex-col">
                {/* Icon */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${card.color} p-3.5 sm:p-4 mb-5 sm:mb-6 shadow-md`}>
                  <card.icon className="w-full h-full text-white" />
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-secondary-500 mb-2 sm:mb-3">
                  {card.title}
                </h2>
                
                <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 flex-grow">
                  {card.description}
                </p>

                {/* Stats */}
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-primary-600 mb-5 sm:mb-6 font-medium bg-primary-50 p-2 sm:p-3 rounded-lg w-max">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500" />
                  <span className="text-secondary-600">{card.stats}</span>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {card.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-gray-700">
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Buttons (Responsive Layout) */}
                {/* flex-col on mobile, flex-row on larger screens */}
                <div className={`mt-auto flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 ${!card.hasList ? 'w-full' : 'w-full'}`}>
                  
                  {/* Get Started Button */}
                  <button
                    onClick={() => handleTogglePanel(card.id, 'auth')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                      expandedPanel.id === card.id && expandedPanel.view === 'auth'
                        ? 'bg-secondary-700 text-white ring-2 ring-secondary-300 ring-offset-2'
                        : 'bg-secondary-500 text-white hover:bg-secondary-600 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <span>Get Started</span>
                  </button>

                  {/* View List Button */}
                  {card.hasList && (
                    <button
                      onClick={() => handleTogglePanel(card.id, 'list')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 rounded-xl font-semibold text-sm transition-all border-2 ${
                        expandedPanel.id === card.id && expandedPanel.view === 'list'
                          ? 'border-primary-500 bg-primary-50 text-secondary-700 ring-2 ring-primary-200 ring-offset-2'
                          : 'border-gray-200 text-gray-700 bg-white hover:border-primary-500 hover:bg-primary-50 hover:text-secondary-600 hover:-translate-y-0.5'
                      }`}
                    >
                      <span>View List</span>
                    </button>
                  )}
                </div>

                {/* Background Watermark Icon */}
                <div className="absolute top-6 right-6 opacity-[0.03] pointer-events-none hidden sm:block">
                  <card.icon className="w-32 h-32" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WIDE SCREEN PANEL BELOW THE CARDS */}
        <AnimatePresence mode="wait">
          {expandedPanel.id && (
            <motion.div
              key={`${expandedPanel.id}-${expandedPanel.view}`}
              id="expanded-wide-panel"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-8 sm:mt-12 w-full overflow-hidden relative"
            >
              {/* Highlight Container to group the panel visually */}
              <div className="bg-gray-50 border border-gray-200 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-inner">
                
                {/* Responsive Close Button Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-secondary-500 px-1 border-l-4 border-secondary-500 pl-3">
                    {expandedPanel.view === 'auth' 
                      ? `${expandedPanel.id.charAt(0).toUpperCase() + expandedPanel.id.slice(1)} Registration & Login` 
                      : `${expandedPanel.id.charAt(0).toUpperCase() + expandedPanel.id.slice(1)} Directory`}
                  </h3>
                  <button 
                     onClick={() => setExpandedPanel({ id: null, view: null })}
                     className="flex items-center justify-center gap-2 text-gray-600 hover:text-red-600 font-medium bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-200 hover:border-red-200 transition-all hover:bg-red-50 w-full sm:w-auto text-sm sm:text-base"
                  >
                     <X className="w-4 h-4 sm:w-5 sm:h-5" /> Close Panel
                  </button>
                </div>

                {/* Dynamic Render Based on Selection */}
                <div className="w-full">
                  {/* 1. Registration / Login Views */}
                  {expandedPanel.id === 'seller' && expandedPanel.view === 'auth' && <SellerSection />}
                  {expandedPanel.id === 'contractor' && expandedPanel.view === 'auth' && <ContractorSection />}
                  {expandedPanel.id === 'rental' && expandedPanel.view === 'auth' && <RentalSection />}
                  
                  {/* 2. Directory / List Views */}
                  {expandedPanel.id === 'contractor' && expandedPanel.view === 'list' && (
                    <ContractorList 
                      contractors={mockContractors} 
                      onViewAll={() => navigate('/contractors')} 
                    />
                  )}
                  {expandedPanel.id === 'rental' && expandedPanel.view === 'list' && (
                    <RentalList 
                      rentals={mockRentals} 
                      onViewAll={() => navigate('/rentals')} 
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 sm:mt-24 pt-10 sm:pt-12 border-t border-gray-200"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-secondary-500 mb-8 sm:mb-12">
            Why Partner With Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: Users, title: 'Large Customer Base', desc: 'Access to thousands of verified customers across India.' },
              { icon: Shield, title: 'Secure Payments', desc: 'Guaranteed, hassle-free and timely payments straight to your bank.' },
              { icon: Star, title: 'Build Reputation', desc: 'Earn ratings, reviews, and a trusted badge to grow your business.' },
              { icon: Clock, title: '24/7 Support', desc: 'Dedicated technical and business support team always ready to help.' },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                  <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-500" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-secondary-500 mb-2 sm:mb-3">{benefit.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MemberPage;