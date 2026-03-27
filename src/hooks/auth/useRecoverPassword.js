import {Form} from "antd";
import {makePetitions} from "@/service/core/makePetitions";
import {useNotificationService} from "@/service/NotificationService";
import useLoaderStore from "@/store/loaderStore";

const WINE = "#5B0B1B";

const useRecoverPassword = () => {
    const urlForgotPassword = "password/forgot";
    const [form] = Form.useForm();
    const {post} = makePetitions;
    const {showSuccessMessage, showErrorMessage} = useNotificationService();
    const {showLoader, hideLoader} = useLoaderStore();

    async function onFinish() {
        const values = await form.validateFields();
        showLoader();

        const body = {
            email: values.email,
        }

        try {
            await post(urlForgotPassword, body)
                .then(res => {
                    showSuccessMessage(res.message);
                })
            form.resetFields();
        } catch (error) {
            console.log(error);
            showErrorMessage(error.response.data.message);
        } finally {
            hideLoader();
        }
    }

    return {
        form,
        onFinish,
        WINE,
    }
}

export default useRecoverPassword;
