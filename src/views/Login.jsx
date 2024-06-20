import React, { useState } from 'react';
import { Alert, Button, Checkbox, Divider, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useMenu } from '../context/MenuProvider';
import { useAuth } from '../context/AuthProvider';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import '../App.css';

/**
 * Komponent Login jest komponentem funkcyjnym Reacta, który renderuje stronę logowania.
 * Umożliwia użytkownikom logowanie się za pomocą adresu e-mail, hasła lub konta Google.
 *
 * @returns {JSX.Element} Renderowany komponent strony logowania.
 */
const Login = () => {
    const navigate = useNavigate();
    const { setSelectedKey } = useMenu();
    const { login } = useAuth();
    const [error, setError] = useState('');

    /**
     * Obsługuje pomyślne zakończenie formularza logowania.
     * Wysyła dane logowania do API i loguje użytkownika po otrzymaniu odpowiedzi.
     *
     * @param {Object} values - Wartości formularza logowania.
     */
    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
                email: values.email,
                password: values.password,
            });
            login(response.data.token, response.data.userId); 
            console.log('Login successful', response.data);
            setError('');
            navigate('/');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(errorMsg);
        }
    };


    /**
     * Obsługuje niepowodzenie formularza logowania.
     *
     * @param {Object} errorInfo - Informacje o błędzie formularza.
     */
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

     /**
     * Obsługuje pomyślne logowanie za pomocą konta Google.
     * Wysyła token Google do API i loguje użytkownika po otrzymaniu odpowiedzi.
     *
     * @param {Object} credentialResponse - Odpowiedź z tokenem Google.
     */
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/google', {
                token: credentialResponse.credential,
            });
            login(response.data.token, response.data.userId); 
            console.log('Google login successful:', response.data);
            setError('');
            navigate('/');
        } catch (error) {
            console.error('Google login failed:', error);
            setError('Google login failed. Please try again.');
        }
    };
    

     /**
     * Obsługuje niepowodzenie logowania za pomocą konta Google.
     *
     * @param {Object} error - Informacje o błędzie logowania Google.
     */
    const handleGoogleLoginFailure = (error) => {
        console.error('Google login failed:', error);
        setError('Google login failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId='397639903179-pjtd5jcqghmi0624a3n3ulegor5lv294.apps.googleusercontent.com' >
            <div className="login-container">
                <Form
                    name="login"
                    className="loginForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <div style={{ fontSize: '42px', fontWeight: 'bold', textAlign: 'center', color: '#1890ff', marginBottom: '5%' }}>Log In</div>
                    <Divider />
                    <div>E-mail</div>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your E-mail', type: 'email' }]}>
                        <Input placeholder="user@email.com" />
                    </Form.Item>
                    <div>Password</div>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password' }]}>
                        <Input.Password placeholder="********" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox style={{ marginTop: '1%' }}>Remember me</Checkbox>
                    </Form.Item>
                    {error && <Alert message={error} type="error" showIcon closable style={{ marginTop: '3%' }} />}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%', marginTop: '8%', fontWeight: 'bold', fontSize: '15px' }}>
                            Log in
                        </Button>
                    </Form.Item>
                    <Divider style={{ borderColor: '#333' }}>or</Divider>
                    <div style={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Link to="/registration" onClick={() => setSelectedKey('7')} style={{ fontWeight: 'bold', fontSize: '18px' }}>Create an account</Link>
                    </div>
                </Form>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
