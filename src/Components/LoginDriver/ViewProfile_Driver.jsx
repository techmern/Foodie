import React, { useEffect, useState } from 'react';
import Navbar from '../CommonLayouts/Navbar/Navbar_Driver';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewProfile_Driver = () => {
    const style = {
        profileContainerStyle: {
            maxWidth: '600px',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            marginTop: '20px'
        },
        h2: {
            fontSize: "20px",
            fontWeight: 400,
            textAlign: "center",
            letterSpacing: "0.1em",
            padding: "0.5em",
            color: "black",
            borderBottom: "2px solid red",
        },
        heading: {
            fontSize: "50px",
            fontWeight: 400,
            textAlign: "center",
            color: "black",
        },
        button: {
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: 'red',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            background: '#e0a800',
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
        }
    };

    const navigate = useNavigate();

    const [driverData, setDriverData] = useState({
        drivername: '',
        emailid: '',
        password: '',
        phone_no: '',
        city: '',
        license_no: '',
        vehicle_type: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loguser = localStorage.getItem('driver');
                const driver = loguser ? JSON.parse(loguser) : null;

                if (!driver) {
                    navigate('/loginDriver');
                    return;
                }

                const response = await fetch(`http://localhost:5000/driver/driverProfile/${driver._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch driver data');
                }
                const data = await response.json();
                setDriverData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriverData({ ...driverData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/driver/updateDriver/${driverData._id}`, driverData);
            if (response.status === 200) {
                alert('Profile updated successfully');
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div>
                <h1 style={style.heading}>My Profile</h1>
                <div style={style.profileContainerStyle}>
                    <form onSubmit={handleSubmit}>
                        <div style={style.formGroup}>
                            <label style={style.label} htmlFor="drivername">Name:</label>
                            <input style={style.input} type="text"id="drivername"name="drivername" value={driverData.drivername} disabled/>
                        </div>
                        <div style={style.formGroup}>
                            <label style={style.label} htmlFor="emailid">Email:</label>
                            <input style={style.input}type="email"id="emailid"name="emailid"value={driverData.emailid} disabled/>
                        </div>
                        <div style={style.formGroup}>
                            <label style={style.label} htmlFor="password">Password:</label>
                            <input style={style.input}type="text"id="password"name="password"value={driverData.password}onChange={handleChange}/>
                        </div>
                        <div style={style.formGroup}>
                            <label style={style.label} htmlFor="phone_no">Phone No:</label>
                            <input style={style.input}type="text"id="phone_no"name="phone_no"value={driverData.phone_no}disabled/>
                        </div>
                        <div style={style.formGroup}>
                            <label style={style.label} htmlFor="city">City:</label>
                            <input style={style.input}type="text"id="city"name="city"value={driverData.city}disabled/>
                        </div>
                        <div style={style.formGroup}>
                            <label style={style.label} htmlFor="license_no">License No:</label>
                            <input style={style.input}type="text"id="license_no"name="license_no"value={driverData.license_no}disabled/>
                        </div>
                        <div style={style.formGroup}>
                            <label style={style.label} htmlFor="vehicle_type">Vehicle Type:</label>
                            <input style={style.input}type="text"id="vehicle_type"name="vehicle_type"value={driverData.vehicle_type}disabled/>
                        </div>
                        <center>
                            <button style={style.button}type="submit"onMouseEnter={(e) => (e.target.style.background = '#e0a800')}onMouseLeave={(e) => (e.target.style.background = 'red')}>
                                Update Password
                            </button>
                        </center>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile_Driver;
