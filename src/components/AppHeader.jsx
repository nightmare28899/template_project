import { Button } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import miLogo from '../assets/images/telefericologo.png';
import useAuthStore from '../store/useAuthStore';

const navigationItems = ['Trámites', 'Gobierno'];

const AppHeader = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleSessionAction = () => {
    if (isAuthenticated) {
      logout();
      navigate('/login', { replace: true });
      return;
    }

    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand">
          <img
            src={miLogo}
            alt="Logo Michoacán"
            className="app-header__logo"
          />
          <div className="app-header__divider" />
          <div className="app-header__copy">
            <span className="app-header__title">Llave Michoacán</span>
            <span className="app-header__subtitle">Gobierno del Estado</span>
          </div>
        </div>

        <nav className="app-header__nav" aria-label="Navegación principal">
          {navigationItems.map((item) => (
            <button key={item} type="button" className="app-header__link">
              {item}
            </button>
          ))}
          <Button
            type={isAuthenticated ? 'primary' : 'default'}
            icon={isAuthenticated ? <LogoutOutlined /> : <UserOutlined />}
            className="app-header__login-button"
            onClick={handleSessionAction}
          >
            {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
