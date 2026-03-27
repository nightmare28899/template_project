import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const getCsrfToken = () => {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : null;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  config.headers = config.headers || {};

  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }

  const { accessToken } = useAuthStore.getState();
  if (accessToken && config.url) {
    if (!config.url.includes('login') && !config.url.includes('refresh')) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const url = error.config?.url ?? '';
      const {
        isAuthenticated,
        isRefreshTokenModalOpen,
        setRefreshTokenModalOpen,
        accessToken,
      } = useAuthStore.getState();

      const requestAuthHeader = error.config?.headers?.Authorization;
      const requestToken = typeof requestAuthHeader === 'string' ? requestAuthHeader.replace('Bearer ', '') : '';

      const isTokenExpiredMessage = error.response.data?.message?.toLowerCase().includes('expir');

      if (
        isAuthenticated &&
        !url.includes('refresh') &&
        !url.includes('login') &&
        !url.includes('logout') &&
        (isTokenExpiredMessage || error.response.status === 401)
      ) {
        if (requestToken && accessToken && requestToken !== accessToken) {
          if (error.config && !error.config._retry) {
            error.config._retry = true;
            error.config.headers = {
              ...error.config.headers,
              Authorization: `Bearer ${accessToken}`,
            };
            return apiClient(error.config);
          }
        } else if (!isRefreshTokenModalOpen) {
          setRefreshTokenModalOpen(true);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const get = async (url, config = {}) => {
  const response = await apiClient.get(url, config);
  return response.data;
};

export const post = async (url, payload, config = {}) => {
  const response = await apiClient.post(url, payload, config);
  return response.data;
};

export const patch = async (url, payload, config = {}) => {
  const response = await apiClient.patch(url, payload, config);
  return response.data;
};

export const put = async (url, payload, config = {}) => {
  const response = await apiClient.put(url, payload, config);
  return response.data;
};

export const del = async (url, config = {}) => {
  const response = await apiClient.delete(url, config);
  return response.data;
};

export default apiClient;
