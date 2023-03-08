import { useAuthStore } from '../stores/auth.store';
import { Navigate } from 'react-router-dom';

interface ProtectRouteInterface {
  children: JSX.Element;
  guestOnly?: boolean;
}

export default function ProtectRoute({
  children,
  guestOnly,
}: ProtectRouteInterface) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if ((isLoggedIn && !guestOnly) || (guestOnly && !isLoggedIn)) {
    return children;
  } else {
    return <Navigate to={isLoggedIn ? '/' : '/login'} replace />;
  }
}
