import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Truck,
  Wrench,
  Package,
  CheckCircle,
  AlertCircle,
 
  ChevronRight,
  ChevronLeft,
  Shield,
  FileText,
  
} from 'lucide-react';

const RentalRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Business Info
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    gstNumber: '',
    
    // Equipment Categories
    categories: [] as string[],
    equipmentCount: '',
    yearsInBusiness: '',
    
    // Documents
    businessProof: null,
    idProof: null,
    insuranceDoc: null,
    equipmentList: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const equipmentCategories = [
    { id: 'heavy', label: 'Heavy Equipment', icon: Truck },
    { id: 'tools', label: 'Construction Tools', icon: Wrench },
    { id: 'scaffolding', label: 'Scaffolding', icon: Package },
    { id: 'generators', label: 'Generators', icon: Package },
    { id: 'material', label: 'Material Handling', icon: Truck },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessName) newErrors.businessName = 'Business name is required';
    if (!formData.ownerName) newErrors.ownerName = 'Owner name is required';
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
    if (formData.categories.length === 0) newErrors.categories = 'Select at least one category';
    if (!formData.equipmentCount) newErrors.equipmentCount = 'Equipment count is required';
    if (!formData.yearsInBusiness) newErrors.yearsInBusiness = 'Years in business is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessProof) newErrors.businessProof = 'Business proof is required';
    if (!formData.idProof) newErrors.idProof = 'ID proof is required';
    if (!formData.insuranceDoc) newErrors.insuranceDoc = 'Insurance document is required';
    
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
      navigate('/rental/dashboard');
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
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-500">Rental Support Registration</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">List your equipment and join our rental network</p>
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
                    {i === 1 ? 'Business' : i === 2 ? 'Equipment' : 'Documents'}
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
            {/* Step 1: Business Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-4">Business Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                        errors.businessName ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter your business name"
                    />
                  </div>
                  {errors.businessName && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.businessName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                        errors.ownerName ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter owner's full name"
                    />
                  </div>
                  {errors.ownerName && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.ownerName}
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
                    City/Location <span className="text-red-500">*</span>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    placeholder="Enter your complete address"
                  />
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
                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    placeholder="Enter GST number if registered"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Equipment Information */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="text-lg sm:text-xl font-bold text-secondary-500 mb-4">Equipment Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equipment Categories <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {equipmentCategories.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = formData.categories.includes(cat.id);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryToggle(cat.id)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-secondary-500 text-white border-secondary-500'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-secondary-500'
                          }`}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                          <span className="text-xs sm:text-sm font-medium">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.categories && (
                    <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.categories}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Equipment Count <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="equipmentCount"
                      value={formData.equipmentCount}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                        errors.equipmentCount ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select count</option>
                      <option value="1-5">1-5 items</option>
                      <option value="6-20">6-20 items</option>
                      <option value="21-50">21-50 items</option>
                      <option value="50+">50+ items</option>
                    </select>
                    {errors.equipmentCount && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.equipmentCount}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Years in Business <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                        errors.yearsInBusiness ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select years</option>
                      <option value="0-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                    {errors.yearsInBusiness && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.yearsInBusiness}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800">Insurance Requirement</h4>
                      <p className="text-xs sm:text-sm text-blue-700 mt-1">
                        All rental equipment must have valid insurance coverage. You'll need to upload insurance documents in the next step.
                      </p>
                    </div>
                  </div>
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
                    Business Registration Proof <span className="text-red-500">*</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center ${
                    errors.businessProof ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-secondary-500'
                  }`}>
                    <input
                      type="file"
                      name="businessProof"
                      onChange={handleFileChange}
                      className="hidden"
                      id="businessProof"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="businessProof" className="cursor-pointer">
                      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                    </label>
                  </div>
                  {errors.businessProof && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.businessProof}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner ID Proof (Aadhar/PAN/Passport) <span className="text-red-500">*</span>
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
                      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
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
                    Insurance Certificate <span className="text-red-500">*</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center ${
                    errors.insuranceDoc ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-secondary-500'
                  }`}>
                    <input
                      type="file"
                      name="insuranceDoc"
                      onChange={handleFileChange}
                      className="hidden"
                      id="insuranceDoc"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="insuranceDoc" className="cursor-pointer">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                    </label>
                  </div>
                  {errors.insuranceDoc && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.insuranceDoc}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equipment List (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-secondary-500 transition-colors">
                    <input
                      type="file"
                      name="equipmentList"
                      onChange={handleFileChange}
                      className="hidden"
                      id="equipmentList"
                      accept=".pdf,.xlsx,.xls,.csv"
                    />
                    <label htmlFor="equipmentList" className="cursor-pointer">
                      <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Upload equipment inventory (optional)</p>
                      <p className="text-xs text-gray-500">PDF, Excel, CSV (Max 10MB)</p>
                    </label>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-green-800">Verification Process</h4>
                      <p className="text-xs sm:text-sm text-green-700 mt-1">
                        Your documents will be verified within 24-48 hours. Once verified, your listings will go live.
                      </p>
                    </div>
                  </div>
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
          <a href="#" className="text-secondary-500 hover:underline">Rental Agreement</a>
        </motion.p>
      </div>
    </div>
  );
};

export default RentalRegistration;