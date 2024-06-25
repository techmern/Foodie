import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../CommonLayouts/Navbar/Navbar'

const WelcomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token === null) {
            navigate('/loginRestaurant');
        }
    }, [navigate]);

    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <h2>Welcome to Your Restaurant Dashboard</h2>
                <p>This is the place where you can manage your restaurant orders, reviews, and more.</p>
            </div>
        </div>
    );
};

export default WelcomePage;
