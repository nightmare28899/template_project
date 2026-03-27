import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../axios';
import useAuthStore from '../../store/useAuthStore';

const hasConfiguredApiBaseUrl = Boolean(
  import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL !== '/'
);

const buildSession = (response, fallbackEmail) => ({
  email: response?.email || response?.user?.email || fallbackEmail || null,
  username:
    response?.username ||
    response?.user?.username ||
    response?.user?.nombre ||
    fallbackEmail ||
    null,
  profile: response?.profile || response?.user?.rol || response?.user?.role || 'Admin',
  access:
    response?.access ||
    response?.access_token ||
    response?.token ||
    'mock-jwt-access-token',
  refresh:
    response?.refresh ||
    response?.refresh_token ||
    'mock-jwt-refresh-token',
});

export const useLoginFunction = () => {
  const login = useAuthStore((state) => state.login);

  return useCallback(
    async ({ url = 'login', email, password, onSuccess }) => {
      let response;

      if (hasConfiguredApiBaseUrl) {
        response = await post(url, { email, password });
      } else {
        response = {
          email,
          username: email,
          profile: 'Admin',
          access: 'mock-jwt-access-token',
          refresh: 'mock-jwt-refresh-token',
        };
      }

      const session = buildSession(response, email);
      login(session);
      onSuccess?.(response);

      return response;
    },
    [login]
  );
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return useCallback(async () => {
    logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);
};
