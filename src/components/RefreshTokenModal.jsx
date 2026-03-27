import { Modal, Button, Typography, Space } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const RefreshTokenModal = () => {
  const isModalOpen = useAuthStore((state) => state.isRefreshTokenModalOpen);
  const refreshTokenAction = useAuthStore((state) => state.refreshTokenAction);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleRefresh = async () => {
    try {
      await refreshTokenAction();
    } catch {
      // Si falla el refresh (ej. la API dice que el refresh token también expiró)
      logout();
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Modal
      title={
        <Space>
          <WarningOutlined style={{ color: '#faad14' }} />
          <span>Sesión por expirar</span>
        </Space>
      }
      open={isModalOpen}
      closable={false}
      maskClosable={false}
      footer={[
        <Button key="logout" onClick={handleLogout}>
          Cerrar sesión
        </Button>,
        <Button key="refresh" type="primary" onClick={handleRefresh}>
          Mantener sesión activa
        </Button>,
      ]}
    >
      <div style={{ padding: '20px 0' }}>
        <Text>
          Tu sesión está a punto de expirar por inactividad. ¿Deseas mantener tu sesión activa?
        </Text>
      </div>
    </Modal>
  );
};

export default RefreshTokenModal;
