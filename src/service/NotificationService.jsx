import {Typography, Button} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {useNotification} from '@/context/NotificationContext';

const {Text} = Typography;

export const useNotificationService = () => {
    const notification = useNotification();

    const showErrorMessage = (content, title = "Error", duration = 2.5, placement = "bottomRight") => {
        notification.destroy();

        notification.error({
            message: title,
            description: content,
            duration: duration,
            placement: placement,
        });
    };

    const showSuccessMessage = (content, title = "Éxito", duration = 2.5, placement = "bottomRight") => {
        notification.destroy();

        notification.success({
            message: title,
            description: content,
            duration: duration,
            placement: placement,
        });
    };

    const showWarningMessage = (content, title = "Advertencia", duration = 2.5, placement = "bottomRight") => {
        notification.destroy();

        notification.warning({
            message: title,
            description: content,
            duration: duration,
            placement: placement,
        });
    };

    const showPasswordMessage = (title = "", content, duration = 2.5, placement = "bottomRight", password = "") => {
        notification.destroy();

        notification.success({
            message: title,
            description: (
                <div>
                    <p>{content}</p>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: 8,
                            gap: 8,
                        }}
                    >
                        <Text code
                              copyable={{
                                  text: password,
                                  onCopy: () => showCopySuccess()
                              }}
                        >
                            {password}
                        </Text>
                        <Button
                            type="link"
                            size="small"
                            icon={<CopyOutlined/>}
                            onClick={() => {
                                navigator.clipboard.writeText(password).then();
                                showCopySuccess()
                            }}
                        >
                            Copiar
                        </Button>
                    </div>
                </div>
            ),
            duration,
            placement,
        });
    };

    const showCopySuccess = () => {
        notification.success({
            message: "¡Copiado!",
            description: "La contraseña se copió al portapapeles",
            placement: "bottomRight",
            duration: 2,
        });
    };

    return {showErrorMessage, showSuccessMessage, showWarningMessage, showPasswordMessage};
};
