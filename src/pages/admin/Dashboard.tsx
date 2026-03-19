// src/pages/admin/Dashboard.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Briefcase,
  Truck,
  Package,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Activity,
  ShoppingBag,
  CreditCard,
  Award,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  XCircle
} from 'lucide-react';
import Charts from '../../components/admin/Charts';
import DashboardCards from '../../components/admin/DashboardCards';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSellers: 0,
    totalContractors: 0,
    totalRentals: 0,
    totalProducts: 0,
    pendingApprovals: 0,
    totalRevenue: 0,
    totalCommission: 0,
    pendingPayouts: 0,
    activeOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    averageRating: 0,
    customerSatisfaction: 0,
    growthRate: 0
  });

  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [topSellers, setTopSellers] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [showStats, setShowStats] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedStat] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData();
  }, [selectedTimeframe]);

  const fetchDashboardData = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalSellers: 156,
        totalContractors: 89,
        totalRentals: 45,
        totalProducts: 1234,
        pendingApprovals: 23,
        totalRevenue: 4567890,
        totalCommission: 456789,
        pendingPayouts: 123456,
        activeOrders: 234,
        completedOrders: 1890,
        cancelledOrders: 45,
        averageRating: 4.5,
        customerSatisfaction: 92,
        growthRate: 15.8
      });

      setRecentActivities([
        { id: 1, action: 'New seller registered', user: 'ABC Constructions', time: '5 min ago', type: 'success', icon: Users },
        { id: 2, action: 'Payment received', user: 'Order #ORD-2024-1234', time: '10 min ago', type: 'info', icon: DollarSign },
        { id: 3, action: 'Payout requested', user: 'XYZ Enterprises', time: '15 min ago', type: 'warning', icon: CreditCard },
        { id: 4, action: 'Product approved', user: 'Premium TMT Steel', time: '20 min ago', type: 'success', icon: Package },
        { id: 5, action: 'Dispute raised', user: 'Order #ORD-2024-5678', time: '25 min ago', type: 'error', icon: AlertCircle },
        { id: 6, action: 'New contractor joined', user: 'Rajesh Constructions', time: '30 min ago', type: 'success', icon: Briefcase },
        { id: 7, action: 'Equipment booked', user: 'JCB 3DX', time: '35 min ago', type: 'info', icon: Truck },
        { id: 8, action: 'Commission paid', user: 'ABC Constructions', time: '40 min ago', type: 'success', icon: DollarSign }
      ]);

      setTopSellers([
        { id: 1, name: 'ABC Constructions', revenue: 456000, orders: 156, rating: 4.8, growth: 23 },
        { id: 2, name: 'XYZ Enterprises', revenue: 389000, orders: 134, rating: 4.6, growth: 18 },
        { id: 3, name: 'PQR Builders', revenue: 298000, orders: 98, rating: 4.7, growth: 15 },
        { id: 4, name: 'Singh Interiors', revenue: 267000, orders: 87, rating: 4.5, growth: 12 },
        { id: 5, name: 'Patel Electricals', revenue: 234000, orders: 76, rating: 4.4, growth: 10 }
      ]);

      setRecentOrders([
        { id: 'ORD-2024-1234', customer: 'Rahul Sharma', amount: 45000, status: 'completed', date: '2024-01-15' },
        { id: 'ORD-2024-1235', customer: 'Priya Patel', amount: 28500, status: 'processing', date: '2024-01-15' },
        { id: 'ORD-2024-1236', customer: 'Amit Kumar', amount: 125000, status: 'pending', date: '2024-01-14' },
        { id: 'ORD-2024-1237', customer: 'Sneha Reddy', amount: 8900, status: 'completed', date: '2024-01-14' },
        { id: 'ORD-2024-1238', customer: 'Vikram Singh', amount: 67000, status: 'cancelled', date: '2024-01-13' }
      ]);

      setIsRefreshing(false);
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 10000000) return (num / 10000000).toFixed(2) + 'Cr';
    if (num >= 100000) return (num / 100000).toFixed(2) + 'L';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const cardData = [
    {
      title: 'Total Sellers',
      value: formatNumber(stats.totalSellers),
      icon: Users,
      color: 'blue',
      trend: 12,
      trendLabel: 'vs last month',
      bgColor: 'bg-blue-50',
      details: {
        active: 142,
        pending: 8,
        blocked: 6,
        verified: 145
      }
    },
    {
      title: 'Total Contractors',
      value: formatNumber(stats.totalContractors),
      icon: Briefcase,
      color: 'green',
      trend: 8,
      trendLabel: 'vs last month',
      bgColor: 'bg-green-50',
      details: {
        active: 76,
        pending: 5,
        projects: 34,
        verified: 76
      }
    },
    {
      title: 'Total Rentals',
      value: formatNumber(stats.totalRentals),
      icon: Truck,
      color: 'purple',
      trend: 5,
      trendLabel: 'vs last month',
      bgColor: 'bg-purple-50',
      details: {
        available: 15,
        booked: 28,
        maintenance: 2,
        total: 45
      }
    },
    {
      title: 'Total Products',
      value: formatNumber(stats.totalProducts),
      icon: Package,
      color: 'yellow',
      trend: 15,
      trendLabel: 'vs last month',
      bgColor: 'bg-yellow-50',
      details: {
        active: 1045,
        pending: 23,
        lowStock: 15,
        featured: 88
      }
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'indigo',
      trend: 23,
      trendLabel: 'vs last month',
      bgColor: 'bg-indigo-50',
      details: {
        monthly: 4567890,
        weekly: 1234567,
        daily: 176234,
        average: 4567
      }
    },
    {
      title: 'Commission Earned',
      value: formatCurrency(stats.totalCommission),
      icon: TrendingUp,
      color: 'pink',
      trend: 18,
      trendLabel: 'vs last month',
      bgColor: 'bg-pink-50',
      details: {
        rate: '8.5%',
        pending: 45678,
        paid: 411111,
        expected: 500000
      }
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: Clock,
      color: 'orange',
      trend: -3,
      trendLabel: 'less than yesterday',
      bgColor: 'bg-orange-50',
      details: {
        sellers: 12,
        contractors: 5,
        rentals: 3,
        products: 3
      }
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders,
      icon: ShoppingBag,
      color: 'red',
      trend: 8,
      trendLabel: 'vs last month',
      bgColor: 'bg-red-50',
      details: {
        processing: 145,
        shipped: 67,
        delivered: 22,
        cancelled: 12
      }
    }
  ];

  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#502d13]" />
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, Admin! Here's what's happening with your platform today.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Time Range Selector */}
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#502d13]"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={fetchDashboardData}
            disabled={isRefreshing}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Export Button */}
          <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 text-gray-600" />
          </button>

          {/* Hide/Show Stats */}
          <button
            onClick={() => setShowStats(!showStats)}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {showStats ? <Eye className="w-4 h-4 text-gray-600" /> : <EyeOff className="w-4 h-4 text-gray-600" />}
          </button>
        </div>
      </div>

      {/* Stats Cards - Removed onCardClick prop */}
      {showStats && (
        <DashboardCards data={cardData} />
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Charts type="revenue" />
        <Charts type="category" />
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Completed Orders</p>
              <p className="text-lg font-bold text-gray-800">{stats.completedOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500 rounded-lg">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending Orders</p>
              <p className="text-lg font-bold text-gray-800">{stats.activeOrders - stats.completedOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border border-red-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500 rounded-lg">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Cancelled</p>
              <p className="text-lg font-bold text-gray-800">{stats.cancelledOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Award className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg Rating</p>
              <p className="text-lg font-bold text-gray-800">{stats.averageRating} ★</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
            <button className="text-sm text-[#502d13] hover:text-[#7b4a26] font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentActivities.slice(0, 6).map((activity) => {
              const Icon = activity.icon;
              const colors = {
                success: 'text-green-500 bg-green-50',
                info: 'text-blue-500 bg-blue-50',
                warning: 'text-yellow-500 bg-yellow-50',
                error: 'text-red-500 bg-red-50'
              };
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className={`p-2 rounded-lg ${colors[activity.type as keyof typeof colors]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-gray-500">{activity.user}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Sellers</h2>
          
          <div className="space-y-4">
            {topSellers.map((seller, index) => (
              <motion.div
                key={seller.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-[#502d13] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{seller.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{formatCurrency(seller.revenue)}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{seller.orders} orders</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-yellow-500">★</span>
                    <span className="text-xs text-gray-600">{seller.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUpRight className="w-3 h-3" />
                    <span className="text-xs">{seller.growth}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 text-center text-sm text-[#502d13] hover:text-[#7b4a26] font-medium py-2">
            View All Sellers →
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          <button className="text-sm text-[#502d13] hover:text-[#7b4a26] font-medium">
            View All Orders
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Details Modal */}
      {showStatsModal && selectedStat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${selectedStat.bgColor}`}>
                    <selectedStat.icon className={`w-5 h-5 text-${selectedStat.color}-600`} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedStat.title} Details</h2>
                </div>
                <button
                  onClick={() => setShowStatsModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(selectedStat.details).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-sm font-semibold text-gray-900">{value?.toString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;