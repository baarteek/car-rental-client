import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './views/Home';
import Login from './views/Login';
import Registration from './views/Registration';
import HeaderComponents from './components/HeaderComponents';
import './App.css';
import { MenuProvider } from './context/MenuProvider';

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
      <MenuProvider>
          <HeaderComponents />
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          </Content>
        </MenuProvider>
      </Layout>
    </Router>
  );
}

export default App;
