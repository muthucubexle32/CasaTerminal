import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Hammer,
  Award,
  CheckCircle,
  AlertCircle,
  Upload,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const ContractorRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    location: '',
    
    // Professional Info
    experience: '',
    specialty: '',
    companyName: '',
    gstNumber: '',
    
    // Documents
    idProof: null,
    addressProof: null,
    certificationDocs: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.location) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.specialty) newErrors.specialty = 'Specialty is required';
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.idProof) newErrors.idProof = 'ID proof is required';
    if (!formData.addressProof) newErrors.addressProof = 'Address proof is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      console.log('Form submitted:', formData);
      navigate('/contractor/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-primary-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-500">Contractor Registration</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Join our network of verified contractors</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                    step >= i ? 'bg-secondary-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > i ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : i}
                  </div>
                  <span className="text-xs sm:text-sm mt-1 text-gray-600">
                    {i === 1 ? 'Personal' : i === 2 ? 'Professional' : 'Documents'}
                  </span>
                </div>
                {i < 3 && (
                  <div className={`w-12 sm:w-16 h-0.5 mx-2 ${
                    step > i ? 'bg-secondary-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-4">Personal Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                        errors.location ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="City, State"
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.location}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Professional Information */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-4">Professional Information</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                          errors.experience ? 'border-red-500' : 'border-gray-200'
                        }`}
                      >
                        <option value="">Select experience</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    {errors.experience && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialty <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Hammer className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                          errors.specialty ? 'border-red-500' : 'border-gray-200'
                        }`}
                      >
                        <option value="">Select specialty</option>
                        <option value="residential">Residential Construction</option>
                        <option value="commercial">Commercial Construction</option>
                        <option value="renovation">Renovation & Remodeling</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="interior">Interior Design</option>
                      </select>
                    </div>
                    {errors.specialty && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.specialty}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 sm:py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                      errors.companyName ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter your company name"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    placeholder="Enter GST number if registered"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Document Upload */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-4">Document Upload</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID Proof (Aadhar/PAN/Passport) <span className="text-red-500">*</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center ${
                    errors.idProof ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-secondary-500'
                  }`}>
                    <input
                      type="file"
                      name="idProof"
                      onChange={handleFileChange}
                      className="hidden"
                      id="idProof"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="idProof" className="cursor-pointer">
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                    </label>
                  </div>
                  {errors.idProof && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.idProof}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Proof (Utility Bill/Bank Statement) <span className="text-red-500">*</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center ${
                    errors.addressProof ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-secondary-500'
                  }`}>
                    <input
                      type="file"
                      name="addressProof"
                      onChange={handleFileChange}
                      className="hidden"
                      id="addressProof"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="addressProof" className="cursor-pointer">
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                    </label>
                  </div>
                  {errors.addressProof && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.addressProof}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certification Documents (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-secondary-500 transition-colors">
                    <input
                      type="file"
                      name="certificationDocs"
                      onChange={handleFileChange}
                      className="hidden"
                      id="certificationDocs"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                    />
                    <label htmlFor="certificationDocs" className="cursor-pointer">
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Upload certifications (optional)</p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 10MB each)</p>
                    </label>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-3 sm:p-4 mt-4">
                  <p className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                    <span>Your documents will be securely stored and used only for verification purposes.</span>
                  </p>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 sm:mt-8 pt-4 border-t border-gray-200">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-secondary-500 text-white rounded-lg text-sm sm:text-base hover:bg-secondary-600 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-green-600 text-white rounded-lg text-sm sm:text-base hover:bg-green-700 transition-colors"
                >
                  Submit Application
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Terms */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6"
        >
          By registering, you agree to our{' '}
          <a href="#" className="text-secondary-500 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-secondary-500 hover:underline">Privacy Policy</a>
        </motion.p>
      </div>
    </div>
  );
};

export default ContractorRegistration;