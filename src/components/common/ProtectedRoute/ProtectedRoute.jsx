import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@store/slices/authSlice';

const ProtectedRoute = ({ children, requiredRole, fallback = null }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (!isAuthenticated) {
    return fallback || (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const PublicRoute = ({ children, fallback = null }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return fallback || <Navigate to="/account" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector((state) => state.auth.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export { ProtectedRoute, PublicRoute, AdminRoute };