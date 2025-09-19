import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    HomeOutlined, UserOutlined
} from "@ant-design/icons";
import useMenuStore from "@/store/menuStore";
import loaderStore from "@/store/loaderStore";
import {useLogout} from "@/service/core/authService";

export const getMenuItems = () => [
    {
        key: '/inicio',
        icon: <HomeOutlined/>,
        label: 'Inicio',
    },
    {
        key: '/usuarios',
        label: 'Usuarios',
        icon: <UserOutlined/>,
    },
];

const useMenuComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const {collapsed, toggleCollapsed} = useMenuStore();
    const {showLoader, hideLoader} = loaderStore();
    const logout = useLogout();

    async function handleMenuClick(e) {
        showLoader();

        try {
            if (e.key === '/logout') {
                return await logout();
            }

            navigate(e.key);
        } catch (error) {
            console.error("Error en el manejo del menú:", error);
        } finally {
            hideLoader();
        }
    }

    return {
        handleMenuClick,
        collapsed,
        toggleCollapsed,
        currentPath
    }
}

export default useMenuComponent;
