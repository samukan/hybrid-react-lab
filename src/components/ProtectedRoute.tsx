<<<<<<< HEAD
// ProtectedRoute.tsx
import {Navigate, useLocation} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const {user} = useUserContext();
  const location = useLocation();

  console.log('lokaatio', location);

  if (!user) {
    // replace and state are used to redirect to origin when page is refreshed
    return <Navigate to="/" replace state={{from: location}} />;
  }

  return children;
=======
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
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
};

export default ProtectedRoute;
