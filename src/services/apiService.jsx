import axios from 'axios';
import { showNoti } from '@/components/comunes/Alerts';
import { notification } from 'antd';
import { deleteCookie } from 'cookies-next';


const onLoginView = async() => {
    notification.destroy();
    localStorage.clear();
    deleteCookie('AUTH_TOKEN', {maxAge: -10});
    deleteCookie('role', {maxAge: -10});
    window.location = "/login";
}

export const instance = () => {
    const api = axios.create({
        baseURL: `${process.env.API_CONNECT}`,
        timeout: 100000,
        headers: {
            'Authorization': (typeof window !== 'undefined') ? `Bearer ${localStorage.getItem('AUTH_TOKEN')}` : '',
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        }
    })
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error?.code === "ERR_NETWORK") {
                showNoti('error','Error de Conexión','Revise su conexión a la red');
            }
            if (error?.code === "ECONNABORTED") {
                showNoti('error','Error en la petición','La petición hacia el servidor ha tardado demasiado, intente nuevamente');
            }

            // if (error?.response?.status === 400) {
            //     showNoti('error','Error en la petición','Contacte al administrador');
                
            // }
            
            if (error?.response?.status === 500) {
                showNoti('error','Error',error?.response?.data?.message);
            }
            if (error?.response?.status === 401 && error?.response?.data?.message === 'Unauthenticated') {
                showNoti('error','Sesión Expirada!','Inicie sesión nuevamente');
                onLoginView();
            }
            if(error?.response?.status === 422){
                console.log(error?.response?.data)
                
            }

            return Promise.reject(error)
        },
    )
    return api;
};


export default instance;
