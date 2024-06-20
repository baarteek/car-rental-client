import { Alert, Button, Checkbox, Divider, Form, Input, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMenu } from "../context/MenuProvider";
import { useState } from "react";
import axios from "axios";
import { UserAddOutlined } from "@ant-design/icons";
import '../App.css';

/**
 * Komponent Registration jest komponentem funkcyjnym Reacta, który renderuje stronę rejestracji.
 * Umożliwia użytkownikom rejestrację poprzez podanie adresu e-mail, hasła i potwierdzenie hasła.
 *
 * @returns {JSX.Element} Renderowany komponent strony rejestracji.
 */
const Registration = () => {
    const navigate = useNavigate();
    const {setSelectedKey} = useMenu();
    const [error, setError] = useState('');

        /**
     * Wyświetla modal z potwierdzeniem sukcesu rejestracji.
     */
    const showSuccessModal = () => {
        Modal.confirm({
            title: 'Registration Successful',
            content: 'Your account has been created successfully! Click OK to log in.',
            okCancel: false,
            icon: <UserAddOutlined style={{color: 'green'}}/>,
            onOk() {
                setSelectedKey('login');
                navigate('/login');
            }
        });
    };

    /**
     * Obsługuje pomyślne zakończenie formularza rejestracji.
     * Wysyła dane rejestracyjne do API i wyświetla modal potwierdzenia po pomyślnym utworzeniu konta.
     *
     * @param {Object} values - Wartości formularza rejestracji.
     */
    const onFinish = async (values) => {
        try {
            const resonse = await axios.post("http://localhost:8080/api/v1/auth/register", {
                email: values.email,
                password: values.password
            });
            console.log("Sign up successful ", resonse.data);
            setError('');
            showSuccessModal();
        } catch(error) {
            const errorMsg = error.response?.data?.message || "Sign up failed.";
            setError(errorMsg);
        }
    };
    
    /**
     * Obsługuje niepowodzenie formularza rejestracji.
     *
     * @param {Object} errorInfo - Informacje o błędzie formularza.
     */
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-container">
            <Form
                name="registration"
                className="loginForm"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <div style={{fontSize: '42px', fontWeight: 'bold', textAlign: 'center', color: '#1890ff', marginBottom: '5%'}}>Sign Up</div>
                <Divider />
                <div>E-mail</div>
                <Form.Item name="email" rules={[{required: true, message: 'Please input your E-mail', type: 'email'}]}  >
                    <Input placeholder="user@email.com"/>
                </Form.Item> 
                <div>Password</div>
                <Form.Item name="password" rules={[{required: true, message: 'Please input your password'}]} >
                    <Input.Password placeholder="********" />
                </Form.Item>
                <div>Repeat password</div>
                <Form.Item
                    name="repeatedPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="********" />
                </Form.Item>
                <Form.Item
                    name="agreeToTerms"
                    valuePropName="checked"
                    rules={[
                        { 
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('You must accept the terms and conditions!'))
                        }
                    ]}
                >
                    <Checkbox>
                        I accept the <a href="/terms-and-conditions">terms and conditions</a>.
                    </Checkbox>
                </Form.Item>
                { error && <Alert message={error} type="error" showIcon closable style={{ marginBottom: '3%'}} /> }
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%', marginTop: '1%', fontWeight: 'bold', fontSize: '15px'}}>
                        Sign Up
                    </Button>
                </Form.Item>
                <Divider style={{borderColor: '#333'}}>or</Divider>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <Link to="/login" onClick={() => setSelectedKey('6')} style={{fontWeight: 'bold', fontSize: '18px'}}>Log In</Link>
                </div> 
            </Form>
        </div>
    )
};

export default Registration;
