import { App as AntdApp, Layout } from 'antd';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import GlobalLoader from './components/GlobalLoader';
import RefreshTokenModal from './components/RefreshTokenModal';
import AppRoutes from './routes/AppRoutes';
import useLoaderStore from './store/loaderStore';

const { Content } = Layout;

const App = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isManualLoading = useLoaderStore((state) => state.isLoading);
  const isLoadingGlobally = isManualLoading || isFetching > 0 || isMutating > 0;

  return (
    <AntdApp>
      <Layout className="page-shell" style={{ minHeight: '100vh' }}>
        <GlobalLoader loading={isLoadingGlobally} />

        <RefreshTokenModal />

        <Content className="main-content">
          <AppRoutes />
        </Content>
      </Layout>
    </AntdApp>
  );
};

export default App;
