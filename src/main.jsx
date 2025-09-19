import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {ConfigProvider, App as AntdApp} from "antd";
import {BrowserRouter} from "react-router-dom";
import App from "@/App";
import GifLoader from "@/components/GifLoader";
import {FrownOutlined} from "@ant-design/icons";

const theme = {
    token: {
        guinda: "#4A001F",
        purple: "#6A0F49",
        pink: "#FFC3D0",
        gray: "#f5f6f7",
        colorSuccess: "#10B981",
        colorWarning: "#F59E0B",
        colorError: "#EF4444",
    },
    components: {
        Layout: {
            triggerBg: "#4a001f",
        },
        Menu: {
            subMenuItemSelectedColor: "#4a001f",
            itemSelectedBg: "#4a001f",
            itemSelectedColor: "#fff",
        },
        Table: {
            headerBg: "#4A001F",
            headerColor: "#FFFFFF",
        },
        Button: {
            colorPrimary: "#4A001F",
            colorPrimaryHover: "#4A001F",
        },
    },
};

const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
        <FrownOutlined style={{ fontSize: 20 }} />
        <p>No se encontró información</p>
    </div>
);

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ConfigProvider locale="esEs" renderEmpty={customizeRenderEmpty || {}} theme={theme || {}}>
            <StrictMode>
                <AntdApp>
                    <GifLoader/>
                    <App/>
                </AntdApp>
            </StrictMode>
        </ConfigProvider>
    </BrowserRouter>
);
