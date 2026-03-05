import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  LogIn, 
  Mail, 
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Truck,
  Wrench,
  Calendar,
  Shield
} from 'lucide-react';

const RentalSection = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    rentalId: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!loginData.rentalId) {
      newErrors.rentalId = 'Rental ID is required';
    }
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      // Handle login logic here
      console.log('Login attempt:', loginData);
      navigate('/rental/dashboard');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mt-6 sm:mt-8"
    >
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {/* Left Column - Info */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-500 mb-2">
              Rental Support Membership
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              List your construction equipment and vehicles for rent to contractors and builders.
            </p>
          </div>

          {/* Equipment Types */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="flex items-center space-x-2 bg-primary-50 p-2 sm:p-3 rounded-lg">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500" />
              <span className="text-xs sm:text-sm font-medium">Vehicles</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary-50 p-2 sm:p-3 rounded-lg">
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500" />
              <span className="text-xs sm:text-sm font-medium">Tools</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary-50 p-2 sm:p-3 rounded-lg">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500" />
              <span className="text-xs sm:text-sm font-medium">Equipment</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary-50 p-2 sm:p-3 rounded-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500" />
              <span className="text-xs sm:text-sm font-medium">Insured</span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-green-800">
              <span className="font-semibold">Insurance Covered:</span> All rentals come with basic insurance coverage for peace of mind.
            </p>
          </div>

          <button
            onClick={() => {
              setShowLogin(false);
              navigate('/rental/register');
            }}
            className="btn-primary w-full flex items-center justify-center space-x-2 text-sm sm:text-base py-2 sm:py-3"
          >
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Register as Rental Support</span>
          </button>
        </div>

        {/* Right Column - Login */}
        <div className="md:border-l md:border-gray-200 md:pl-6 lg:pl-8">
          <div className="flex items-center space-x-2 mb-4 sm:mb-6">
            <LogIn className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-500" />
            <h3 className="text-lg sm:text-xl font-semibold text-secondary-500">
              Existing Rental Login
            </h3>
          </div>

          {!showLogin ? (
            <div className="text-center py-6 sm:py-8">
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Already have a rental account? Login to manage your listings.
              </p>
              <button
                onClick={() => setShowLogin(true)}
                className="btn-secondary inline-flex items-center space-x-2 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5"
              >
                <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Click to Login</span>
              </button>
            </div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Rental ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    value={loginData.rentalId}
                    onChange={(e) => {
                      setLoginData({ ...loginData, rentalId: e.target.value });
                      setErrors({ ...errors, rentalId: '' });
                    }}
                    className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                      errors.rentalId ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter your rental ID"
                  />
                </div>
                {errors.rentalId && (
                  <p className="mt-1 text-xs text-red-500 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.rentalId}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => {
                      setLoginData({ ...loginData, password: e.target.value });
                      setErrors({ ...errors, password: '' });
                    }}
                    className={`w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="text-xs sm:text-sm text-gray-600 hover:text-secondary-500"
                >
                  Back
                </button>
                <button
                  type="button"
                  className="text-xs sm:text-sm text-secondary-500 hover:text-primary-600"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center space-x-2 text-sm sm:text-base py-2 sm:py-2.5"
              >
                <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Login</span>
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RentalSection;