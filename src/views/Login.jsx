import { Button, Form, Input, Typography } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  FormOutlined,
  KeyOutlined,
  LockOutlined,
  LoginOutlined,
  MailOutlined
} from '@ant-design/icons';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onFinish = (values) => {
    login({
      email: values.email,
      username: values.email,
      profile: 'Admin',
      access: 'mock-jwt-access-token',
      refresh: 'mock-jwt-refresh-token'
    });

    navigate('/dashboard');
  };

  return (
    <section className="login-page">
      <div className="login-page__hero">
        <div className="login-page__brand">
          <Title level={1} className="login-page__brand-title">
            Llave michoacán
          </Title>
          <KeyOutlined className="login-page__brand-icon" />
        </div>

        <div className="login-card">
          <Title level={2} className="login-card__title">
            Acceder a la plataforma
          </Title>

        <Form
          name="login"
          layout="vertical"
          requiredMark={false}
          className="login-form"
          onFinish={onFinish}
        >
          <div className="login-form__field">
            <label className="login-form__label" htmlFor="login-email">
              Correo electrónico
            </label>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Ingresa tu correo electrónico.' },
                { type: 'email', message: 'Ingresa un correo electrónico válido.' }
              ]}
            >
              <Input
                id="login-email"
                prefix={<MailOutlined />}
                placeholder="usuario@correo.com"
                size="large"
                autoComplete="email"
              />
            </Form.Item>
          </div>

          <div className="login-form__field">
            <label className="login-form__label" htmlFor="login-password">
              Contraseña
            </label>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Ingresa tu contraseña.' }]}
            >
              <Input.Password
                id="login-password"
                prefix={<LockOutlined />}
                placeholder="********"
                size="large"
                autoComplete="current-password"
                iconRender={(visible) => (
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                )}
              />
            </Form.Item>
          </div>

          <Form.Item className="login-form__submit-row">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form__submit"
              icon={<LoginOutlined />}
              size="large"
            >
              Iniciar sesión
            </Button>
          </Form.Item>

          <div className="login-form__support">
            <button type="button" className="login-form__text-action">
              ¿Olvidaste tu contraseña?
            </button>
            <span className="login-form__divider" />
            <button type="button" className="login-form__text-action">
              No recuerdo mi usuario
            </button>
          </div>

          <Button
            type="default"
            htmlType="button"
            icon={<FormOutlined />}
            className="login-form__create-account"
          >
            Crear cuenta
          </Button>
        </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
