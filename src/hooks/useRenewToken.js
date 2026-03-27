import {notification} from "antd";
import {makePetitions} from "@/service/core/makePetitions";
import useLoaderStore from "@/store/loaderStore";

export const renewToken = async () => {
    const {post} = makePetitions;
    const {showLoader, hideLoader} = useLoaderStore.getState();

    const currentToken = localStorage.getItem("token");

    if (!currentToken) {
        console.warn("No refresh token available");
        return;
    }

    showLoader();

    try {
        const url = "refresh";
        const res = await post(url, null);

        const {access_token} = res;
        localStorage.setItem("token", access_token);

        return window.location.reload();
    } catch (error) {
        const {data} = error.response || {};
        const errorMessage = data?.message || "Error al renovar el token";

        console.error("Error renovando token:", errorMessage);

        notification.destroy();
        notification.error({
            message: "Error",
            description: errorMessage,
            duration: 3,
            placement: "bottomRight",
        });

        hideLoader();
        clearAuthDataAndRedirect();
    }
};

function clearAuthDataAndRedirect() {
    localStorage.clear();
    window.location.href = "/login";
}
