import {useNotification} from '@/context/NotificationContext';

export const useNotificationService = () => {
    const notification = useNotification();

    const showErrorMessage = (content, title = "Error") => {
        notification.error({
            message: title,
            description: content,
            duration: 2.5,
            placement: "bottomRight",
        });
    };

    const showSuccessMessage = (content, title = "Éxito") => {
        notification.success({
            message: title,
            description: content,
            duration: 2.5,
            placement: "bottomRight",
        });
    };

    const showWarningMessage = (content, title = "Advertencia") => {
        notification.warning({
            message: title,
            description: content,
            duration: 2.5,
            placement: "bottomRight",
        });
    };

    return {showErrorMessage, showSuccessMessage, showWarningMessage};
};
