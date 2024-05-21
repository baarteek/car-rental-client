import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButtonWrapper = ({ amount }) => {
    return (
        <PayPalScriptProvider options={{ "client-id": "AZeRvfAVXHOPoI8Y-KNLQyuDQ-dnbP7Hb8m2GZgh1HJsWsM5n6EEC337-0xXpRW8-LGS-6P6vAjuVb0f" }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amount || "0.00" 
                            }
                        }]
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(details => {
                        alert("Transaction completed by " + details.payer.name.given_name);
                    });
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButtonWrapper;
