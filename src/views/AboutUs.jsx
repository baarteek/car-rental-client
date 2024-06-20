import React from 'react';
import { Card, Row, Col, Typography, Layout } from 'antd';
import { FaUserTie, FaUserCog, FaUserShield, FaUserMd } from 'react-icons/fa';
import '../App.css';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const teamMembers = [
    {
        name: 'John Doe',
        position: 'CEO',
        description: 'John is the visionary behind our company, leading us towards unprecedented success.',
        icon: <FaUserTie size={64} style={{ color: '#ff4d4f' }} />  
    },
    {
        name: 'Jane Smith',
        position: 'CTO',
        description: 'Jane is the tech genius, constantly pushing the boundaries of innovation.',
        icon: <FaUserCog size={64} style={{ color: '#52c41a' }} />
    },
    {
        name: 'Mike Johnson',
        position: 'CFO',
        description: 'Mike ensures our financial stability and growth with his expertise.',
        icon: <FaUserShield size={64} style={{ color: '#1890ff' }} />  
    },
    {
        name: 'Emily Brown',
        position: 'COO',
        description: 'Emily manages our operations with efficiency and excellence.',
        icon: <FaUserMd size={64} style={{ color: '#faad14' }} /> 
    },
];

/**
 * Obiekt stylów dla komponentu AboutUs.
 * @type {Object}
 */
const styles = {
    iconContainer: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#f0f2f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5% auto'
    },
};

/**
 * Komponent AboutUs jest komponentem funkcyjnym Reacta, który renderuje stronę "O nas".
 * Zawiera informacje o firmie, jej misji, wartościach oraz członkach zespołu.
 *
 * @returns {JSX.Element} Renderowany komponent strony "O nas".
 */
const AboutUs = () => {
    return (
        <Layout className='mainContainer'>
            <Content style={{padding: '5%'}}>
                <Card bordered={false} className='content-card' style={{ maxWidth: 1000, margin: '0 auto', padding: '2%'}}>
                    <Title level={2} style={{ textAlign: 'center' }}>About Us</Title>
                    <Paragraph style={{ textAlign: 'center', marginBottom: '40px' }}>
                        We are a leading car rental company, offering a wide range of vehicles to meet every customer’s needs. Our mission is to provide top-notch services at the most competitive prices.
                    </Paragraph>
                    <Title level={3}>Our Mission</Title>
                    <Paragraph>
                        Our mission is to deliver unforgettable car rental experiences to our customers through our commitment to quality, innovation, and customer satisfaction.
                    </Paragraph>
                    <Title level={3}>Our Values</Title>
                    <Paragraph>
                        <ul>
                            <li><Text strong>Quality:</Text> We strive to deliver services of the highest standard.</li>
                            <li><Text strong>Innovation:</Text> We continuously introduce new solutions to enhance our customers' experiences.</li>
                            <li><Text strong>Customer Satisfaction:</Text> The customer is at the heart of everything we do.</li>
                            <li><Text strong>Trust:</Text> We build long-term relationships based on trust and integrity.</li>
                        </ul>
                    </Paragraph>
                    <Title level={3} style={{ textAlign: 'center', marginTop: '40px' }}>Our Team</Title>
                    <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                        {teamMembers.map((member, index) => (
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} key={index}>
                                <Card
                                    bordered={false}
                                    className='content-card'
                                    style={{ textAlign: 'center', padding: '3%' }}
                                    cover={<div style={styles.iconContainer}>{member.icon}</div>}
                                >
                                    <Title style={{padding: 0, margin: 0}} level={4}>{member.name}</Title>
                                    <Paragraph type="secondary">{member.position}</Paragraph>
                                    <Paragraph>{member.description}</Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card>
            </Content>
        </Layout>
    );
};

export default AboutUs;
