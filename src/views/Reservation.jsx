import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker, Button, Form, Input, notification, Card, Typography, Select, Divider, Modal } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import '../App.css';
import { useAuth } from '../context/AuthProvider';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const Reservation = () => {
    const { vehicleId } = useParams();
    const { isLoggedIn, userId } = useAuth();  // Dodanie userId z kontekstu
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({});
    const [insurances, setInsurances] = useState([]);
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            insurance_id: 1  
        }
    });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/vehicles/${vehicleId}`)
            .then(response => {
                setVehicle(response.data);
            })
            .catch(error => console.error('Error fetching vehicle details:', error));

        axios.get('http://localhost:8080/api/v1/insurance/')
            .then(response => {
                setInsurances(response.data);
                if (response.data.length > 0) {
                    setValue('insurance_id', response.data[0].insuranceID.toString());
                    setSelectedInsurance(response.data[0]);
                }
            })
            .catch(error => console.error('Error fetching insurances:', error));
    }, [vehicleId, setValue]);

    const insuranceId = watch('insurance_id');

    useEffect(() => {
        const currentInsurance = insurances.find(ins => ins.insuranceID.toString() === insuranceId);
        setSelectedInsurance(currentInsurance);
    }, [insuranceId, insurances]);

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/paypal/pay', {
                total: 1.0,
                currency: 'PLN',
                method: 'paypal',
                intent: 'sale',
                description: 'Car rental payment',
                vehicleId: vehicleId,
                insuranceId: insuranceId,
                startDate: startDate.format('YYYY-MM-DD'),
                endDate: endDate.format('YYYY-MM-DD'),
                notes: notes,
                userId: userId // Dodanie userId do requestu
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data) {
                const paymentUrl = new URL(response.data);
                paymentUrl.searchParams.append('vehicleId', vehicleId);
                paymentUrl.searchParams.append('insuranceId', insuranceId);
                paymentUrl.searchParams.append('startDate', startDate.format('YYYY-MM-DD'));
                paymentUrl.searchParams.append('endDate', endDate.format('YYYY-MM-DD'));
                paymentUrl.searchParams.append('notes', notes);
                paymentUrl.searchParams.append('userId', userId); // Dodanie userId do URL

                window.location.href = paymentUrl.toString();
            }
        } catch (error) {
            console.error('Payment error', error);
        }
    };

    const onSubmit = () => {
        if (!isLoggedIn) {
            Modal.confirm({
                title: 'Login Required',
                content: 'You need to be logged in to make a reservation. Would you like to log in now?',
                onOk() {
                    navigate("/login");
                },
            });
            return;
        }

        if (!endDate || !startDate) {
            notification.error({
                message: 'Invalid Date Range',
                description: 'Please select both start and end dates.'
            });
            return;
        }

        if (!dayjs(endDate).isAfter(dayjs(startDate))) {
            notification.error({
                message: 'Invalid Date Range',
                description: 'The end date must be after the start date.'
            });
            return;
        }

        handlePayment();
    };

    return (
        <div className='mainContainer' style={{padding: '5%'}}>
            <Card bordered={true} className='content-card' style={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
                <Title level={2} style={{ textAlign: 'center' }}>Reserve a {vehicle.brand} {vehicle.model}</Title>
                <Form onFinish={onSubmit} layout="vertical">
                    <Form.Item label="Start Date" required>
                        <Controller
                            name="start_date"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <DatePicker {...field} format="YYYY-MM-DD" onChange={(date) => setStartDate(date)} />}
                        />
                    </Form.Item>
                    <Form.Item label="End Date" required>
                        <Controller
                            name="end_date"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <DatePicker {...field} format="YYYY-MM-DD" onChange={(date) => setEndDate(date)} />}
                        />
                    </Form.Item>
                    <Form.Item label="Insurance" required>
                        <Controller
                            name="insurance_id"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select {...field} placeholder="Select insurance">
                                    {insurances.map(insurance => (
                                        <Option key={insurance.insuranceID} value={insurance.insuranceID.toString()}>
                                            {insurance.name} - {insurance.pricePerDay} PLN/day
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        />
                    </Form.Item>
                    {selectedInsurance && (
                        <Paragraph>
                            <strong>Description:</strong> {selectedInsurance.description}
                        </Paragraph>
                    )}
                    <Form.Item label="Notes">
                        <Controller
                            name="notes"
                            control={control}
                            render={({ field }) => <Input.TextArea {...field} rows={4} placeholder="Add your comments" onChange={(e) => setNotes(e.target.value)} />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{fontWeight: 'bold'}} type="primary" htmlType="submit" block>Submit Reservation</Button>
                    </Form.Item>
                    <Divider style={{ borderColor: '#333' }}>or</Divider>
                    <Button type="primary" onClick={() => navigate(-1)} style={{fontSize: '20px', width: '100%', backgroundColor: '#595959' }}>
                        <ArrowLeftOutlined /> Back to Fleet
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Reservation;
