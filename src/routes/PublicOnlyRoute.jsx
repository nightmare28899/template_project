import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

const PublicOnlyRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="public-route-shell">
      <AppHeader />
      <main className="public-route-main">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};

export default PublicOnlyRoute;
