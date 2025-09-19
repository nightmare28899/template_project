import {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {Grid, Card} from 'antd';
import MenuComponent from '@/components/menu/MenuComponent';
import Sidebar from '@/components/menu/Sidebar';
import Header from '@/components/auth/Header';
import '@/assets/styles/layout.css';

const {useBreakpoint} = Grid;

const Layout = () => {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Esta linea hay que descomentarla cuando ya se guarde el token
    // if (!token) {
    //     navigate('/login', {replace: true});
    //     return null;
    // }

    const elementMain = {
        body: (
            <main
                style={mainStyle}
            >
                <Card>
                    <Outlet/>
                </Card>
            </main>
        )
    }

    return (
        <div style={containerStyle}>
            <Header/>
            <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
                {!screens.md ? (
                    <>
                        <Sidebar/>
                        {elementMain.body}
                    </>
                ) : (
                    <MenuComponent main={elementMain} />
                )}
            </div>
        </div>
    );
};

const containerStyle = {display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#fff',}

const mainStyle = {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
}

export default Layout;
