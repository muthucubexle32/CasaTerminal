// src/pages/MemberPage.tsx
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
 
} from 'lucide-react';
import SellerSection from './Seller/SellerSection';
import ContractorSection from './Contractor/ContractorSection';
import RentalSection from './Rental/RentalSection';

// Main MemberPage Component – only for business users
const MemberPage = (): JSX.Element => {
  const navigate = useNavigate();

  // Redirect logged-in users appropriately
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userType = localStorage.getItem('userType');

    if (isLoggedIn && (userType === 'seller' || userType === 'contractor' || userType === 'rental')) {
      navigate(`/${userType}/dashboard`);
      return;
    }
    if (isLoggedIn && userType === 'customer') {
      navigate('/');
      return;
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  // Only track which card is expanded (auth view only – no list view)
  const [expandedId, setExpandedId] = useState<'seller' | 'contractor' | 'rental' | null>(null);

  const membershipCards = [
    {
      id: 'seller' as const,
      title: 'Seller',
      icon: Store,
      description: 'Sell construction materials and products directly to buyers across the country.',
      color: 'from-orange-500 to-red-500',
      stats: '500+ Active Sellers',
      features: ['Product Listing', 'Order Management', 'Payment Protection'],
    },
    {
      id: 'contractor' as const,
      title: 'Contractor',
      icon: Hammer,
      description: 'Offer construction, renovation, and professional maintenance services.',
      color: 'from-blue-500 to-cyan-500',
      stats: '1000+ Verified Contractors',
      features: ['Project Management', 'Client Connect', 'Rating System'],
    },
    {
      id: 'rental' as const,
      title: 'Rental Support',
      icon: Truck,
      description: 'Provide heavy equipment, tools, and vehicle rentals for site operations.',
      color: 'from-green-500 to-emerald-500',
      stats: '300+ Rental Partners',
      features: ['Asset Management', 'Booking System', 'Insurance Cover'],
    },
  ];

  const handleTogglePanel = (id: 'seller' | 'contractor' | 'rental'): void => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      // Scroll down smoothly to the newly opened panel
      setTimeout(() => {
        const element = document.getElementById('expanded-wide-panel');
        if (element) {
          const yOffset = -40;
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
      className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-24 sm:py-24"
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
                expandedId === card.id ? 'border-secondary-500 scale-[1.02] shadow-2xl' : 'border-transparent'
              }`}
            >
              {/* Top gradient bar */}
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

                {/* Action Buttons – only Get Started (no View List) */}
                <div className="mt-auto">
                  <button
                    onClick={() => handleTogglePanel(card.id)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                      expandedId === card.id
                        ? 'bg-secondary-700 text-white ring-2 ring-secondary-300 ring-offset-2'
                        : 'bg-secondary-500 text-white hover:bg-secondary-600 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <span>Get Started</span>
                  </button>
                </div>

                {/* Background Watermark Icon */}
                <div className="absolute top-6 right-6 opacity-[0.03] pointer-events-none hidden sm:block">
                  <card.icon className="w-32 h-32" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Panel – Only Registration/Login */}
        <AnimatePresence mode="wait">
          {expandedId && (
            <motion.div
              key={`${expandedId}-auth`}
              id="expanded-wide-panel"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-8 sm:mt-12 w-full overflow-hidden relative"
            >
              <div className="bg-gray-50 border border-gray-200 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-inner">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-secondary-500 px-1 border-l-4 border-secondary-500 pl-3">
                    {expandedId.charAt(0).toUpperCase() + expandedId.slice(1)} Registration & Login
                  </h3>
                  <button 
                    onClick={() => setExpandedId(null)}
                    className="flex items-center justify-center gap-2 text-gray-600 hover:text-red-600 font-medium bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-200 hover:border-red-200 transition-all hover:bg-red-50 w-full sm:w-auto text-sm sm:text-base"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" /> Close Panel
                  </button>
                </div>

                <div className="w-full">
                  {expandedId === 'seller' && <SellerSection />}
                  {expandedId === 'contractor' && <ContractorSection />}
                  {expandedId === 'rental' && <RentalSection />}
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