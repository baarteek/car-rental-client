import React from 'react';
import { Card, List, Button, Row, Col, Typography } from 'antd';
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
import {  useNavigate } from 'react-router-dom';
import '../App.css';

const { Text } = Typography;

/**
 * Komponent VehicleCard jest komponentem funkcyjnym Reacta, który renderuje kartę pojazdu z jego szczegółami.
 * Umożliwia również nawigację do strony rezerwacji, jeśli pojazd jest dostępny.
 *
 * @param {Object} props - Właściwości przekazywane do komponentu.
 * @param {Object} props.vehicle - Obiekt zawierający szczegóły pojazdu.
 * @returns {JSX.Element} Renderowany komponent karty pojazdu.
 */
const VehicleCard = ({ vehicle }) => {
    const navigate = useNavigate()
    const isUnavailable = vehicle.status === 'in service';

    /**
     * Obsługuje kliknięcie na kartę pojazdu.
     * Przekierowuje użytkownika do strony rezerwacji, jeśli pojazd jest dostępny.
     */
    const handleCardClick = () => {
        if (!isUnavailable) {
            navigate(`/reserve/${vehicle.vehicleID}`);
        }
    };

    return (
        <Card
            className='content-card'
            hoverable={!isUnavailable}
            onClick={handleCardClick}
            style={{ 
                width: '100%', 
                margin: '20px 0',
                opacity: isUnavailable ? 0.7 : 1,
                cursor: isUnavailable ? 'not-allowed' : 'pointer',
            }}
        >
            <Row align="middle">
                <Col span={12}>
                <img alt={vehicle.model} src={vehicle.imageUrl} style={{ 
                        width: '100%', 
                        maxHeight: '300px', 
                        objectFit: 'contain', 
                        paddingRight: '10%',
                    }} />
                </Col>
                <Col span={12}>
                    <h1>{vehicle.brand} {vehicle.model}</h1>
                    <Card.Meta
                        description={`Year of Manufacture: ${vehicle.yearOfManufacture}`}
                        style={{ marginBottom: '20px'}}
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
                            <FundOutlined /> Status: {isUnavailable ? <Text type="danger">Unavailable</Text> : <b style={{color: 'green'}}>{vehicle.status}</b>}
                        </List.Item>
                        <List.Item style={{fontSize: '22px', fontWeight: 'bold', marginTop: '1%'}}>
                            <DollarCircleOutlined style={{marginRight: '1%'}}/>Price per day: <b style={{color: 'green', fontSize: '22px'}}>{vehicle.pricePerDay} PLN</b>
                        </List.Item>
                    </List>
                    <Button style={{marginTop: '1%', fontWeight: 'bold'}} type="primary" block disabled={isUnavailable}>Reserve</Button>
                </Col>
            </Row>
        </Card>
    );
};

export default VehicleCard;
