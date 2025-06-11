import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider, App as AntdApp } from "antd";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import GifLoader from "@/components/GifLoader";

const theme = {
  // Colores globales
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
    // antd components theme customization
  },
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ConfigProvider locale="esEs" theme={theme}>
      <StrictMode>
        <AntdApp>
          <GifLoader />
          <App />
        </AntdApp>
      </StrictMode>
    </ConfigProvider>
  </BrowserRouter>
);
