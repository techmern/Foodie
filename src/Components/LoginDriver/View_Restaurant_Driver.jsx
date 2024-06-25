import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const styles = {
    restaurantBox: {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: 'calc(33.33% - 20px)',
        margin: '10px',
        float: 'left',
        boxSizing: 'border-box',
    },
    restaurantName: {
        fontSize: '25px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333',
    },
    logo: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginBottom: '20px',
        display: 'block',
        margin: 'auto',
    },
    text: {
        fontSize: '18px',
        marginBottom: '10px',
        color: '#666',
    },
    textCount: {
        fontSize: '25px',
        marginBottom: '10px',
        color: '#666',
    },
    button: {
        backgroundColor: '#4CAF50',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '8px',
    },
};

function View_Restaurant_Driver() {
    const loggedInDriver = JSON.parse(localStorage.getItem('driver')) || {};
    const [resData, setResData] = useState([]);
    const [pendingOrders, setPendingOrders] = useState({});

    const navigate = useNavigate();

    const getRes = async () => {
        try {
            if (!loggedInDriver) {
                navigate('/loginDriver');
                return;
            }

            const res = await axios.get("http://localhost:5000/restaurant/viewRestaurant");
            const filteredData = res.data.filter(item => item.city === loggedInDriver.city);
            setResData(filteredData);

            for (const restaurant of filteredData) {
                try {
                    const countRes = await axios.get(`http://localhost:5000/restaurantorder/countPendingRestaurantOrder/${restaurant._id}`);
                    setPendingOrders(prevState => ({
                        ...prevState,
                        [restaurant._id]: countRes.data.count,
                    }));
                } catch (orderError) {
                    console.error(`Error fetching pending orders for restaurant ${restaurant._id}:`, orderError);
                }
            }
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    useEffect(() => {
        if (!loggedInDriver) {
            navigate('/loginDriver');
        } else {
            getRes();
        }
    }, [loggedInDriver]);

    const viewOrders = (restaurantId) => {
        navigate(`/vieworderDriver/${restaurantId}`);
    };

    return (
        <div>
            {resData.map((item, index) => (
                <div key={index} style={styles.restaurantBox}>
                    <img src={`http://localhost:5000/restaurantlogo/${item.restaurantImg || "./logo-food.png"}`} alt="Logo" style={styles.logo} />
                    <div style={styles.restaurantName}>{item.restaurantname}</div>
                    <div style={styles.text}>Address: {item.address}</div>
                    <div style={styles.text}>City: {item.city}</div>
                    <div style={styles.text}>Email: {item.emailid}</div>
                    <div style={styles.text}>Phone Number: {item.mobno}</div>
                    <div style={styles.text}>Restaurant Status: {item.restaurantStatus}</div>
                    <div style={styles.textCount}>
                        Pending Orders: {pendingOrders[item._id] !== undefined ? pendingOrders[item._id] : 'Loading...'}
                    </div>
                    <button style={styles.button} onClick={() => viewOrders(item._id)}>View Orders</button>
                </div>
            ))}
        </div>
    );
}

export default View_Restaurant_Driver;
