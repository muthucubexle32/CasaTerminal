import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users,
  TrendingUp,
  Settings,
  LogOut,
  Package,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';

const RentalDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Package, label: 'Active Listings', value: '12', change: '+3', color: 'text-blue-500', bgColor: 'bg-blue-100' },
    { icon: Calendar, label: 'Current Rentals', value: '8', change: '+2', color: 'text-green-500', bgColor: 'bg-green-100' },
    { icon: Users, label: 'Total Customers', value: '45', change: '+12', color: 'text-purple-500', bgColor: 'bg-purple-100' },
    { icon: TrendingUp, label: 'Revenue (Month)', value: '₹2.4L', change: '+18%', color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
  ];

  const activeRentals = [
    { id: 1, equipment: 'JCB 3DX', customer: 'Rajesh Constructions', days: 5, status: 'Active', amount: '₹45,000' },
    { id: 2, equipment: 'Concrete Mixer', customer: 'Patel Builders', days: 3, status: 'Active', amount: '₹12,000' },
    { id: 3, equipment: 'Scaffolding Set', customer: 'Sharma & Co', days: 7, status: 'Active', amount: '₹28,000' },
    { id: 4, equipment: 'Power Generator', customer: 'Green Fields', days: 2, status: 'Returning', amount: '₹8,000' },
  ];

  const upcomingReturns = [
    { id: 1, equipment: 'JCB 3DX', customer: 'Rajesh Constructions', returnDate: '2024-03-10' },
    { id: 2, equipment: 'Concrete Mixer', customer: 'Patel Builders', returnDate: '2024-03-08' },
    { id: 3, equipment: 'Power Generator', customer: 'Green Fields', returnDate: '2024-03-07' },
  ];

  return (
    <div className="min-h-screen bg-primary-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-500">Rental Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back, Mumbai Rentals</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-0">
            <button className="p-2 rounded-lg hover:bg-primary-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-primary-100 transition-colors">
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-secondary-500">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-1 sm:p-2 inline-flex flex-wrap gap-1 mb-6 sm:mb-8 overflow-x-auto"
        >
          {['Overview', 'Listings', 'Rentals', 'Earnings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.toLowerCase()
                  ? 'bg-secondary-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-primary-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Active Rentals */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg"
          >
            <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-4">Active Rentals</h2>
            <div className="space-y-3 sm:space-y-4">
              {activeRentals.map((rental) => (
                <motion.div
                  key={rental.id}
                  whileHover={{ x: 5 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-primary-50 rounded-lg"
                >
                  <div className="mb-2 sm:mb-0">
                    <h3 className="font-semibold text-secondary-500 text-sm sm:text-base">{rental.equipment}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{rental.customer}</p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-right">
                      <span className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
                        rental.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {rental.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{rental.days} days</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-secondary-500 text-sm sm:text-base">{rental.amount}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="mt-4 text-sm text-secondary-500 font-medium hover:text-primary-600 transition-colors">
              View All Rentals →
            </button>
          </motion.div>

          {/* Upcoming Returns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg"
          >
            <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-4">Upcoming Returns</h2>
            <div className="space-y-3 sm:space-y-4">
              {upcomingReturns.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-2 hover:bg-primary-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-secondary-500 text-xs sm:text-sm truncate">{item.equipment}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 truncate">{item.customer}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] sm:text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                      {item.returnDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-1 p-2 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
                  <Package className="w-4 h-4 text-secondary-500" />
                  <span className="text-xs">Add Listing</span>
                </button>
                <button className="flex items-center justify-center gap-1 p-2 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
                  <CheckCircle className="w-4 h-4 text-secondary-500" />
                  <span className="text-xs">Mark Return</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Inventory Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 sm:mt-8 bg-yellow-50 border border-yellow-200 rounded-xl sm:rounded-2xl p-4 sm:p-6"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-yellow-800">Maintenance Due</h3>
              <p className="text-xs sm:text-sm text-yellow-700 mt-1">
                3 equipment pieces require maintenance within the next 7 days. Schedule maintenance to avoid downtime.
              </p>
              <button className="mt-3 text-xs sm:text-sm font-medium text-yellow-800 hover:text-yellow-900 underline">
                View Maintenance Schedule
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RentalDashboard;