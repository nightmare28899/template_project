import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ConfigProvider, App as AntdApp} from 'antd'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import GifLoader from "@/components/GifLoader";

const theme = {
    components: {
        // antd components theme customization
    },
}

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ConfigProvider locale="esEs" theme={theme}>
            <StrictMode>
                <AntdApp>
                    <GifLoader/>
                    <App/>
                </AntdApp>
            </StrictMode>
        </ConfigProvider>
    </BrowserRouter>
)
