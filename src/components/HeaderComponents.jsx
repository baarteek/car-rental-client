import { Menu, Layout, Affix, Modal } from "antd";
import { Link } from "react-router-dom";
import { useMenu } from "../context/MenuProvider";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { ExclamationCircleOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { confirm } = Modal;

const HeaderComponents = () => {
    const {selectedKey, setSelectedKey} = useMenu();
    const { isLoggedIn, logout } = useAuth();

    const showConfirm = () => {
        confirm({
            title: 'Are you sure you want to log out?',
            icon: <ExclamationCircleOutlined />,
            content: 'Click OK to log out or Cancel to stay logged in.',
            onOk() {
                logout();
                setSelectedKey('1');
            }
        });
    };

    return (
        <Affix offsetTop={0}>
            <Header>
                <Menu theme="light" mode="horizontal" selectedKeys={[selectedKey]} style={styles.fullWidthMenu}>
                    <div style={styles.logo}><Link to="/" onClick={() => setSelectedKey('1')}>Car Rental</Link></div>
                    <Menu.Item key="1" onClick={() => setSelectedKey('1')}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => setSelectedKey('2')}>
                        <Link to="/">Booking</Link>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => setSelectedKey('3')}>
                        <Link to="/">Fleet</Link>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => setSelectedKey('4')}>
                        <Link to="/">FAQ</Link>
                    </Menu.Item>
                    <Menu.Item key="5" onClick={() => setSelectedKey('5')}>
                        <Link to="/">About</Link>
                    </Menu.Item>
                    {
                        isLoggedIn ? (
                            <>
                            <Menu.Item key="8" style={styles.menuRight} onClick={() => setSelectedKey('8')}>
                                <Link to="/">My Account</Link>
                            </Menu.Item>
                            <Menu.Item key="9" onClick={showConfirm}>
                                <Link to="/" style={{color: 'red', fontWeight: '500'}}>Log Out</Link>
                                <LogoutOutlined style={{color: 'red', marginLeft: '10%', fontSize: '15px'}} />
                            </Menu.Item>
                            </>
                        ) : (
                            <>
                            <Menu.Item key="6" style={styles.menuRight} onClick={() => setSelectedKey('6')}>
                                <Link to="/login">Log In</Link>
                            </Menu.Item>
                            <Menu.Item key="7" onClick={() => setSelectedKey('7')}>
                                <Link to="/registration">Sign Up</Link>
                            </Menu.Item>
                            </>
                        )
                    }
                </Menu>
            </Header>
        </Affix>
    );
};

const styles = {
    fullWidthMenu: {
        display: 'flex',
        justifyContent: 'space-between',
        aliginItems: 'center',
        width: '100%',
    },
    menuRight: {
        marginLeft: 'auto' 
    },
    logo: {
        marginRight: '5%',
        fontWeight: 'bold', 
        fontSize: '32px',
    },
}

export default HeaderComponents;
