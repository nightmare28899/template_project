import {notification} from "antd";

export const InvalidToken = error => {
    notification.destroy();
    notification.success({
        message: "Error",
        description: `${error}, redirigiendo al login`,
        duration: 3,
        placement: "bottomRight",
    });
    setTimeout(() => {
        localStorage.clear();
        window.location.href = '/login';
    }, 1500)
}
