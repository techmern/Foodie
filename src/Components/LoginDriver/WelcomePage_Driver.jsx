// WelcomePage_Driver.jsx
import React, { useEffect } from 'react';
import Navbar from '../CommonLayouts/Navbar/Navbar_Driver'
import { useNavigate } from 'react-router-dom';
import View_Restaurant_Driver from './View_Restaurant_Driver';

function WelcomePage_Driver() {
    const navigate = useNavigate();
    const loggedInDriver = JSON.parse(localStorage.getItem('driver')) || {};

    const style = {  
        header: {
            fontSize: '24px',
            fontWeight: 'bold',
            margin: '20px',
            alignItems: 'center',
        },
    };

    useEffect(() => {
        if (!loggedInDriver) {
            navigate('/loginDriver');
        }
    }, [loggedInDriver]);

    return (
        <div>
            <Navbar />
            <h1 style={style.header}>Welcome, Delivery Driver!</h1>
            <View_Restaurant_Driver />
        </div>
    );
}

export default WelcomePage_Driver;
