import {useEffect} from "react";
import {Form} from "antd";
import useLoaderStore from "@/store/loaderStore";
import {makePetitions} from "@/service/core/makePetitions";
import {useNotificationService} from "@/service/NotificationService";

const WINE = "#5B0B1B";

const useFormRecoverPassword = ({token, email}) => {
    const urlChangePassword = "password/reset";
    const [form] = Form.useForm();
    const {showLoader, hideLoader} = useLoaderStore();
    const {showSuccessMessage, showErrorMessage} = useNotificationService();
    const {post} = makePetitions;

    useEffect(() => {
        if (token === null || email === null) {
            window.location.href = '/login';
        }
    }, [email, token]);

    async function sendForm () {
        const values = form.getFieldsValue();
        showLoader();

        const body = {
            email,
            token,
            password: values.password,
            password_confirmation: values.password_confirmation,
        }

        if (values.password !== values.password_confirmation) {
            showErrorMessage("Las contraseñas deben ser iguales");
            hideLoader();
            return;
        }

        try {
            await post(urlChangePassword, body)
                .then(res => {
                    showSuccessMessage(res.message);
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 1500);
                })
            form.resetFields();
        }  catch (error) {
            console.log(error);
            showErrorMessage(error.response.data.message);
        } finally {
            hideLoader();
        }
    }

    return {
        WINE,
        form,
        sendForm,
    }
}

export default useFormRecoverPassword;
