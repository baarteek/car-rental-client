import React from 'react';
import { Typography, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="mainContainer" style={{padding: '15%', textAlign: 'center'}}>
            <Card bordered={true} className="content-card" style={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
                <Title level={2}>Payment Successful</Title>
                <Paragraph>
                    Thank you for your payment. Your reservation has been successfully created.
                </Paragraph>
                <Button type="primary" onClick={() => navigate('/fleet')}>
                    Go to Fleet
                </Button>
            </Card>
        </div>
    );
};

export default PaymentSuccess;
