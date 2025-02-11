import {Navigate, useLocation} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
  publicOnly?: boolean;
}

const ProtectedRoute = ({children, publicOnly}: ProtectedRouteProps) => {
  const {user, loading} = useUserContext();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (publicOnly) {
    if (user) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{from: location}} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
