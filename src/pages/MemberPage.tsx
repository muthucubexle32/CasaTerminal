import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  X
} from 'lucide-react';
import SellerSection from './Seller/SellerSection';
import ContractorSection from './Contractor/ContractorSection';
import RentalSection from './Rental/RentalSection';

const MemberPage = () => {
  const [activeMember, setActiveMember] = useState<'seller' | 'contractor' | 'rental' | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

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

  const handleCardClick = (id: typeof activeMember) => {
    if (expandedCard === id) {
      // If clicking the same card, close it
      setExpandedCard(null);
      setActiveMember(null);
    } else {
      // Open new card
      setExpandedCard(id);
      setActiveMember(id);
    }
  };

  const handleClose = () => {
    setExpandedCard(null);
    setActiveMember(null);
  };

  return (
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
                    <span className="text-secondary-500 font-semibold group-hover:underline">
                      {expandedCard === card.id ? 'Click to close' : 'Get Started'}
                    </span>
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
  );
};

export default MemberPage;