import React from 'react';
import { Card, List, Button, Row, Col } from 'antd';
import {
  CarOutlined,
  DashboardOutlined,
  ControlOutlined,
  CalendarOutlined,
  FireOutlined,
  CloudOutlined,
  DollarCircleOutlined,
  FundOutlined,
  DashboardOutlined as MileageOutlined
} from '@ant-design/icons';

const VehicleCard = ({ vehicle }) => {
    return (
        <Card
            hoverable
            style={{ width: '100%', margin: '20px 0' }}
        >
            <Row align="middle">
                <Col span={12}>
                <img alt={vehicle.model} src={vehicle.imageUrl} style={{ 
                        width: '100%', 
                        maxHeight: '300px', 
                        objectFit: 'contain', 
                        paddingRight: '10%'
                    }} />
                </Col>
                <Col span={12}>
                    <h1>{vehicle.brand} {vehicle.model}</h1>
                    <Card.Meta
                        description={`Year of Manufacture: ${vehicle.yearOfManufacture}`}
                        style={{ marginBottom: '20px',}}
                    />
                    <List size="small">
                        <List.Item>
                            <CarOutlined /> Seats: <b>{vehicle.seats}</b>
                        </List.Item>
                        <List.Item>
                            <DashboardOutlined /> Engine Capacity: <b>{vehicle.engineCapacity}L</b> 
                        </List.Item>
                        <List.Item>
                            <ControlOutlined /> Engine Power: <b>{vehicle.enginePower}HP</b>
                        </List.Item>
                        <List.Item>
                            <CalendarOutlined /> Doors: <b>{vehicle.doors}</b>
                        </List.Item>
                        <List.Item>
                            <FireOutlined /> Fuel Consumption: <b>{vehicle.fuelConsumption}L/100km</b>
                        </List.Item>
                        <List.Item>
                            <CloudOutlined /> Air Conditioning: <b>{vehicle.airConditioning ? 'Yes' : 'No'}</b>
                        </List.Item>
                        <List.Item>
                            <MileageOutlined /> Mileage: <b>{vehicle.mileage} km</b>
                        </List.Item>
                        <List.Item>
                            <FundOutlined /> Status: <b>{vehicle.status}</b>
                        </List.Item>
                        <List.Item style={{fontSize: '22px', fontWeight: 'bold', marginTop: '1%'}}>
                            <DollarCircleOutlined style={{marginRight: '1%'}}/>Price per day: <b style={{color: 'green', fontSize: '22px'}}>{vehicle.pricePerDay} PLN</b>
                        </List.Item>
                    </List>
                    <Button style={{marginTop: '1%', fontWeight: 'bold'}} type="primary" block>Reserve</Button>
                </Col>
            </Row>
        </Card>
    );
};

export default VehicleCard;
