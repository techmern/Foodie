import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewProfile_Restaurant = () => {
    const navigate = useNavigate();

    const [restaurantData, setRestaurantData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loguser = localStorage.getItem('restaurants');
                const restaurants = loguser ? JSON.parse(loguser) : null;

                if (!restaurants) {
                    navigate('/loginRestaurant');
                    return;
                }

                const response = await fetch(`http://localhost:5000/restaurant/restaurantProfile/${restaurants._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch restaurant data');
                }
                const data = await response.json();
                setRestaurantData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [navigate]);

    const handleSubmit = () => {
        navigate('/editprofileRestaurant');
    };


    const style = {
        homePageStyle: {
            textAlign: 'center',
            padding: '50px 0',
        },
        formContainer: {
            textAlign: 'center',
            backgroundColor: '#7f7f83',
            width: '40%',
            margin: '0 auto',
            padding: '3em',
            boxShadow: '4px 4px 0px rgb(151, 152, 154)',
            opacity: '0.7',
            boxSizing: 'border-box',
        },
        heading: {
            fontSize: '30px',
            color: 'black',
        },
        bodyColor: {
            backgroundColor: 'white',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
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
        logo: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            marginBottom: '20px',
        },
        backButton: {
            position: 'absolute',
            left: '20px',
            top: '20px',
            padding: '10px 20px',
            backgroundColor: 'red',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
        },
        h2: {
            fontSize: "20px",
            fontWeight: 400,
            textAlign: "center",
            letterSpacing: "0.1em",
            padding: "0.5em",
            color: "#fff",
            borderBottom: "2px solid red",
        },
      
    };

    const handleBack = () => {
        navigate('/welcomeRestaurant');
    };


    return (
        <div style={style.homePageStyle}>
            <div style={style.bodyColor}>
            <button style={style.backButton} onClick={handleBack} onMouseEnter={(e) => (e.target.style.background = '#e0a800')}
                        onMouseLeave={(e) => (e.target.style.background = 'red')}>Back
                    </button>
                <h1 style={style.heading}>View Profile</h1>
                <div style={style.formContainer}>
                    {restaurantData && restaurantData.restaurantImg && (
                        <img src={`http://localhost:5000/uploads/${restaurantData.restaurantImg}`} alt="Logo" style={style.logo}/>
                    )}
                    {(!restaurantData || !restaurantData.restaurantImg) && (
                        <img src="./Selectlogo.png" alt="Profile Logo" style={style.logo} />
                    )}

                    {restaurantData && (
                        <>
                            <h2 style={style.h2}>Restaurant Name: {restaurantData.restaurantname}</h2>
                            <h2 style={style.h2}>Email: {restaurantData.emailid}</h2>
                            <h2 style={style.h2}>Mobile No: {restaurantData.mobno}</h2>
                            <h2 style={style.h2}>Address: {restaurantData.address}</h2>
                            <h2 style={style.h2}>City: {restaurantData.city}</h2>
                            <h2 style={style.h2}>Postal Code: {restaurantData.postalcode}</h2>
                            <h2 style={style.h2}>Restaurant Status: {restaurantData.restaurantStatus}</h2>
                        </>
                    )}
                    <button style={style.button} onClick={handleSubmit} onMouseEnter={(e) => (e.target.style.background = '#e0a800')}
                        onMouseLeave={(e) => (e.target.style.background = 'red')}>Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile_Restaurant;
