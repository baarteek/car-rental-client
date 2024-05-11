import { Alert, Button, Checkbox, Divider, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMenu } from "../context/MenuProvider";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
    const navigate = useNavigate();
    const {setSelectedKey} = useMenu();
    const { login } = useAuth();
    const [error, setError] = useState('');

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate' , {
                email: values.email,
                password: values.password
            });
            login(response.data.token);
            console.log('Login successful', response.data);
            setError('');
            navigate('/');
        } catch (error) {   
            const errorMsg = error.response?.data?.message ||  "Login failed. Please check your credentials."
            setError(errorMsg);
        }
    }
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div className="mainContainer">
            <Form
                name="login"
                className="loginForm"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <div style={{fontSize: '42px', fontWeight: 'bold', textAlign: 'center', color: '#1890ff', marginBottom: '5%'}}>Log In</div>
                <Divider />
                <div>E-mail</div>
                <Form.Item name="email" rules={[{required: true, message: 'Please input your E-mail', type: 'email'}]}  >
                    <Input placeholder="user@email.com"/>
                </Form.Item> 
                <div>Password</div>
                <Form.Item name="password" rules={[{required: true, message: 'Please input your password'}]} >
                    <Input.Password placeholder="********" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox style={{marginTop: '1%'}}>Remember me</Checkbox>
                </Form.Item>
                { error && <Alert message={error} type="error" showIcon closable style={{marginTop: '3%'}} /> }
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%', marginTop: '8%', fontWeight: 'bold', fontSize: '15px'}}>
                        Log in
                    </Button>
                </Form.Item>
                <Divider style={{borderColor: '#333'}}>or</Divider>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <Link to="/registration" onClick={() => setSelectedKey('signup')} style={{fontWeight: 'bold', fontSize: '18px'}}>Create an account</Link>
                </div> 
            </Form>
        </div>
    )
};

export default Login;