import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

/**
 * Komponent PayPalButtonWrapper jest komponentem funkcyjnym Reacta, który renderuje przycisk PayPal.
 * Używa biblioteki @paypal/react-paypal-js do integracji z PayPal i umożliwia dokonywanie płatności.
 *
 * @param {Object} props - Właściwości przekazywane do komponentu.
 * @param {string} props.amount - Kwota do zapłaty.
 * @returns {JSX.Element} Renderowany komponent przycisku PayPal.
 */
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
                /**
                 * Funkcja wywoływana po zatwierdzeniu płatności.
                 * @param {Object} data - Dane przekazywane przez PayPal.
                 * @param {Object} actions - Akcje dostępne do wykonania na zamówieniu.
                 * @returns {Promise<void>} Wynik operacji zatwierdzania płatności.
                 */
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
