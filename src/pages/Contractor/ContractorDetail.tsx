import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Star, 
  MapPin, 
  Phone, 
  Mail, 

  Calendar,
  CheckCircle,
  Award,
  Hammer,

  MessageCircle,
  Share2,
  Bookmark
} from 'lucide-react';

const ContractorDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const contractor = {
    name: 'John Smith',
    title: 'Master Builder & Contractor',
    rating: 4.8,
    reviews: 156,
    location: 'Mumbai, Maharashtra',
    phone: '+91 98765 43210',
    email: 'john.smith@example.com',
    experience: '15+ years',
    projects: 85,
    verified: true,
    description: 'Specializing in residential and commercial construction with a focus on quality and timely delivery. Over 15 years of experience in the construction industry.',
    skills: ['Residential Construction', 'Commercial Projects', 'Renovation', 'Project Management'],
    certifications: ['ISO Certified', 'Green Building Professional', 'Safety Certified'],
  };

  const projects = [
    { id: 1, name: 'Luxury Villa', location: 'Juhu, Mumbai', year: '2024', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500' },
    { id: 2, name: 'Commercial Complex', location: 'Andheri East', year: '2023', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500' },
    { id: 3, name: 'Residential Tower', location: 'Powai, Mumbai', year: '2023', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500' },
  ];

  const reviews = [
    { id: 1, user: 'Rajesh Kumar', rating: 5, comment: 'Excellent work quality and professionalism. Completed project before deadline.', date: '2 days ago' },
    { id: 2, user: 'Priya Sharma', rating: 5, comment: 'Very satisfied with the construction work. Great attention to detail.', date: '1 week ago' },
    { id: 3, user: 'Amit Patel', rating: 4, comment: 'Good communication and quality work. Would recommend.', date: '2 weeks ago' },
  ];

  return (
    <div className="min-h-screen bg-primary-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-secondary-500 mb-4 sm:mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Back to Listings</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg mb-4 sm:mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">JS</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-500">{contractor.name}</h1>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">{contractor.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-primary-100 transition-colors">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-primary-100 transition-colors">
                    <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-secondary-500 text-sm sm:text-base">{contractor.rating}</span>
                  <span className="text-xs sm:text-sm text-gray-600">({contractor.reviews} reviews)</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">{contractor.location}</span>
                </div>
                {contractor.verified && (
                  <>
                    <span className="text-gray-300 hidden sm:inline">|</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-medium">Verified</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
            <button className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Call</span>
            </button>
            <button className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Email</span>
            </button>
            <button className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Chat</span>
            </button>
            <button className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg transition-colors">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">Book Now</span>
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-1 sm:p-2 inline-flex flex-wrap gap-1 mb-4 sm:mb-6 overflow-x-auto"
        >
          {['Overview', 'Projects', 'Reviews', 'Contact'].map((tab) => (
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

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4 sm:space-y-6"
          >
            {/* About */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-3 sm:mb-4">About</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {contractor.description}
              </p>
            </div>

            {/* Skills & Certifications */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-3 sm:mb-4 flex items-center gap-2">
                  <Hammer className="w-5 h-5" />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {contractor.skills.map((skill, index) => (
                    <span key={index} className="px-2 sm:px-3 py-1 bg-primary-50 text-secondary-500 rounded-full text-xs sm:text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-3 sm:mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications
                </h2>
                <div className="space-y-2">
                  {contractor.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-3 sm:mb-4">Recent Projects</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative h-32 sm:h-36 rounded-lg overflow-hidden mb-2">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-2 left-2 text-white text-xs font-medium">{project.year}</span>
                    </div>
                    <h3 className="font-medium text-secondary-500 text-sm sm:text-base truncate">{project.name}</h3>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{project.location}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Stats */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-3 sm:mb-4">Stats</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Experience</span>
                  <span className="font-semibold text-secondary-500 text-sm sm:text-base">{contractor.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Projects Completed</span>
                  <span className="font-semibold text-secondary-500 text-sm sm:text-base">{contractor.projects}+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Success Rate</span>
                  <span className="font-semibold text-secondary-500 text-sm sm:text-base">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Response Time</span>
                  <span className="font-semibold text-secondary-500 text-sm sm:text-base">{'< 2hrs'}</span>
                </div>
              </div>
            </div>

            {/* Reviews Summary */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-3 sm:mb-4">Reviews</h2>
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl font-bold text-secondary-500">{contractor.rating}</div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Based on {contractor.reviews} reviews</p>
                </div>
              </div>

              <div className="space-y-2">
                {reviews.map((review) => (
                  <div key={review.id} className="p-3 bg-primary-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-secondary-500 text-sm sm:text-base">{review.user}</span>
                      <span className="text-[10px] sm:text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-3 h-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">{review.comment}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-sm text-secondary-500 font-medium hover:text-primary-600 transition-colors">
                View All Reviews
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContractorDetail;