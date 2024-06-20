import { Col, Row, Typography, Card, Alert, DatePicker, Button, Select, Form, Slider, Empty } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import {
    CarOutlined,
    CalendarOutlined,
    UserOutlined,
    DashboardOutlined,
    SettingOutlined,
    FireOutlined,
    RiseOutlined,
    ThunderboltOutlined,
    InfoCircleOutlined,
    DollarCircleOutlined
} from '@ant-design/icons';
import '../App.css';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

/**
 * Komponent Booking jest komponentem funkcyjnym Reacta, który umożliwia wyszukiwanie i filtrowanie pojazdów do wynajmu.
 *
 * @returns {JSX.Element} Renderowany komponent strony rezerwacji pojazdów.
 */
const Booking = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [error, setError] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('All Brands');
    const [dates, setDates] = useState([]);
    const [filters, setFilters] = useState({
        year: [2000, 2024],
        seats: [2, 10],
        engineCapacity: [0.8, 6.0],
        enginePower: [50, 1000],
        doors: [2, 5],
        fuelConsumption: [3.0, 20.0],
        airConditioning: true,
        mileage: [0, 500000],
        pricePerDay: [50, 1000],
    });

    useEffect(() => {
        fetchAllVehicles();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [selectedBrand, filters]);

    useEffect(() => {
        applyFilters();
    }, [vehicles]);

    /**
     * Pobiera wszystkie dostępne pojazdy z API.
     */
    const fetchAllVehicles = () => {
        axios.get('http://localhost:8080/api/v1/vehicles/available')
            .then(response => {
                setVehicles(response.data);
                setFilteredVehicles(response.data);
            })
            .catch(error => {
                console.error('Error fetching vehicles:', error);
                setError('Failed to load vehicle data. Please try again later.');
            });
    };

    /**
     * Zastosowuje filtry do listy pojazdów.
     */
    const applyFilters = () => {
        let filtered = vehicles.filter(vehicle =>
            vehicle.status !== 'in service' &&
            (selectedBrand === 'All Brands' || vehicle.brand === selectedBrand) &&
            vehicle.yearOfManufacture >= filters.year[0] &&
            vehicle.yearOfManufacture <= filters.year[1] &&
            vehicle.seats >= filters.seats[0] &&
            vehicle.seats <= filters.seats[1] &&
            vehicle.engineCapacity >= filters.engineCapacity[0] &&
            vehicle.engineCapacity <= filters.engineCapacity[1] &&
            vehicle.enginePower >= filters.enginePower[0] &&
            vehicle.enginePower <= filters.enginePower[1] &&
            vehicle.doors >= filters.doors[0] &&
            vehicle.doors <= filters.doors[1] &&
            vehicle.fuelConsumption >= filters.fuelConsumption[0] &&
            vehicle.fuelConsumption <= filters.fuelConsumption[1] &&
            vehicle.mileage >= filters.mileage[0] &&
            vehicle.mileage <= filters.mileage[1] &&
            vehicle.pricePerDay >= filters.pricePerDay[0] &&
            vehicle.pricePerDay <= filters.pricePerDay[1]
        );

        setFilteredVehicles(filtered);
    };

     /**
     * Obsługuje zmianę filtrów.
     * 
     * @param {Object} changedValues - Zmienione wartości filtrów.
     * @param {Object} allValues - Wszystkie wartości filtrów.
     */
    const handleFilterChange = (changedValues, allValues) => {
        setFilters(allValues);
    };

    /**
     * Obsługuje zmianę wybranej marki pojazdu.
     * 
     * @param {string} value - Wybrana marka pojazdu.
     */
    const handleBrandChange = (value) => {
        setSelectedBrand(value);
    };

     /**
     * Obsługuje wyszukiwanie pojazdów na podstawie wybranych dat.
     */
    const handleSearch = () => {
        if (dates.length === 2) {
            const [startDate, endDate] = dates;
            axios.get('http://localhost:8080/api/v1/vehicles/available-dates', {
                params: {
                    startDate: startDate.format('YYYY-MM-DD'),
                    endDate: endDate.format('YYYY-MM-DD')
                }
            })
            .then(response => {
                setVehicles(response.data);
            })
            .catch(error => {
                console.error('Error fetching vehicles for selected dates:', error);
                setError('Failed to load vehicle data for selected dates. Please try again later.');
            });
        } else {
            fetchAllVehicles();
        }
    };

    const uniqueBrands = [...new Set(vehicles.map(vehicle => vehicle.brand))];

    return (
        <div className='mainContainer' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5%' }}>
            <Row style={{ width: '100%', marginBottom: '5%', textAlign: 'center' }}>
                <Col span={24}>
                    <Card className='content-card'>
                        <Title level={2} style={{ fontSize: '34px' }}>
                            <CarOutlined style={{ marginRight: '1%' }} />
                            Search for a Vehicle
                        </Title>
                        <Paragraph style={{ fontSize: '20px' }}>
                            <InfoCircleOutlined style={{ marginRight: '1%' }} />
                            Please select the brand and rental dates to search for available vehicles.
                        </Paragraph>
                        <Row gutter={[16, 16]} align="middle">
                            <Col span={8}>
                                <Select
                                    placeholder="Select brand"
                                    style={{ width: '100%' }}
                                    onChange={handleBrandChange}
                                    value={selectedBrand}
                                >
                                    <Option value="All Brands">All Brands</Option>
                                    {uniqueBrands.map(brand => (
                                        <Option key={brand} value={brand}>{brand}</Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col span={12}>
                                <DatePicker.RangePicker
                                    format="DD-MM-YYYY"
                                    value={dates}
                                    onChange={(dates) => setDates(dates || [])}
                                    style={{ width: '100%' }}
                                />
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={handleSearch}>Search</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col span={6} style={{ marginTop: '20px' }}>
                    <Card className='content-card' style={{ marginRight: '5%', textAlign: 'center' }}>
                        <Title style={{ fontWeight: 'bold', fontSize: '24px', margin: '5%' }} level={4}>Filter Vehicles</Title>
                        <Form
                            layout="vertical"
                            initialValues={filters}
                            onValuesChange={handleFilterChange}
                            style={{ padding: '5%' }}
                        >
                            <Form.Item label={<span><CalendarOutlined /> Year of Manufacture</span>} name="year">
                                <Slider range min={2000} max={2024} marks={{ 2000: '2000', 2024: '2024' }} />
                            </Form.Item>
                            <Form.Item label={<span><UserOutlined /> Seats</span>} name="seats">
                                <Slider range min={2} max={10} marks={{ 2: '2', 10: '10' }} />
                            </Form.Item>
                            <Form.Item label={<span><DashboardOutlined /> Engine Capacity (L)</span>} name="engineCapacity">
                                <Slider range min={0.8} max={6.0} step={0.1} marks={{ 0.8: '0.8L', 6.0: '6.0L' }} />
                            </Form.Item>
                            <Form.Item label={<span><ThunderboltOutlined /> Engine Power (HP)</span>} name="enginePower">
                                <Slider range min={50} max={1000}
                                    marks={{ 50: '50HP', 1000: '1000HP' }} />
                                </Form.Item>
                                <Form.Item label={<span><SettingOutlined /> Doors</span>} name="doors">
                                    <Slider range min={2} max={5} marks={{ 2: '2', 5: '5' }} />
                                </Form.Item>
                                <Form.Item label={<span><FireOutlined /> Fuel Consumption (L/100km)</span>} name="fuelConsumption">
                                    <Slider range min={3.0} max={20.0} step={0.1} marks={{ 3.0: '3.0L', 20.0: '20.0L' }} />
                                </Form.Item>
                                <Form.Item label={<span><RiseOutlined /> Mileage (km)</span>} name="mileage">
                                    <Slider range min={0} max={500000} step={10000} marks={{ 0: '0 km', 500000: '500,000 km' }} />
                                </Form.Item>
                                <Form.Item label={<span><DollarCircleOutlined /> Price Per Day (PLN)</span>} name="pricePerDay">
                                    <Slider range min={50} max={1000} marks={{ 50: '50 PLN', 1000: '1000 PLN' }} />
                                </Form.Item>
                                <Button type="primary" onClick={applyFilters} block style={{ marginTop: '10px' }}>Apply Filters</Button>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={18}>
                        {error ? (
                            <Alert
                                message="Error"
                                description={error}
                                type="error"
                                showIcon
                                style={{ width: '100%', marginBottom: '20px' }}
                            />
                        ) : filteredVehicles.length > 0 ? (
                            <Row gutter={[16, 16]} style={{ width: '100%' }}>
                                {filteredVehicles.map(vehicle => (
                                    <Col key={vehicle.vehicleID} span={24}>
                                        <VehicleCard vehicle={vehicle} />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Card className='content-card' style={{ textAlign: 'center' }}>
                                <Empty description="No vehicles match the filters" />
                            </Card>
                        )}
                    </Col>
                </Row>
            </div>
        );
    };

    export default Booking;
