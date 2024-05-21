import React, { useState } from 'react';
import PayPalButtonWrapper from '../components/PayPalButtonWrapper';

const Home = () => {

    return (
        <div className='mainContainer' style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
            <PayPalButtonWrapper amount="100" />
        </div>
    );
};

export default Home;
