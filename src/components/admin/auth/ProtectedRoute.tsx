import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedTypes?: string[];
}

const ProtectedRoute = ({ allowedTypes }: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userType = localStorage.getItem('userType');

  // Not logged in → redirect to user login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If specific types are required and user type is not allowed
  if (allowedTypes && !allowedTypes.includes(userType || '')) {
    // Redirect based on user type
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

  // Authorized → render child routes
  return <Outlet />;
};

export default ProtectedRoute;