import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Upload,
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  FileText,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Mail as MailIcon,
  Phone as PhoneIcon,
  
} from 'lucide-react';

const steps = [
  { id: 1, name: 'Basic Information' },
  { id: 2, name: 'Business Details' },
  { id: 3, name: 'Document Upload' },
  { id: 4, name: 'Review & Submit' },
];

const SellerRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    // Step 2
    businessName: '',
    businessAddress: '',
    gstNumber: '',
    panNumber: '',
    businessType: '',
    yearsOfOperation: '',
    // Step 3
    documents: {
      gstCertificate: null as File | null,
      panCard: null as File | null,
      businessLicense: null as File | null,
      bankProof: null as File | null,
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  // Generate a random application ID
  const generateApplicationId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `SEL-${timestamp}-${random}`;
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
      else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Invalid mobile number';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (step === 2) {
      if (!formData.businessName) newErrors.businessName = 'Business name is required';
      if (!formData.businessAddress) newErrors.businessAddress = 'Business address is required';
      if (!formData.gstNumber) newErrors.gstNumber = 'GST number is required';
      if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
      if (!formData.businessType) newErrors.businessType = 'Business type is required';
      if (!formData.yearsOfOperation) newErrors.yearsOfOperation = 'Years of operation is required';
    } else if (step === 3) {
      if (!formData.documents.gstCertificate) newErrors.gstCertificate = 'GST certificate is required';
      if (!formData.documents.panCard) newErrors.panCard = 'PAN card is required';
      if (!formData.documents.businessLicense) newErrors.businessLicense = 'Business license is required';
      if (!formData.documents.bankProof) newErrors.bankProof = 'Bank account proof is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Generate application ID
      const newAppId = generateApplicationId();
      setApplicationId(newAppId);
      
      // Handle submission
      console.log('Form submitted:', formData);
      console.log('Application ID:', newAppId);
      
      // Show thank you screen
      setIsSubmitted(true);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFileUpload = (field: keyof typeof formData.documents) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [field]: file,
        },
      });
      setErrors({ ...errors, [field]: '' });
    }
  };

 

  const handleGoHome = () => {
    navigate('/');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-secondary-500 mb-4">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`input-field pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className={`input-field pl-10 ${errors.mobile ? 'border-red-500' : ''}`}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                />
              </div>
              {errors.mobile && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.mobile}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`input-field pl-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Create a password (min. 8 characters)"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`input-field pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-secondary-500 mb-4">Business Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className={`input-field pl-10 ${errors.businessName ? 'border-red-500' : ''}`}
                  placeholder="Enter your business name"
                />
              </div>
              {errors.businessName && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.businessName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <textarea
                  value={formData.businessAddress}
                  onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                  className={`input-field pl-10 min-h-[80px] ${errors.businessAddress ? 'border-red-500' : ''}`}
                  placeholder="Enter complete business address"
                />
              </div>
              {errors.businessAddress && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.businessAddress}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Number *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                  className={`input-field pl-10 ${errors.gstNumber ? 'border-red-500' : ''}`}
                  placeholder="Enter GST number"
                />
              </div>
              {errors.gstNumber && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.gstNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PAN Number *
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.panNumber}
                  onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                  className={`input-field pl-10 ${errors.panNumber ? 'border-red-500' : ''}`}
                  placeholder="Enter PAN number"
                />
              </div>
              {errors.panNumber && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.panNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Type *
              </label>
              <select
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className={`input-field ${errors.businessType ? 'border-red-500' : ''}`}
              >
                <option value="">Select business type</option>
                <option value="sole">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="private">Private Limited</option>
                <option value="public">Public Limited</option>
                <option value="llp">LLP</option>
              </select>
              {errors.businessType && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.businessType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Operation *
              </label>
              <input
                type="number"
                value={formData.yearsOfOperation}
                onChange={(e) => setFormData({ ...formData, yearsOfOperation: e.target.value })}
                className={`input-field ${errors.yearsOfOperation ? 'border-red-500' : ''}`}
                placeholder="Number of years in business"
                min="0"
              />
              {errors.yearsOfOperation && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.yearsOfOperation}
                </p>
              )}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-secondary-500 mb-4">Document Upload</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please upload clear, legible copies of all required documents.
            </p>

            {[
              { key: 'gstCertificate', label: 'GST Certificate *', accept: '.pdf,.jpg,.jpeg,.png' },
              { key: 'panCard', label: 'PAN Card *', accept: '.pdf,.jpg,.jpeg,.png' },
              { key: 'businessLicense', label: 'Business License *', accept: '.pdf,.jpg,.jpeg,.png' },
              { key: 'bankProof', label: 'Bank Account Proof *', accept: '.pdf,.jpg,.jpeg,.png' },
            ].map((doc) => (
              <div key={doc.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {doc.label}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept={doc.accept}
                    onChange={handleFileUpload(doc.key as keyof typeof formData.documents)}
                    className="hidden"
                    id={doc.key}
                  />
                  <label
                    htmlFor={doc.key}
                    className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      formData.documents[doc.key as keyof typeof formData.documents]
                        ? 'border-green-500 bg-green-50'
                        : errors[doc.key]
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:border-secondary-500'
                    }`}
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      {formData.documents[doc.key as keyof typeof formData.documents] ? (
                        <div>
                          <p className="text-sm text-green-600 font-medium">
                            {formData.documents[doc.key as keyof typeof formData.documents]?.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Click to change file
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-600 font-medium">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF, JPG, PNG (Max 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                {errors[doc.key] && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors[doc.key]}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-secondary-500 mb-4">Review & Submit</h3>
            
            <div className="bg-primary-50 rounded-lg p-4">
              <h4 className="font-semibold text-secondary-500 mb-3">Basic Information</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Full Name:</p>
                  <p className="font-medium">{formData.fullName || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email:</p>
                  <p className="font-medium">{formData.email || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Mobile:</p>
                  <p className="font-medium">{formData.mobile || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-lg p-4">
              <h4 className="font-semibold text-secondary-500 mb-3">Business Details</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Business Name:</p>
                  <p className="font-medium">{formData.businessName || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-gray-600">GST Number:</p>
                  <p className="font-medium">{formData.gstNumber || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-gray-600">PAN Number:</p>
                  <p className="font-medium">{formData.panNumber || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Business Type:</p>
                  <p className="font-medium">{formData.businessType || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-lg p-4">
              <h4 className="font-semibold text-secondary-500 mb-3">Documents</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(formData.documents).map(([key, file]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    {file ? (
                      <span className="text-green-600 flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        Uploaded
                      </span>
                    ) : (
                      <span className="text-red-500">Missing</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> By submitting this application, you confirm that all information provided is accurate and complete. Your application will be reviewed by our team within 48 hours.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Thank You Screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-2xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
          >
            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>

            {/* Thank You Message */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-secondary-500 mb-4"
            >
              Thank You!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-6"
            >
              Your application has been submitted successfully. Our team will review your documents and verify your details.
            </motion.p>

            {/* Application ID */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-primary-50 rounded-xl p-6 mb-6"
            >
              <p className="text-sm text-gray-600 mb-2">Your Application ID</p>
              <p className="text-2xl font-mono font-bold text-secondary-500">{applicationId}</p>
            </motion.div>

            {/* What's Next */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-left mb-8"
            >
              <h3 className="font-semibold text-secondary-500 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                What's Next?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Our team will verify your documents within 24-48 hours</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>You'll receive an email with your Seller ID once verified</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>You can then login and start listing your products</span>
                </li>
              </ul>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-blue-50 rounded-lg p-4 mb-8"
            >
              <p className="text-sm text-blue-800 mb-2">Need help? Contact our support team</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="mailto:support@casaterminal.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <MailIcon className="w-4 h-4" />
                  <span className="text-sm">support@casaterminal.com</span>
                </a>
                <span className="hidden sm:inline text-blue-300">|</span>
                <a href="tel:+919876543210" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <PhoneIcon className="w-4 h-4" />
                  <span className="text-sm">+91 xxxxx xxxxx</span>
                </a>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
             
              <button
                onClick={handleGoHome}
                className="btn-secondary flex items-center justify-center gap-2 px-6 py-3"
              >
                Return to Home
              </button>
            </motion.div>

            {/* Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xs text-gray-500 mt-6"
            >
              You will receive an email confirmation shortly. Please check your spam folder if you don't see it.
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="max-w-4xl mx-auto container-padding">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      step.id < currentStep
                        ? 'bg-green-500 text-white'
                        : step.id === currentStep
                        ? 'bg-secondary-500 text-white scale-110'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.id < currentStep ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className={`text-xs font-medium ${
                      step.id === currentStep ? 'text-secondary-500' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-100 text-secondary-500 hover:bg-primary-200'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <button
              onClick={currentStep === steps.length ? handleSubmit : handleNext}
              className="btn-primary flex items-center space-x-2"
            >
              <span>{currentStep === steps.length ? 'Submit Application' : 'Next'}</span>
              {currentStep !== steps.length && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Info Message */}
        <p className="text-center text-sm text-gray-500 mt-4">
          * All fields are mandatory. Your information is secure and encrypted.
        </p>
      </div>
    </div>
  );
};

export default SellerRegistration;