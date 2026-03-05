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
  Users
} from 'lucide-react';
import SellerSection from './Seller/SellerSection';
import ContractorSection from './Contractor/ContractorSection';
import RentalSection from './Rental/RentalSection';
// Remove these if they're not needed:
// import { SellerSection, SellerRegistration, SellerDashboard } from './Seller';
// import { ContractorSection, ContractorRegistration, ContractorDashboard, ContractorListing, ContractorDetail } from './Contractor';
// import { RentalSection, RentalRegistration, RentalDashboard, RentalListing, RentalDetail } from './Rental';

const MemberPage = () => {
  // ... rest of the component remains the same
  const [activeMember, setActiveMember] = useState<'seller' | 'contractor' | 'rental' | null>(null);

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
    setActiveMember(activeMember === id ? null : id);
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

        {/* Membership Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {membershipCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative cursor-pointer group ${
                activeMember === card.id ? 'ring-4 ring-secondary-500' : ''
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
              
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
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
                    Get Started
                  </span>
                  <ChevronRight className="w-5 h-5 text-secondary-500 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Verification Badge */}
                <div className="absolute top-4 right-4">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Sections */}
        <AnimatePresence mode="wait">
          {activeMember === 'seller' && <SellerSection />}
          {activeMember === 'contractor' && <ContractorSection />}
          {activeMember === 'rental' && <RentalSection />}
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
  );
};

export default MemberPage;