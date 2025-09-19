import React from 'react';
import {Layout, Menu} from 'antd';
import {LoginOutlined} from "@ant-design/icons";
import useMenuComponent, {getMenuItems} from "@/hooks/useMenuComponent";
import Sider from "antd/es/layout/Sider";

const MenuComponent = ({main}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.rol;
    const {handleMenuClick, collapsed, toggleCollapsed, currentPath} = useMenuComponent();
    const closeItem = [
        {
            key: '/logout',
            label: 'Cerrar sesión',
            icon: <LoginOutlined/>,
        },
    ];
    const items = getMenuItems();

    return (
        <Layout style={styles.layout}>
            <Sider
                breakpoint="lg"
                collapsible
                collapsed={collapsed}
                onCollapse={toggleCollapsed}
                width={256}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#fff',
                }}
            >
                <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <div style={{flex: 1, overflowY: 'auto'}}>
                        <Menu
                            defaultSelectedKeys={[currentPath]}
                            mode="inline"
                            theme="light"
                            inlineCollapsed={collapsed}
                            onClick={handleMenuClick}
                            className="container-menu"
                            items={items || []}
                        />
                    </div>

                    <div>
                        <Menu
                            theme="light"
                            mode="inline"
                            onClick={handleMenuClick}
                            items={closeItem || []}
                            selectable={false}
                        />
                    </div>
                </div>
            </Sider>

            <Layout>
                <div style={{flex: 1, overflowY: 'auto'}}>
                    {main.body}
                </div>
            </Layout>
        </Layout>
    );
};

const styles = {
    layout: {
        backgroundColor: '#fff',
    },
    logoutContainer: {
        padding: '16px',
        borderTop: '1px solid #f0f0f0',
    },
    logoutButton: {
        width: '100%',
    },
};

export default MenuComponent;
