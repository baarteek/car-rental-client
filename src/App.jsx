import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './views/Home';
import Login from './views/Login';
import Registration from './views/Registration';
import HeaderComponents from './components/HeaderComponents';
import './App.css';
import { MenuProvider } from './context/MenuProvider';
import Booking from './views/Booking';
import Fleet from './views/Fleet';
import Reservation from './views/Reservation';
import AboutUs from './views/AboutUs';
import Contacts from './views/Contacts';
import FooterComponents from './components/FooterComponents';
import PaymentSuccess from './views/PaymentSuccess';
import PaymentFailure from './views/PaymentFailure';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthProvider'; 
import MyAccount from './views/MyAccount';

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <MenuProvider>
            <HeaderComponents />
            <Content>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/fleet" element={<Fleet />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/reserve/:vehicleId" element={<Reservation />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/payment-failure" element={<PaymentFailure />} />
                  <Route path="/account" element={<MyAccount />} />
                </Route>
              </Routes>
            </Content>
            <FooterComponents />
          </MenuProvider>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
