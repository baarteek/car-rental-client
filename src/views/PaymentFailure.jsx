import React from 'react';
import { Typography, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

/**
 * Komponent PaymentFailure jest komponentem funkcyjnym Reacta, który renderuje stronę informującą o niepowodzeniu płatności.
 * Umożliwia użytkownikowi nawigację do strony floty pojazdów.
 *
 * @returns {JSX.Element} Renderowany komponent strony niepowodzenia płatności.
 */
const PaymentFailure = () => {
    const navigate = useNavigate();

    return (
        <div className="mainContainer" style={{padding: '15%', textAlign: 'center'}}>
            <Card bordered={true} className="content-card" style={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
                <Title level={2}>Payment Failure</Title>
                <Button type="primary" onClick={() => navigate('/fleet')}>
                    Go to Fleet
                </Button>
            </Card>
        </div>
    );
};

export default PaymentFailure;
