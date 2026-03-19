// src/pages/auth/UserLoginPage.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, User, Briefcase, Truck, Shield } from 'lucide-react';
import logo from "/logo.png";

const UserLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'seller' | 'contractor' | 'rental'>('customer');
  const [logoError, setLogoError] = useState(false);

  // Demo credentials
  const demoCredentials = {
    customer: { email: 'customer@example.com', password: 'Customer@123', type: 'customer' },
    seller: { email: 'seller@example.com', password: 'Seller@123', type: 'seller' },
    contractor: { email: 'contractor@example.com', password: 'Contractor@123', type: 'contractor' },
    rental: { email: 'rental@example.com', password: 'Rental@123', type: 'rental' }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const demoUser = demoCredentials[userType];
      
      if (email === demoUser.email && password === demoUser.password) {
        // Set user session
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', userType);
        localStorage.setItem('userName', email.split('@')[0]);
        localStorage.setItem('userEmail', email);
        
        // Redirect based on user type
        switch(userType) {
          case 'seller':
            navigate('/seller/dashboard');
            break;
          case 'contractor':
            navigate('/contractor/dashboard');
            break;
          case 'rental':
            navigate('/rental/dashboard');
            break;
          default:
            navigate('/member');
        }
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 1500);
  };

  const fillDemoCredentials = (type: typeof userType) => {
    setUserType(type);
    setEmail(demoCredentials[type].email);
    setPassword(demoCredentials[type].password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#502d13] to-[#7b4a26] flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#e9ddc8]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e9ddc8]/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo and Title */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-3 sm:mb-4"
          >
            <Link to="/" className="block">
              <div className="w-16 h-16 sm:w-20 sm:h-20  sm:rounded-3xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow">
                {!logoError ? (
                  <img
                    src={logo}
                    alt="Casa Terminal Logo"
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="text-xl sm:text-2xl font-bold text-[#502d13]">CT</span>
                )}
              </div>
            </Link>
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#e9ddc8] mb-1 sm:mb-2">Welcome Back</h1>
          <p className="text-sm sm:text-base text-[#e9ddc8]/80">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#e9ddc8] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* User Type Selector */}
          <div className="p-4 sm:p-6 border-b border-[#502d13]/10">
            <label className="block text-xs sm:text-sm font-medium text-[#502d13] mb-2 sm:mb-3">
              Login as
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setUserType('customer')}
                className={`p-2 sm:p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${
                  userType === 'customer'
                    ? 'bg-[#502d13] text-[#e9ddc8]'
                    : 'bg-[#502d13]/5 text-[#502d13] hover:bg-[#502d13]/10'
                }`}
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-xs font-medium">Customer</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('seller')}
                className={`p-2 sm:p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${
                  userType === 'seller'
                    ? 'bg-[#502d13] text-[#e9ddc8]'
                    : 'bg-[#502d13]/5 text-[#502d13] hover:bg-[#502d13]/10'
                }`}
              >
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-xs font-medium">Seller</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('contractor')}
                className={`p-2 sm:p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${
                  userType === 'contractor'
                    ? 'bg-[#502d13] text-[#e9ddc8]'
                    : 'bg-[#502d13]/5 text-[#502d13] hover:bg-[#502d13]/10'
                }`}
              >
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-xs font-medium">Contractor</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('rental')}
                className={`p-2 sm:p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${
                  userType === 'rental'
                    ? 'bg-[#502d13] text-[#e9ddc8]'
                    : 'bg-[#502d13]/5 text-[#502d13] hover:bg-[#502d13]/10'
                }`}
              >
                <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-xs font-medium">Rental</span>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-[#502d13] text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#502d13]/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white border border-[#502d13]/20 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#502d13] text-[#502d13] placeholder-[#502d13]/50"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#502d13] text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#502d13]/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 bg-white border border-[#502d13]/20 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#502d13] text-[#502d13] placeholder-[#502d13]/50"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#502d13]/50 hover:text-[#502d13]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-0">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded border-[#502d13]/30 text-[#502d13] focus:ring-[#502d13]"
                  />
                  <span className="text-xs sm:text-sm text-[#502d13]/70">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your email')}
                  className="text-xs sm:text-sm text-[#502d13] hover:text-[#7b4a26] font-medium text-left xs:text-right"
                >
                  Forgot Password?
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center gap-2 text-xs sm:text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#502d13] text-[#e9ddc8] py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#7b4a26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#e9ddc8] border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-4 sm:mt-6">
              <p className="text-[10px] sm:text-xs text-center text-[#502d13]/50 mb-2 sm:mb-3">
                Demo Credentials (Click to auto-fill)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                <button
                  onClick={() => fillDemoCredentials('customer')}
                  className="text-[10px] sm:text-xs bg-[#502d13]/5 hover:bg-[#502d13]/10 text-[#502d13] px-1.5 sm:px-2 py-1 sm:py-1.5 rounded transition-colors truncate"
                >
                  Customer
                </button>
                <button
                  onClick={() => fillDemoCredentials('seller')}
                  className="text-[10px] sm:text-xs bg-[#502d13]/5 hover:bg-[#502d13]/10 text-[#502d13] px-1.5 sm:px-2 py-1 sm:py-1.5 rounded transition-colors truncate"
                >
                  Seller
                </button>
                <button
                  onClick={() => fillDemoCredentials('contractor')}
                  className="text-[10px] sm:text-xs bg-[#502d13]/5 hover:bg-[#502d13]/10 text-[#502d13] px-1.5 sm:px-2 py-1 sm:py-1.5 rounded transition-colors truncate"
                >
                  Contractor
                </button>
                <button
                  onClick={() => fillDemoCredentials('rental')}
                  className="text-[10px] sm:text-xs bg-[#502d13]/5 hover:bg-[#502d13]/10 text-[#502d13] px-1.5 sm:px-2 py-1 sm:py-1.5 rounded transition-colors truncate"
                >
                  Rental
                </button>
              </div>
            </div>

            {/* Sign Up Link - Fixed to navigate to Member page */}
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-[#502d13]/70">
                Don't have an account?{' '}
                <Link 
                  to="/member" 
                  className="text-[#502d13] font-semibold hover:text-[#7b4a26] transition-colors inline-flex items-center gap-1"
                >
                  Sign up
                  <span className="text-xs sm:text-sm">→</span>
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="relative my-4 sm:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#502d13]/10"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-[#e9ddc8] text-[#502d13]/50">or</span>
              </div>
            </div>

            {/* Admin Link */}
            <div className="text-center">
              <Link
                to="/admin/login"
                className="text-xs sm:text-sm text-[#502d13]/50 hover:text-[#502d13] inline-flex items-center gap-1 sm:gap-2 transition-colors"
              >
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center mt-4 sm:mt-6">
          <Link 
            to="/" 
            className="text-xs sm:text-sm text-[#e9ddc8] hover:text-white transition-colors inline-flex items-center gap-1"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UserLoginPage;