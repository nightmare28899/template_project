import React from "react";
import {useSearchParams} from "react-router-dom";
import {Form, Button, Image, Typography, Layout} from "antd";
import CustomInput from "@/components/inputs/CustomInput";
import {useFormRecoverPassword} from "@/hooks";
import logo from "@/assets/images/padron-beneficiarios.png";

const {Content} = Layout;
const {Title, Text, Paragraph} = Typography;

const FormRecoverPasswordView = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const {WINE, form, sendForm} = useFormRecoverPassword({
        token,
        email
    });

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
                            Cambio de Contraseña
                        </Title>
                        <Paragraph
                            type="secondary"
                            style={{
                                textAlign: "center",
                                marginTop: 20,
                                color: "rgba(255,255,255,.85)"
                            }}
                        >
                            La nueva contraseña debe tener al menos una letra mayúscula, una letra
                            minúscula, un número y un caracter especial ( #$!%*?&._ ).
                        </Paragraph>
                    </div>

                    <div style={{padding: "24px 28px 12px"}}>
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={sendForm}
                            requiredMark={false}
                        >
                            <CustomInput name="password" placeholder="Coloca tu contraseña"
                                         rules={[{required: true, message: "Ingresa tu contraseña"}]}/>
                            <CustomInput
                                name="password_confirmation" placeholder="Confirma tu contraseña" rules={[{
                                required: true, message: "Confirma tu contraseña"
                            }]}/>

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
                                    Enviar
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
    )
}

export default FormRecoverPasswordView;
