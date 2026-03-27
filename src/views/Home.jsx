import { Alert, Layout, List, Tag, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const dashboardItems = [
  {
    id: 1,
    title: 'Solicitudes pendientes',
    description: '3 expedientes están listos para validación documental.',
    status: 'Pendiente',
  },
  {
    id: 2,
    title: 'Usuarios activos',
    description: 'La plantilla actual cuenta con 18 accesos habilitados.',
    status: 'Actualizado',
  },
  {
    id: 3,
    title: 'Recordatorio operativo',
    description: 'Programa la renovación de credenciales antes del cierre mensual.',
    status: 'Aviso',
  },
];

const tagColors = {
  Pendiente: 'gold',
  Actualizado: 'green',
  Aviso: 'blue',
};

const Home = () => {
  const email = useAuthStore((state) => state.userEmail);

  const { data, isError, error } = useQuery({
    queryKey: ['dashboardItems'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return dashboardItems;
    },
  });

  return (
    <Content style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>Panel de control</Title>
      <Paragraph>
        Bienvenido, {email || 'Usuario'}. Esta vista protegida ya no depende de una API externa
        para mostrar el ejemplo de React Query.
      </Paragraph>

      <Title level={4}>Resumen operativo</Title>
      {isError && (
        <Alert message="Error al cargar los datos" description={error.message} type="error" showIcon />
      )}
      {!isError && (
        <List
          bordered
          dataSource={data || []}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
              <Tag color={tagColors[item.status] || 'default'}>{item.status}</Tag>
            </List.Item>
          )}
        />
      )}
    </Content>
  );
};

export default Home;
