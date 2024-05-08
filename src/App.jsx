import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './views/Home';
import Login from './views/Login';
import Registration from './views/Registration';
import HeaderComponents from './components/HeaderComponents';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
          <HeaderComponents />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
