import { Button, Checkbox, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useMenu } from "../context/MenuProvider";

const Registration = () => {
    const {setSelectedKey} = useMenu();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div className="mainContainer">
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
                <Form.Item name="repeatedPassword" rules={[{required: true, message: 'Please repeat your password'}]} >
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