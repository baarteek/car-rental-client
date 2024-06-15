import { Col, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VehicleCard from '../components/VehicleCard';

const Fleet = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/vehicles/available')
            .then(response => {
                setVehicles(response.data);
            })
            .catch(error => {
                console.error('Error fetching vehicles:', error);
            });
    }, []);
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5%' }}>
            <Row gutter={[16, 16]} style={{ width: '100%' }}>
                {vehicles.map(vehicle => (
                    <Col key={vehicle.vehicle_id} span={24}>
                        <VehicleCard vehicle={vehicle} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Fleet;
