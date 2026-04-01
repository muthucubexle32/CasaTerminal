// src/pages/Seller/SellerDashboard.tsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Package, ShoppingCart, DollarSign, Clock, Star, TrendingUp,
  Eye, PlusCircle, Edit2, Trash2, Upload, X,
  Bell, User,  LogOut, ChevronDown, Percent,
  CheckCircle, XCircle, AlertCircle, ChevronRight,
  BarChart3, PieChart, ArrowUpRight,
  HardHat, Building2
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell
} from 'recharts';
import { toast, Toaster } from 'react-hot-toast';

// --- Types ---
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sold: number;
  revenue: number;
  status: 'active' | 'inactive' | 'pending';
  images: string[];
  category: string;
  description?: string;
}

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'processing' | 'pending' | 'cancelled';
  date: string;
  items: number;
  address?: string;
  phone?: string;
}

interface Activity {
  id: number;
  type: 'order' | 'product' | 'review' | 'payout';
  title: string;
  time: string;
  amount?: number;
}

interface SellerProfile {
  name: string;
  email: string;
  phone: string;
  company: string;
  gst: string;
  address: string;
}

// --- Mock Data ---
const initialProducts: Product[] = [
  { id: 'PRD-001', name: 'UltraTech Cement (50kg)', price: 350, stock: 5000, sold: 1250, revenue: 437500, status: 'active', images: [], category: 'Cement' },
  { id: 'PRD-002', name: 'TATA TMT Steel Bars (12mm)', price: 750, stock: 2500, sold: 850, revenue: 637500, status: 'active', images: [], category: 'Steel' },
  { id: 'PRD-003', name: 'JCB 3DX Backhoe Loader', price: 8500, stock: 5, sold: 12, revenue: 102000, status: 'pending', images: [], category: 'Equipment' },
  { id: 'PRD-004', name: 'Bosch Hammer Drill', price: 4500, stock: 150, sold: 320, revenue: 1440000, status: 'active', images: [], category: 'Tools' },
  { id: 'PRD-005', name: 'Asian Paints Royale', price: 2200, stock: 0, sold: 430, revenue: 946000, status: 'inactive', images: [], category: 'Paint' },
];

const initialOrders: Order[] = [
  { id: 'ORD-2024-1234', customer: 'XYZ Constructions', amount: 45000, status: 'completed', date: '2024-01-15', items: 3, address: 'Mumbai', phone: '9876543210' },
  { id: 'ORD-2024-1235', customer: 'Urban Developers', amount: 28500, status: 'processing', date: '2024-01-15', items: 2, address: 'Delhi', phone: '8765432109' },
  { id: 'ORD-2024-1236', customer: 'Amit Kumar', amount: 125000, status: 'pending', date: '2024-01-14', items: 1, address: 'Bangalore', phone: '7654321098' },
  { id: 'ORD-2024-1237', customer: 'Sneha Reddy', amount: 8900, status: 'completed', date: '2024-01-14', items: 2, address: 'Chennai', phone: '6543210987' },
  { id: 'ORD-2024-1238', customer: 'Vikram Singh', amount: 67000, status: 'cancelled', date: '2024-01-13', items: 1, address: 'Pune', phone: '5432109876' },
];

const initialActivities: Activity[] = [
  { id: 1, type: 'order', title: 'New order received', time: '5 min ago', amount: 45000 },
  { id: 2, type: 'product', title: 'Product approved', time: '10 min ago' },
  { id: 3, type: 'review', title: '5-star review from ABC Constructions', time: '1 hour ago' },
  { id: 4, type: 'payout', title: 'Payout processed', time: '2 hours ago', amount: 125000 },
];

const salesData = [
  { name: 'Mon', sales: 12000 },
  { name: 'Tue', sales: 19000 },
  { name: 'Wed', sales: 15000 },
  { name: 'Thu', sales: 22000 },
  { name: 'Fri', sales: 28000 },
  { name: 'Sat', sales: 24000 },
  { name: 'Sun', sales: 18000 },
];

