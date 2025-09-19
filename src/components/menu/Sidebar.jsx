import React, {useState} from "react";
import {Drawer, Menu, Image} from "antd";
import {
    DownOutlined,
    UpOutlined,
    LoginOutlined,
} from "@ant-design/icons";
import useMenuStore from "@/store/menuStore";
import useMenuComponent, {getMenuItems} from "@/hooks/useMenuComponent";
import logo from "@/assets/images/padron-beneficiarios.png";

const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.["rol"];
    const {handleMenuClick} = useMenuComponent();
    const {collapsed, hideMenu} = useMenuStore();
    const [openKeys, setOpenKeys] = useState([]);
    const items = getMenuItems(role);
    const closeItem = [
        {
            key: '/logout',
            label: 'Cerrar sesión',
            icon: <LoginOutlined/>,
        },
    ];

    const closeSession = async (e) => {
        await handleMenuClick(e);
    };

    return (
        <Drawer
            title={
                <div style={styles.logoContainer || undefined}>
                    <Image
                        src={logo || undefined}
                        alt="logoMichoacan"
                        width={100}
                        preview={false}
                    />
                </div>
            }
            placement="left"
            closable={false}
            onClose={hideMenu}
            open={collapsed}
            width={270}
            styles={styles.drawer}
        >
            <Menu
                mode="inline"
                theme="light"
                items={items || []}
                onClick={(e) => {
                    hideMenu();
                    handleMenuClick(e).then();
                }}
                openKeys={openKeys}
                onOpenChange={setOpenKeys}
                expandIcon={({isOpen}) => (isOpen ? <UpOutlined/> : <DownOutlined/>)}
            />

            <div style={styles.logoutSection}>
                <Menu
                    mode="inline"
                    theme="light"
                    onClick={() => {
                        hideMenu();
                        closeSession({key: '/logout'}).then();
                    }}
                    style={styles.logoutItem}
                    items={closeItem || []}
                />
            </div>
        </Drawer>
    );
};

const styles = {
    logoContainer: {
        textAlign: 'center',
    },
    drawer: {
        body: {
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
    },
    menu: {
        borderTop: '1px solid #f0f0f0',
    },
    logoutSection: {
        marginTop: 'auto',
        alignItems: 'center',
        alignSelf: 'center',
    },
    logoutItem: {
        paddingLeft: '24px',
        paddingRight: '24px',
    },
    divider: {
        margin: 0,
    },
};

export default Sidebar;
