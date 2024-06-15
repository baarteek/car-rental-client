import { Col, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import '../App.css';

const Fleet = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/vehicles/')
            .then(response => {
                const sortedVehicles = response.data.sort((a, b) => {
                    if (a.status === 'available' && b.status !== 'available') {
                        return -1; 
                    }
                    if (a.status !== 'available' && b.status === 'available') {
                        return 1;
                    }
                    return 0;
                });
                setVehicles(sortedVehicles);
            })
            .catch(error => {
                console.error('Error fetching vehicles:', error);
            });
    }, []);

    return (
        <div className='mainContainer' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5%' }}>
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
