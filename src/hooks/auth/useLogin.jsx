import {Form} from "antd";
import {useNavigate} from "react-router-dom";
import loaderStore from "@/store/loaderStore";
import {useLoginFunction} from "@/service/core/authService";

const useLogin = () => {
    const urlAuth = "login";
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const {showLoader, hideLoader} = loaderStore();
    const login = useLoginFunction();

    const sendForgetPassword = () => {
        navigate("/recuperar-contrasena");
    }

    async function onFinish(values) {
        showLoader();
        try {
            await login({
                url: urlAuth,
                email: values.email,
                password: values.password,
                onSuccess: () => navigate("/inicio"),
            });
            form.resetFields();
        } finally {
            hideLoader();
        }
    };

    return {form, sendForgetPassword, onFinish};
};

export default useLogin;
