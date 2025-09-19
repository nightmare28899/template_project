import {useNotificationService} from "@/service/NotificationService";
import {makePetitions} from "@/service/core/makePetitions";

const pickData = (res) => res?.data ?? res ?? {};

export const useLoginFunction = () => {
    const {showErrorMessage, showSuccessMessage} = useNotificationService();

    return async ({url, email, password, onSuccess}) => {
        try {
            // Este código comentado es la forma en que se usará, para realizar las peticiones de momento lo dejo así para poder avanzar entre vistas.
            // Cuando se ocupe solo descomenten y pasen la información real.

            //const res = await makePetitions.post(url, {email, password});
            //const data = pickData(res);

            // if (!data) {
            //     console.error("No se recibió data en la respuesta del login:", res);
            // }
            //
            // const {access_token, user} = data;

            // localStorage.setItem("token", access_token);
            // localStorage.setItem("user", JSON.stringify(user));
            showSuccessMessage("Inicio de sesión exitoso", "Bienvenido");
            onSuccess?.();
        } catch (err) {
            const apiMsg =
                err?.response?.data?.message ||
                err?.message ||
                "Por favor, verifica tus credenciales";
            showErrorMessage("Error de autenticación", apiMsg);
        }
    };
};

export const useLogout = () => {
    const {showErrorMessage, showSuccessMessage} = useNotificationService();

    return async () => {
        try {
            await makePetitions.post("logout", null);
            showSuccessMessage("Cerrando sesión…");

            localStorage.clear();
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } catch (error) {
            const msg = error?.response?.data?.message || "Error desconocido. Intenta nuevamente.";
            showErrorMessage(msg);
            localStorage.clear();
            window.location.href = "/";
        }
    };
};
