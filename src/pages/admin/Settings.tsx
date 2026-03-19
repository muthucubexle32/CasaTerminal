// src/pages/admin/Settings.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Shield,
  Bell,
  Percent,
  Users,
  Save,
  RefreshCw,
  AlertTriangle,
  CreditCard} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'commission', name: 'Commission', icon: Percent },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'users', name: 'Users', icon: Users },
  ];

  const [settings, setSettings] = useState({
    // General
    siteName: 'Casa Terminal',
    siteEmail: 'admin@casaterminal.com',
    supportEmail: 'support@casaterminal.com',
    phone: '+91 xxxxx xxxxx',
    address: 'Mumbai, India',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR',

    // Commission
    sellerCommission: 5,
    contractorCommission: 8,
    rentalCommission: 10,
    minCommission: 2,
    maxCommission: 20,

    // Payments
    paymentGateway: 'razorpay',
    payoutCycle: 'weekly',
    minPayout: 1000,
    maxPayout: 500000,
    holdPeriod: 3,

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    notifyNewSeller: true,
    notifyNewOrder: true,
    notifyPayout: true,

    // Security
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    ipWhitelist: false,

    // Users
    allowRegistration: true,
    requireApproval: true,
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleReset = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmReset = () => {
    // Reset to defaults
    setSettings({
      siteName: 'Casa Terminal',
      siteEmail: 'admin@casaterminal.com',
      supportEmail: 'support@casaterminal.com',
      phone: '+91 98765 43210',
      address: 'Mumbai, India',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      currency: 'INR',
      sellerCommission: 5,
      contractorCommission: 8,
      rentalCommission: 10,
      minCommission: 2,
      maxCommission: 20,
      paymentGateway: 'razorpay',
      payoutCycle: 'weekly',
      minPayout: 1000,
      maxPayout: 500000,
      holdPeriod: 3,
      emailNotifications: true,
      pushNotifications: true,
      notifyNewSeller: true,
      notifyNewOrder: true,
      notifyPayout: true,
      twoFactorAuth: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      ipWhitelist: false,
      allowRegistration: true,
      requireApproval: true,
    });
    setShowConfirmModal(false);
    alert('Settings reset to defaults');
  };

  // Toggle switch component
  const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-orange-900' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 sm:w-7 sm:h-7 text-orange-900" />
              Settings
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Configure your platform preferences
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-orange-900 text-white rounded-lg hover:bg-orange-500 text-sm disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Settings Tabs - Horizontal Scroll on Mobile */}
        <div className="border-b border-gray-200 mb-6 overflow-x-auto">
          <nav className="flex -mb-px space-x-4 sm:space-x-8 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-1 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-900 text-orange-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="p-4 sm:p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">General Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-900"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Site Email
                  </label>
                  <input
                    type="email"
                    value={settings.siteEmail}
                    onChange={(e) => setSettings({...settings, siteEmail: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-900"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({...settings, phone: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({...settings, address: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Asia/Kolkata (IST)</option>
                    <option>Asia/Dubai (GST)</option>
                    <option>UTC</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Date Format
                  </label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({...settings, currency: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Commission Settings */}
          {activeTab === 'commission' && (
            <div className="p-4 sm:p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">Commission Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Seller Commission (%)
                  </label>
                  <input
                    type="number"
                    value={settings.sellerCommission}
                    onChange={(e) => setSettings({...settings, sellerCommission: Number(e.target.value)})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Contractor Commission (%)
                  </label>
                  <input
                    type="number"
                    value={settings.contractorCommission}
                    onChange={(e) => setSettings({...settings, contractorCommission: Number(e.target.value)})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Rental Commission (%)
                  </label>
                  <input
                    type="number"
                    value={settings.rentalCommission}
                    onChange={(e) => setSettings({...settings, rentalCommission: Number(e.target.value)})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Min Commission (%)
                  </label>
                  <input
                    type="number"
                    value={settings.minCommission}
                    onChange={(e) => setSettings({...settings, minCommission: Number(e.target.value)})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Max Commission (%)
                  </label>
                  <input
                    type="number"
                    value={settings.maxCommission}
                    onChange={(e) => setSettings({...settings, maxCommission: Number(e.target.value)})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payments' && (
            <div className="p-4 sm:p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">Payment Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Payment Gateway
                  </label>
                  <select
                    value={settings.paymentGateway}
                    onChange={(e) => setSettings({...settings, paymentGateway: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="razorpay">Razorpay</option>
                    <option value="paytm">Paytm</option>
                    <option value="phonepe">PhonePe</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Payout Cycle
                  </label>
                  <select
                    value={settings.payoutCycle}
                    onChange={(e) => setSettings({...settings, payoutCycle: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Min Payout (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.minPayout}
                    onChange={(e) => setSettings({...settings, minPayout: Number(e.target.value)})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Max Payout (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.maxPayout}
                    onChange={(e) => setSettings({...settings, maxPayout: Number(e.target.value)})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Hold Period (days)
                  </label>
                  <input
                    type="number"
                    value={settings.holdPeriod}
                    onChange={(e) => setSettings({...settings, holdPeriod: Number(e.target.value)})}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="p-4 sm:p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">Notification Settings</h2>
              
              <div className="space-y-4">
                <Toggle
                  checked={settings.emailNotifications}
                  onChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  label="Email Notifications"
                />
                
                <Toggle
                  checked={settings.pushNotifications}
                  onChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                  label="Push Notifications"
                />
                
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Notify me about:</h3>
                  <div className="space-y-3">
                    <Toggle
                      checked={settings.notifyNewSeller}
                      onChange={(checked) => setSettings({...settings, notifyNewSeller: checked})}
                      label="New Seller Registration"
                    />
                    
                    <Toggle
                      checked={settings.notifyNewOrder}
                      onChange={(checked) => setSettings({...settings, notifyNewOrder: checked})}
                      label="New Orders"
                    />
                    
                    <Toggle
                      checked={settings.notifyPayout}
                      onChange={(checked) => setSettings({...settings, notifyPayout: checked})}
                      label="Payout Requests"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="p-4 sm:p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">Security Settings</h2>
              
              <div className="space-y-4">
                <Toggle
                  checked={settings.twoFactorAuth}
                  onChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
                  label="Two-Factor Authentication"
                />
                
                <Toggle
                  checked={settings.ipWhitelist}
                  onChange={(checked) => setSettings({...settings, ipWhitelist: checked})}
                  label="IP Whitelist"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Session Timeout (min)
                    </label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({...settings, sessionTimeout: Number(e.target.value)})}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => setSettings({...settings, maxLoginAttempts: Number(e.target.value)})}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Settings */}
          {activeTab === 'users' && (
            <div className="p-4 sm:p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">User Settings</h2>
              
              <div className="space-y-4">
                <Toggle
                  checked={settings.allowRegistration}
                  onChange={(checked) => setSettings({...settings, allowRegistration: checked})}
                  label="Allow New Registrations"
                />
                
                <Toggle
                  checked={settings.requireApproval}
                  onChange={(checked) => setSettings({...settings, requireApproval: checked})}
                  label="Require Admin Approval"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full"
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 text-red-500 mb-4">
                  <AlertTriangle className="w-6 h-6" />
                  <h2 className="text-lg font-semibold">Reset Settings?</h2>
                </div>
                
                <p className="text-sm text-gray-600 mb-6">
                  This will reset all settings to default values. This action cannot be undone.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={handleConfirmReset}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-sm"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;