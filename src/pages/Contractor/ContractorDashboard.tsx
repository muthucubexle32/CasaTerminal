import { motion } from 'framer-motion';
import { 
  Hammer, 
  Star, 
  Clock, 
  MapPin, 
  Users, 
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';
import { useState } from 'react';

const ContractorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Hammer, label: 'Active Projects', value: '8', change: '+2', color: 'text-blue-500', bgColor: 'bg-blue-100' },
    { icon: Star, label: 'Average Rating', value: '4.8', change: '+0.2', color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
    { icon: Clock, label: 'Hours Worked', value: '164', change: '+12', color: 'text-green-500', bgColor: 'bg-green-100' },
    { icon: Users, label: 'Clients', value: '24', change: '+3', color: 'text-purple-500', bgColor: 'bg-purple-100' },
  ];

  const recentProjects = [
    { id: 1, name: 'Commercial Complex', location: 'Mumbai', status: 'In Progress', progress: 75 },
    { id: 2, name: 'Residential Tower', location: 'Delhi', status: 'Completed', progress: 100 },
    { id: 3, name: 'School Building', location: 'Pune', status: 'In Progress', progress: 45 },
    { id: 4, name: 'Hospital Renovation', location: 'Bangalore', status: 'Starting Soon', progress: 10 },
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
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-500">Contractor Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back, John Smith</p>
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
          className="bg-white rounded-xl shadow-lg p-1 sm:p-2 inline-flex flex-wrap gap-1 mb-6 sm:mb-8"
        >
          {['Overview', 'Projects', 'Earnings', 'Reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
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
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg"
          >
            <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-4">Recent Projects</h2>
            <div className="space-y-3 sm:space-y-4">
              {recentProjects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ x: 5 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-primary-50 rounded-lg"
                >
                  <div className="mb-2 sm:mb-0">
                    <h3 className="font-semibold text-secondary-500 text-sm sm:text-base">{project.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-right">
                      <span className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-600' :
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="w-16 sm:w-20">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-secondary-500 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{project.progress}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg"
          >
            <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-4">Today's Schedule</h2>
            <div className="space-y-3 sm:space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 p-2 hover:bg-primary-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-secondary-500">10:0{i}</span>
                    <span className="text-[8px] sm:text-[10px] text-gray-600">AM</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-secondary-500 text-xs sm:text-sm truncate">Site Inspection</h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5" />
                      <span className="truncate">Project #{i}</span>
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="text-sm text-secondary-500 font-medium hover:text-primary-600 transition-colors flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>View Full Schedule</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Recent Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 sm:mt-8 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg"
        >
          <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-4">Recent Reviews</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 sm:p-4 bg-primary-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                    R{i}
                  </div>
                  <div>
                    <h3 className="font-medium text-secondary-500 text-xs sm:text-sm">Rajesh Kumar</h3>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  Excellent work quality and completed before deadline. Highly recommended!
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContractorDashboard;