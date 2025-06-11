import React, { Suspense } from "react";
import { App as AntdApp } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { Routes, Route, Navigate } from "react-router-dom";
import { NotificationContext } from "@/context/NotificationContext";
// import example with lazy loading
//const LoginView = lazy(() => import('@/views/auth/LoginView'));

function App() {
  const { notification } = AntdApp.useApp();

  return (
    <NotificationContext.Provider value={notification}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Example route code */}
          {/*<Route path="/" element={<LayoutBase/>}>*/}
          {/*  <Route index element={<Navigate to="/login" replace/>}/>*/}
          {/*  <Route path="login" element={<LoginView/>}/>*/}
          {/*  <Route path="/recuperar-contrasena" element={<RecoverPasswordView/>}/>*/}
          {/*</Route>*/}
        </Routes>
      </Suspense>
    </NotificationContext.Provider>
  );
}

export default App;
