import { Menu, Layout, Affix, Modal } from "antd";
import { Link } from "react-router-dom";
import { useMenu } from "../context/MenuProvider";
import { useAuth } from "../context/AuthProvider";
import { LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { confirm } = Modal;

const HeaderComponents = () => {
    const {selectedKey, setSelectedKey} = useMenu();
    const { isLoggedIn, logout } = useAuth();

    const showConfirm = () => {
        confirm({
            title: 'Are you sure you want to log out?',
            icon: <LogoutOutlined style={{color: 'red'}} />,
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
                    <Menu.Item key="home" onClick={() => setSelectedKey('1')}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="booking" onClick={() => setSelectedKey('2')}>
                        <Link to="/">Booking</Link>
                    </Menu.Item>
                    <Menu.Item key="fleet" onClick={() => setSelectedKey('3')}>
                        <Link to="/">Fleet</Link>
                    </Menu.Item>
                    <Menu.Item key="contact" onClick={() => setSelectedKey('4')}>
                        <Link to="/">Contact</Link>
                    </Menu.Item>
                    <Menu.Item key="about" onClick={() => setSelectedKey('5')}>
                        <Link to="/">About Us</Link>
                    </Menu.Item>
                    {
                        isLoggedIn ? (
                            <>
                            <Menu.Item key="myAccount" style={styles.menuRight} onClick={() => setSelectedKey('8')}>
                                <Link to="/">My Account</Link>
                            </Menu.Item>
                            <Menu.Item key="logout" onClick={showConfirm}>
                                <Link to="/" style={{color: 'red', fontWeight: '500'}}>Log Out</Link>
                                <LogoutOutlined style={{color: 'red', marginLeft: '10%', fontSize: '15px'}} />
                            </Menu.Item>
                            </>
                        ) : (
                            <>
                            <Menu.Item key="login" style={styles.menuRight} onClick={() => setSelectedKey('6')}>
                                <Link to="/login">Log In</Link>
                            </Menu.Item>
                            <Menu.Item key="signup" onClick={() => setSelectedKey('7')}>
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
