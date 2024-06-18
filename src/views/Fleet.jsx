import { Col, Row, Typography, Card, Alert } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import { CarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import '../App.css';

const { Title, Paragraph } = Typography;

const Fleet = () => {
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/vehicles/')
            .then(response => {
                const sortedVehicles = response.data.sort((a, b) => {
                    if (a.status === 'in service' && b.status !== 'in service') {
                        return 1;
                    }
                    if (a.status !== 'in service' && b.status === 'in service') {
                        return -1;
                    }
                    return 0;
                });
                setVehicles(sortedVehicles);
            })
            .catch(error => {
                console.error('Error fetching vehicles:', error);
                setError('Failed to load vehicle data. Please try again later.');
            });
    }, []);
       
    

    return (
        <div className='mainContainer' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5%' }}>
            <Row style={{ width: '100%', marginBottom: '5%', textAlign: 'center' }}>
                <Col span={24}>
                    <Card className='content-card'>
                        <Title level={2} style={{fontSize: '34px'}}>
                            <CarOutlined style={{ marginRight: '1%' }} />
                            Our Company Fleet
                        </Title>
                        <Paragraph style={{fontSize: '20px'}}>
                            <InfoCircleOutlined style={{ marginRight: '1%' }} />
                            Our company offers a wide range of vehicles to meet all our customers' needs. Each car is thoroughly checked and maintained in excellent technical condition.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            {error ? (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    style={{ width: '100%', marginBottom: '20px' }}
                />
            ) : (
                <Row gutter={[16, 16]} style={{ width: '100%' }}>
                    {vehicles.map(vehicle => (
                        <Col key={vehicle.vehicle_id} span={24}>
                            <VehicleCard vehicle={vehicle} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default Fleet;
