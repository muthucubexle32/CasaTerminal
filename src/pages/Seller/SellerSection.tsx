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
  AlertCircle 
} from 'lucide-react';

const SellerSection = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    sellerId: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!loginData.sellerId) {
      newErrors.sellerId = 'Seller ID is required';
    }
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      // Handle login logic here
      console.log('Login attempt:', loginData);
      navigate('/seller/dashboard');
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
      className="bg-white rounded-2xl shadow-xl p-8 mt-8"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-secondary-500 mb-2">
              Seller Membership
            </h3>
            <p className="text-gray-600">
              Join as a seller and list your construction materials, products,
              and reach thousands of potential buyers.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-secondary-500">Wide Reach</h4>
                <p className="text-sm text-gray-600">
                  Connect with contractors, builders, and construction companies
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-secondary-500">Easy Management</h4>
                <p className="text-sm text-gray-600">
                  Simple dashboard to manage products, orders, and payments
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-secondary-500">Secure Payments</h4>
                <p className="text-sm text-gray-600">
                  Guaranteed and timely payments with platform protection
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setShowLogin(false);
              navigate('/seller/register');
            }}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Register as Seller</span>
          </button>
        </div>

        {/* Right Column - Login */}
        <div className="border-l border-gray-200 pl-8">
          <div className="flex items-center space-x-2 mb-6">
            <LogIn className="w-6 h-6 text-secondary-500" />
            <h3 className="text-xl font-semibold text-secondary-500">
              Existing Seller Login
            </h3>
          </div>

          {!showLogin ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Already have a seller account? Login to access your dashboard.
              </p>
              <button
                onClick={() => setShowLogin(true)}
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seller ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={loginData.sellerId}
                    onChange={(e) => {
                      setLoginData({ ...loginData, sellerId: e.target.value });
                      setErrors({ ...errors, sellerId: '' });
                    }}
                    className={`input-field pl-10 ${
                      errors.sellerId ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your seller ID"
                  />
                </div>
                {errors.sellerId && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.sellerId}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => {
                      setLoginData({ ...loginData, password: e.target.value });
                      setErrors({ ...errors, password: '' });
                    }}
                    className={`input-field pl-10 ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="text-sm text-gray-600 hover:text-secondary-500"
                >
                  Back
                </button>
                <button
                  type="button"
                  className="text-sm text-secondary-500 hover:text-primary-600"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SellerSection;