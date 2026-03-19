// src/components/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedTypes?: string[];
}

const ProtectedRoute = ({ allowedTypes }: ProtectedRouteProps) => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userType = localStorage.getItem('userType');

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If allowedTypes is specified and user type is not in the allowed list
  if (allowedTypes && !allowedTypes.includes(userType || '')) {
    // Redirect to appropriate dashboard based on user type
    switch(userType) {
      case 'seller':
        return <Navigate to="/seller/dashboard" replace />;
      case 'contractor':
        return <Navigate to="/contractor/dashboard" replace />;
      case 'rental':
        return <Navigate to="/rental/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // If authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;