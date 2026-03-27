import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import esES from 'antd/locale/es_ES';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './assets/styles/public-auth.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const customLocale = {
  ...esES,
  Pagination: {
    ...esES.Pagination,
    page: 'Página',
  },
};

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <FrownOutlined style={{ fontSize: 20 }} />
    <p>No se encontró información</p>
  </div>
);

const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#4A001F",
    colorSuccess: "#10B981",
    colorWarning: "#F59E0B",
    colorError: "#EF4444",
    colorTextBase: '#1f1f1f',
    controlItemBgHover: '#f0f0f0',
    controlItemBgActive: '#f8e6eb',
    borderRadius: 8,
    fontFamily: '"Gibson", "Segoe UI", sans-serif',
  },
  components: {
    Layout: {
      triggerBg: "#4a001f",
    },
    Menu: {
      subMenuItemSelectedColor: "#4a001f",
      itemSelectedBg: "#4a001f",
      itemSelectedColor: "#fff",
    },
    Table: {
      headerBg: "#4A001F",
      headerColor: "#FFFFFF",
      headerSortHoverBg: "#621132",
      headerSortActiveBg: "#3a0018",
    },
    Button: {
      colorPrimary: "#4A001F",
      colorPrimaryHover: "#4A001F",
    },
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      locale={customLocale}
      renderEmpty={customizeRenderEmpty}
      theme={themeConfig}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
);
