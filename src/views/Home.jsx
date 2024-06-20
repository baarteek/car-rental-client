import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Card, Button } from 'antd';
import { CarOutlined, CheckCircleOutlined, ClockCircleOutlined, DollarCircleOutlined } from '@ant-design/icons';
import '../App.css';
import { useMenu } from '../context/MenuProvider';

const { Title, Paragraph } = Typography;

const Home = () => {
    const navigate = useNavigate();
    const { setSelectedKey } = useMenu()

    const handleBookingClick = () => {
        navigate('/booking');
        setSelectedKey('2');
    };

    return (
        <div className='mainContainer' style={{ padding: '5%', textAlign: 'center', backgroundColor: '#f0f2f5' }}>
            <div className='content-card' style={{ padding: '2%', borderRadius: '10px'}}>
                <Title level={1} style={{ fontSize: '48px', marginBottom: '20px' }}>
                    Welcome to Our Car Rental Service
                </Title>
                <Paragraph style={{ fontSize: '20px', marginBottom: '40px' }}>
                    We offer a wide range of vehicles to meet all your needs. Our mission is to provide you with the best car rental experience.
                </Paragraph>
                <Row gutter={[32, 32]} justify="center">
                    <Col xs={24} sm={12} md={8}>
                        <Card
                            hoverable
                            cover={<CarOutlined style={{ fontSize: '64px', margin: '20px auto', color: '#1890ff' }} />}
                        >
                            <Title level={3}>Wide Selection of Vehicles</Title>
                            <Paragraph>
                                We offer a variety of cars, from economy to luxury, to suit your needs and budget.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card
                            hoverable
                            cover={<CheckCircleOutlined style={{ fontSize: '64px', margin: '20px auto', color: '#52c41a' }} />}
                        >
                            <Title level={3}>Top Quality Service</Title>
                            <Paragraph>
                                Our vehicles are well-maintained and regularly serviced to ensure your safety and comfort.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card
                            hoverable
                            cover={<ClockCircleOutlined style={{ fontSize: '64px', margin: '20px auto', color: '#faad14' }} />}
                        >
                            <Title level={3}>24/7 Customer Support</Title>
                            <Paragraph>
                                We are here for you around the clock to assist with any inquiries or issues you may have.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card
                            hoverable
                            cover={<DollarCircleOutlined style={{ fontSize: '64px', margin: '20px auto', color: '#f5222d' }} />}
                        >
                            <Title level={3}>Competitive Prices</Title>
                            <Paragraph>
                                We offer the best prices in the market to ensure you get the most value for your money.
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>
                <div style={{ marginTop: '40px', padding: '2%', backgroundColor: '#1890ff', borderRadius: '10px' }}>
                    <Title level={2} style={{ color: '#ffffff' }}>
                        Ready to Book Your Vehicle?
                    </Title>
                    <Paragraph style={{ fontSize: '18px', color: '#ffffff', marginBottom: '20px' }}>
                        Click the button below to start your reservation process and enjoy our excellent service.
                    </Paragraph>
                    <Button type="primary" size="large" onClick={handleBookingClick} style={{ fontSize: '20px', padding: '10px 40px' }}>
                        Book a Vehicle Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
