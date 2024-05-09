import { Menu, Layout, Affix } from "antd";
import { Link } from "react-router-dom";
import { useMenu } from "../context/MenuProvider";

const { Header } = Layout;

const HeaderComponents = () => {
    const {selectedKey, setSelectedKey} = useMenu();

    return (
        <Affix offsetTop={0}>
            <Header>
                <Menu theme="light" mode="horizontal" selectedKeys={[selectedKey]} style={styles.fullWidthMenu}>
                    <div style={styles.logo}><Link to="/">Car Rental</Link></div>
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
                    <Menu.Item key="6" style={styles.menuRight} onClick={() => setSelectedKey('6')}>
                        <Link to="/login">Log In</Link>
                    </Menu.Item>
                    <Menu.Item key="7" onClick={() => setSelectedKey('7')}>
                        <Link to="/registration">Sign Up</Link>
                    </Menu.Item>
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
