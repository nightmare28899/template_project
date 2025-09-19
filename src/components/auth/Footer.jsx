import React from 'react';
import {Row, Col, Typography, Space, Image, Button, Layout} from 'antd';
import {FacebookFilled, InstagramFilled, XOutlined} from '@ant-design/icons';
import logoGobiernoDigital from '@/assets/images/logo-gobierno-digital.png';
import logoTeleferico from '@/assets/images/Recurso 3@4x.png';

const {Footer: AntFooter} = Layout;

const Footer = () => {
    return (
        <>
            <AntFooter style={styles.footer}>
                <Row style={styles.row}>
                    <Col style={styles.col}>
                        <Space>
                            <Image
                                src={logoTeleferico || undefined}
                                alt="logo Teleferico"
                                preview={false}
                                height={60}
                                style={styles.telefericoLogo}
                            />
                            <Image
                                src={logoGobiernoDigital || undefined}
                                alt="logo Gobierno Digital"
                                preview={false}
                                height={70}
                                style={styles.gobiernoLogo}
                            />
                        </Space>
                        <Space direction="vertical" align="center" style={styles.verticalSpace}>
                            <Space>
                                <Button
                                    type="link"
                                    icon={<FacebookFilled style={styles.icon}/>}
                                    onClick={() => window.open('https://www.facebook.com/gobmichoacan/', '_blank')}
                                />
                                <Button
                                    type="link"
                                    icon={<InstagramFilled style={styles.icon}/>}
                                    onClick={() => window.open('https://www.instagram.com/gobmichoacan/?hl=es', '_blank')}
                                />
                                <Button
                                    type="link"
                                    icon={<XOutlined style={styles.icon}/>}
                                    onClick={() => window.open('https://twitter.com/GobMichoacan', '_blank')}
                                />
                            </Space>
                            <Typography.Text type="secondary" style={styles.enlacesText}>
                                Enlaces de comunicación
                            </Typography.Text>
                        </Space>
                        <Typography.Text type="secondary" style={styles.hashtagText}>
                            #HonestidadyTrabajo
                        </Typography.Text>
                    </Col>
                </Row>
            </AntFooter>
            <div className="backgrounPlaca w-100"></div>
        </>
    );
}

const styles = {
    footer: {
        backgroundColor: 'white',
        borderTop: '4px solid #FFC3D0',
        padding: '24px 40px',
        zIndex: 1,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
    },
    col: {
        display: 'flex',
        alignItems: 'center',
    },
    telefericoLogo: {
        paddingLeft: 20,
        marginRight: 20,
    },
    gobiernoLogo: {
        paddingLeft: 20,
    },
    verticalSpace: {
        paddingLeft: 40,
    },
    icon: {
        color: 'gray',
        fontSize: 20,
    },
    enlacesText: {
        marginTop: 8,
    },
    hashtagText: {
        marginLeft: 20,
    },
};

export default Footer;
