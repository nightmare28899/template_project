import React, {lazy, Suspense} from "react";
import {App as AntdApp} from "antd";
import "@ant-design/v5-patch-for-react-19";
import {Routes, Route, Navigate} from "react-router-dom";
import {NotificationContext} from "@/context/NotificationContext";
import GifLoader from "@/components/GifLoader";
import LayoutAuth from "@/components/layouts/LayoutAuth";
import LayoutBase from "@/components/layouts/LayoutBase";

const LoginView = lazy(() => import('@/views/auth/LoginView'));
const RegisterView = lazy(() => import('@/views/auth/RegisterView'));
const RecoverPassworView = lazy(() => import('@/views/auth/RecoverPasswordView'));
const FormRecoverPassword = lazy(() => import('@/views/auth/FormRecoverPasswordView'));
const HomeView = lazy(() => import('@/views/HomeView'));
const UsersView = lazy(() => import('@/views/users(example)/UsersView'));

function App() {
    const {notification} = AntdApp.useApp();

    return (
        <NotificationContext.Provider value={notification}>
            <Suspense fallback={<GifLoader showStatus={false}/>}>
                <Routes>
                    <Route path="/" element={<LayoutAuth/>}>
                        <Route index element={<LoginView/>} />
                        <Route path="recuperar-contrasena" element={<RecoverPassworView/>}/>
                        <Route path="reset-password" element={<FormRecoverPassword/>}/>
                        <Route path="registro" element={<RegisterView/>}/>
                    </Route>
                    <Route element={<LayoutBase/>}>
                        <Route path="inicio" element={<HomeView/>}/>
                        <Route path="usuarios" element={<UsersView/>}/>
                    </Route>
                    <Route path="*" element={<Navigate to="/login" replace/>}/>
                </Routes>
            </Suspense>
        </NotificationContext.Provider>
    );
}

export default App;