const categoryData = [
  { name: 'Cement', value: 35, color: '#502d13' },
  { name: 'Steel', value: 28, color: '#7b4a26' },
  { name: 'Equipment', value: 20, color: '#a06e3a' },
  { name: 'Tools', value: 12, color: '#c28a5c' },
  { name: 'Paint', value: 5, color: '#e9ddc8' },
];

// Helper functions
const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
const generateId = () => `PRD-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [profile, setProfile] = useState<SellerProfile>({
    name: 'XXxx YYY',
    email: 'seller@example.com',
    phone: '+91 9876543210',
    company: 'XXxx Construction',
    gst: '27AAAAA0000A1Z5',
    address: '123, Construction Hub, Mumbai'
  });
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalCommission: 0,
    averageRating: 0,
    totalReviews: 0
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState<Order | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Cement',
    description: '',
    images: [] as File[]
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setProducts(initialProducts);
        setOrders(initialOrders);
        setActivities(initialActivities);
        updateStats(initialProducts, initialOrders);
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  // Update stats
  const updateStats = useCallback((productsList: Product[], ordersList: Order[]) => {
    const totalRevenue = productsList.reduce((sum, p) => sum + p.revenue, 0);
    const totalCommission = totalRevenue * 0.05;
    setStats({
      totalProducts: productsList.length,
      activeProducts: productsList.filter(p => p.status === 'active').length,
      totalOrders: ordersList.length,
      pendingOrders: ordersList.filter(o => o.status === 'pending').length,
      totalRevenue,
      totalCommission,
      averageRating: 4.5,
      totalReviews: 124
    });
  }, []);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + imagePreviews.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
    setNewProduct(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setNewProduct(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  // Add product
  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.price || !newProduct.stock) {
      toast.error('Please fill all required fields');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newId = generateId();
      const newProductObj: Product = {
        id: newId,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        sold: 0,
        revenue: 0,
        status: 'pending',
        images: imagePreviews, // store URLs (in real app, upload to server)
        category: newProduct.category,
        description: newProduct.description
      };
      const updatedProducts = [newProductObj, ...products];
      setProducts(updatedProducts);
      updateStats(updatedProducts, orders);
      setActivities([{ id: Date.now(), type: 'product', title: `New product "${newProduct.name}" added, awaiting approval`, time: 'Just now' }, ...activities]);
      toast.success('Product submitted for approval!');
      resetProductForm();
      setShowAddProduct(false);
      setIsSubmitting(false);
    }, 800);
  };

  // Edit product
  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      description: product.description || '',
      images: []
    });
    setImagePreviews(product.images);
    setShowAddProduct(true);
  };

  const handleUpdateProduct = () => {
    if (!editProduct) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const updatedProducts = products.map(p =>
        p.id === editProduct.id
          ? {
              ...p,
              name: newProduct.name,
              price: parseFloat(newProduct.price),
              stock: parseInt(newProduct.stock),
              category: newProduct.category,
              description: newProduct.description,
              images: imagePreviews,
              status: 'pending' as const
            }
          : p
      );
      setProducts(updatedProducts);
      updateStats(updatedProducts, orders);
      toast.success('Product updated and pending approval');
      resetProductForm();
      setShowAddProduct(false);
      setEditProduct(null);
      setIsSubmitting(false);
    }, 800);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      updateStats(updatedProducts, orders);
      toast.success('Product deleted');
    }
  };

  const resetProductForm = () => {
    setNewProduct({ name: '', price: '', stock: '', category: 'Cement', description: '', images: [] });
    setImagePreviews([]);
  };

  // Update profile
  const handleUpdateProfile = (updatedProfile: SellerProfile) => {
    setProfile(updatedProfile);
    toast.success('Profile updated successfully');
    setShowProfileModal(false);
  };

  // Status badge
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending_approval: 'bg-yellow-100 text-yellow-800'
    };
    const icons: Record<string, React.ElementType> = {
      completed: CheckCircle,
      processing: Clock,
      pending: Clock,
      cancelled: XCircle,
      active: CheckCircle,
      inactive: XCircle,
      pending_approval: Clock
    };
    const Icon = icons[status] || AlertCircle;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#502d13] border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <HardHat className="w-8 h-8 text-[#502d13]" />
            </div>
          </div>
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <Toaster position="top-right" />
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#502d13]" />
            <h1 className="text-xl font-bold text-[#502d13]">Seller Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#502d13] to-[#7b4a26] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {profile.name.charAt(0)}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50"
                  >
                    <div className="p-3 border-b">
                      <p className="font-medium">{profile.name}</p>
                      <p className="text-xs text-gray-500">{profile.email}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => { setShowProfileMenu(false); setShowProfileModal(true); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                      >
                        <User className="w-4 h-4" /> Profile
                      </button>
                     
                      <div className="border-t my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Same as before, but using stats values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#502d13]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalProducts}</p>
              </div>
              <div className="p-2 bg-[#502d13]/10 rounded-lg">
                <Package className="w-5 h-5 text-[#502d13]" />
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{stats.activeProducts} active</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#502d13]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
              </div>
              <div className="p-2 bg-[#502d13]/10 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-[#502d13]" />
              </div>
            </div>
            <div className="mt-2 text-xs text-yellow-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{stats.pendingOrders} pending</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#502d13]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="p-2 bg-[#502d13]/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-[#502d13]" />
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+12% vs last month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#502d13]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Commission Earned</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.totalCommission)}</p>
              </div>
              <div className="p-2 bg-[#502d13]/10 rounded-lg">
                <Percent className="w-5 h-5 text-[#502d13]" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">5% of sales</div>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Sales Trend</h2>
                <p className="text-xs text-gray-500">Last 7 days</p>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">+8.2%</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#502d13" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#502d13" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(value) => `₹${value/1000}K`} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Area type="monotone" dataKey="sales" stroke="#502d13" fill="url(#salesGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Sales by Category</h2>
                <p className="text-xs text-gray-500">Revenue distribution</p>
              </div>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => {
                      const percentage = (percent ?? 0) * 100;
                      return `${name}: ${percentage.toFixed(0)}%`;
                    }}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Orders & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                <p className="text-xs text-gray-500">Latest transactions</p>
              </div>
              <button
                onClick={() => setShowAllOrders(true)}
                className="text-sm text-[#502d13] hover:text-[#7b4a26] font-medium"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.slice(0, 4).map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(order.amount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setShowOrderDetails(order)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Top Products</h2>
                <p className="text-xs text-gray-500">Best sellers by revenue</p>
              </div>
              <button
                onClick={() => { setEditProduct(null); setShowAddProduct(true); }}
                className="text-sm text-[#502d13] hover:text-[#7b4a26] font-medium"
              >
                Manage
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {products.filter(p => p.status === 'active').slice(0, 4).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sold} sold</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-1 hover:bg-gray-200 rounded text-gray-500"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-1 hover:bg-red-100 rounded text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-semibold text-gray-800">{formatCurrency(product.revenue)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <button className="text-sm text-[#502d13] hover:text-[#7b4a26] font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {activity.type === 'order' && <ShoppingCart className="w-4 h-4 text-blue-500" />}
                    {activity.type === 'product' && <Package className="w-4 h-4 text-green-500" />}
                    {activity.type === 'review' && <Star className="w-4 h-4 text-yellow-500" />}
                    {activity.type === 'payout' && <DollarSign className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>{activity.time}</span>
                      {activity.amount && (
                        <>
                          <span>•</span>
                          <span className="font-medium text-green-600">{formatCurrency(activity.amount)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setEditProduct(null);
                  resetProductForm();
                  setShowAddProduct(true);
                }}
                className="w-full flex items-center justify-between p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#502d13]" />
                  <span className="text-sm font-medium">Add New Product</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => setShowAllOrders(true)}
                className="w-full flex items-center justify-between p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#502d13]" />
                  <span className="text-sm font-medium">View All Orders</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => setShowAnalytics(true)}
                className="w-full flex items-center justify-between p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#502d13]" />
                  <span className="text-sm font-medium">Analytics Report</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
             
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {showAddProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                  <button onClick={() => setShowAddProduct(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); editProduct ? handleUpdateProduct() : handleAddProduct(); }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#502d13]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                        required
                        min="0"
                        step="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                      <input
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                        required
                        min="0"
                        step="1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    >
                      <option>Cement</option>
                      <option>Steel</option>
                      <option>Equipment</option>
                      <option>Tools</option>
                      <option>Paint</option>
                      <option>Sanitary</option>
                      <option>Electrical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Images (Max 5)</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#502d13] transition-colors"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload images</p>
                    </button>
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {imagePreviews.map((url, idx) => (
                          <div key={idx} className="relative">
                            <img src={url} alt={`preview-${idx}`} className="w-full h-20 object-cover rounded-lg" />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-[#502d13] text-white py-2 rounded-lg hover:bg-[#7b4a26] disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : (editProduct ? 'Update Product' : 'Submit for Approval')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddProduct(false)}
                      className="flex-1 border border-gray-200 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* All Orders Modal */}
      <AnimatePresence>
        {showAllOrders && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">All Orders</h2>
                  <button onClick={() => setShowAllOrders(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(order.amount)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => { setShowOrderDetails(order); setShowAllOrders(false); }}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderDetails && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                  <button onClick={() => setShowOrderDetails(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Order ID</p>
                      <p className="font-medium">{showOrderDetails.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p>{showOrderDetails.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Customer</p>
                      <p>{showOrderDetails.customer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p>{showOrderDetails.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="font-bold text-green-600">{formatCurrency(showOrderDetails.amount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Items</p>
                      <p>{showOrderDetails.items}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Address</p>
                      <p>{showOrderDetails.address}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      {getStatusBadge(showOrderDetails.status)}
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <button
                      onClick={() => setShowOrderDetails(null)}
                      className="w-full border border-gray-200 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Analytics Report Modal */}
      <AnimatePresence>
        {showAnalytics && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Analytics Report</h2>
                  <button onClick={() => setShowAnalytics(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-primary-50 p-4 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Total Revenue</p>
                      <p className="text-xl font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</p>
                    </div>
                    <div className="bg-primary-50 p-4 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Total Orders</p>
                      <p className="text-xl font-bold text-gray-800">{stats.totalOrders}</p>
                    </div>
                    <div className="bg-primary-50 p-4 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Commission Earned</p>
                      <p className="text-xl font-bold text-gray-800">{formatCurrency(stats.totalCommission)}</p>
                    </div>
                  </div>

                  {/* Sales Trend (smaller) */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-800 mb-2">Weekly Sales Trend</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
                          <Tooltip formatter={(value) => formatCurrency(value as number)} />
                          <Area type="monotone" dataKey="sales" stroke="#502d13" fill="url(#salesGradient)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Top Categories */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-800 mb-2">Top Categories</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, idx) => (
                              <Cell key={`cell-${idx}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RePieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Manage Profile</h2>
                  <button onClick={() => setShowProfileModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const updatedProfile: SellerProfile = {
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    phone: formData.get('phone') as string,
                    company: formData.get('company') as string,
                    gst: formData.get('gst') as string,
                    address: formData.get('address') as string,
                  };
                  handleUpdateProfile(updatedProfile);
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input name="name" defaultValue={profile.name} className="w-full px-3 py-2 border border-gray-200 rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input name="email" type="email" defaultValue={profile.email} className="w-full px-3 py-2 border border-gray-200 rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input name="phone" defaultValue={profile.phone} className="w-full px-3 py-2 border border-gray-200 rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input name="company" defaultValue={profile.company} className="w-full px-3 py-2 border border-gray-200 rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                      <input name="gst" defaultValue={profile.gst} className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                      <textarea name="address" rows={2} defaultValue={profile.address} className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button type="submit" className="flex-1 bg-[#502d13] text-white py-2 rounded-lg hover:bg-[#7b4a26]">
                        Save Changes
                      </button>
                      <button type="button" onClick={() => setShowProfileModal(false)} className="flex-1 border border-gray-200 py-2 rounded-lg hover:bg-gray-50">
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerDashboard;