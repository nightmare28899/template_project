import React from "react";
import {
    Layout,
    Typography,
    Form,
    Button,
    Image,
} from "antd";
import {MailOutlined, LockOutlined} from "@ant-design/icons";
import CustomInput from "@/components/inputs/CustomInput";
import {useLogin} from "@/hooks";
import logo from "@/assets/images/padron-beneficiarios.png";

const {Content} = Layout;
const {Title, Text} = Typography;

const WINE = "#5B0B1B";

const LoginView = () => {

    const {form, sendForgetPassword, onFinish} = useLogin();

    return (
        <Layout style={{minHeight: "65vh"}}>
            <Content
                style={{
                    display: "grid",
                    placeItems: "center",
                    background: "#fff",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: 520,
                        borderRadius: 12,
                        boxShadow:
                            "0 8px 24px rgba(0,0,0,.06), 0 2px 8px rgba(0,0,0,.04)",
                        margin: 44,
                    }}
                >
                    <div style={{textAlign: "center", marginBottom: 24, marginTop: 40}}>
                        <Image
                            preview={false}
                            src={logo || undefined}
                            alt="Logo"
                            style={{maxWidth: "100%", height: "auto", maxHeight: 140}}
                        />
                    </div>
                    <div
                        style={{
                            background: WINE,
                            color: "#fff",
                            padding: "18px 20px",
                        }}
                    >
                        <Title level={4} style={{
                            color: "#fff", margin: 0,
                            textAlign: "center",
                        }}>
                            Bienvenido(a)
                        </Title>
                        <Text style={{color: "rgba(255,255,255,.85)"}}>
                            Padrón de beneficiarios, por favor, inicia sesión para poder acceder
                        </Text>
                    </div>

                    <div style={{padding: "24px 28px 12px"}}>
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={onFinish}
                            requiredMark={false}
                        >
                            <CustomInput
                                name="email"
                                rules={[{required: true, message: "Ingresa tu correo"}]}
                                prefix={<MailOutlined style={{color: "#8c8c8c"}}/>}
                                placeholder="usuario@correo.com"
                            />

                            <CustomInput
                                name="password"
                                rules={[{required: true, message: "Ingresa tu contraseña"}]}
                                prefix={<LockOutlined style={{color: "#8c8c8c"}}/>}
                                placeholder="********"
                            />

                            <div style={{textAlign: "center", marginBottom: 16}}>
                                <Button type="link" style={{padding: 0, color: "#4A001F"}} onClick={sendForgetPassword}>
                                    ¿Olvidaste tu contraseña?
                                </Button>
                            </div>

                            <div style={{textAlign: "center"}}>
                                <Button
                                    htmlType="submit"
                                    size="middle"
                                    block
                                    style={{
                                        background: WINE,
                                        color: "#fff",
                                        borderColor: WINE,
                                        height: 34,
                                        fontWeight: 600,
                                        letterSpacing: 0.5,
                                        width: "25%",
                                    }}
                                >
                                    ENTRAR
                                </Button>
                            </div>
                        </Form>

                        <div style={{textAlign: "center", marginTop: 24}}>
                            <Text type="secondary">#HonestidadyTrabajo</Text>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}

export default LoginView;
