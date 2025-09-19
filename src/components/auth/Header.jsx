import React, {useMemo} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Layout, Row, Col, Typography, Image, Button, Grid} from "antd";
import {ArrowLeftOutlined, MenuOutlined} from "@ant-design/icons";
import logo from "@/assets/images/padron-beneficiarios.png";
import logoAnniversary from "@/assets/images/Recurso 3@4x.png";
import Container from "@/components/Container";
import useMenuStore from "@/store/menuStore";
import {useFetch} from "@/hooks";

const {useBreakpoint} = Grid;
const {Header: AntHeader} = Layout;

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {toggleCollapsed} = useMenuStore();
    const conditionShowMenu = location.pathname !== "/login" && location.pathname !== "/home";
    const hideLoginButton = location.pathname === "/home";
    const screens = useBreakpoint();
    const urlCheckToken = "me";
    const {
        data: responseUser
    } = useFetch(urlCheckToken, {});

    const padding = useMemo(
        () => (screens.xs ? "10px 15px" : "10px 40px"),
        [screens.xs]
    );

    return (
        <AntHeader
            style={{...styles.antHeaderStyle, padding}}
        >
            <Container>
                <Row
                    align="middle"
                    wrap={false}
                    style={{
                        width: "100%",
                        flexWrap: screens.xs ? "wrap" : "nowrap",
                    }}
                >
                    <Col
                        flex="none"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        {conditionShowMenu && !screens.md && (
                            <Button
                                type="text"
                                onClick={toggleCollapsed}
                                icon={<MenuOutlined style={{fontSize: 20}}/>}
                            />
                        )}

                        <Image
                            src={logo || undefined}
                            alt="logoMichoacan"
                            height={60}
                            preview={false}
                            onClick={() => navigate("/")}
                            style={{maxWidth: 60, cursor: "pointer"}}
                        />

                        {
                            screens.sm && (
                                <Typography.Text
                                    style={{
                                        ...styles.textLogoStyle,
                                        fontSize: screens.xs ? 16 : 20,
                                    }}
                                >
                                    Padrón de beneficiarios
                                </Typography.Text>
                            )
                        }
                    </Col>

                    <Col
                        flex="auto"
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: 16,
                        }}
                    >
                        <Image
                            src={logoAnniversary || undefined}
                            alt="logo aniversario"
                            preview={false}
                            style={{
                                ...styles.imageStyle,
                                maxWidth: screens.xs ? "100px" : "150px",
                            }}
                        />

                        {hideLoginButton && (
                            <>
                                <NavLink to="/login" end style={{whiteSpace: "nowrap", paddingLeft: 26}}>
                                    {
                                        responseUser ? "Entrar" : "Iniciar sesión"
                                    }
                                </NavLink>

                                <NavLink to="/registro" end style={{whiteSpace: "nowrap", paddingLeft: 26}}>
                                    Generar solicitud
                                </NavLink>
                            </>
                        )}

                    </Col>
                </Row>
            </Container>
        </AntHeader>
    );
};

const styles = {
    antHeaderStyle: {
        backgroundColor: "white",
        borderBottom: "4px solid #FFC3D0",
    },
    colStyle: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: 12,
    },
    textLogoStyle: {
        fontWeight: 500,
        color: "#4A001F",
        marginLeft: 10,
        whiteSpace: "nowrap",
        paddingTop: 6,
    },
    imageStyle: {
        height: 50,
        width: "100%",
        objectFit: "contain",
    }
}

export default Header;
