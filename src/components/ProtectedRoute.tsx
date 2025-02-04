import {Navigate, useLocation} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
  publicOnly?: boolean;
}

const ProtectedRoute = ({children, publicOnly}: ProtectedRouteProps) => {
  const {user} = useUserContext();
  const location = useLocation();

  if (publicOnly) {
    if (user) {
      return <Navigate to="/" replace state={{from: location}} />;
    }
    return <>{children}</>;
  }

  if (!user) {
    return <Navigate to="/" replace state={{from: location}} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
