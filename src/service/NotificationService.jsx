import { App, message, notification } from 'antd';
import { Typography } from 'antd';
import { useCallback } from 'react';

const { Text } = Typography;

const normalizeContent = (content, fallback) => {
  if (Array.isArray(content)) {
    return content.join(', ');
  }

  if (typeof content === 'string') {
    return content;
  }

  if (content && typeof content === 'object') {
    return content.message || fallback;
  }

  return fallback;
};

export const useNotificationService = () => {
  const antdApp = App.useApp();
  const messageApi = antdApp?.message || message;
  const notificationApi = antdApp?.notification || notification;

  const showSuccessMessage = useCallback(
    (content, duration = 3) => {
      messageApi.success({
        content: normalizeContent(content, 'Operación realizada con éxito.'),
        duration,
      });
    },
    [messageApi]
  );

  const showErrorMessage = useCallback(
    (content, error) => {
      const fallback = error?.message || 'Ocurrió un error inesperado.';

      messageApi.error({
        content: normalizeContent(content, fallback),
      });
    },
    [messageApi]
  );

  const showPasswordMessage = useCallback(
    (
      title,
      description,
      duration = 0,
      placement = 'topRight',
      password = ''
    ) => {
      notificationApi.open({
        message: title,
        description: (
          <div>
            <div>{description}</div>
            {password ? (
              <Text copyable code style={{ marginTop: 8, display: 'inline-block' }}>
                {password}
              </Text>
            ) : null}
          </div>
        ),
        duration,
        placement,
      });
    },
    [notificationApi]
  );

  return {
    showSuccessMessage,
    showErrorMessage,
    showPasswordMessage,
  };
};
