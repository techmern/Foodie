import React, { useEffect, useState } from 'react';
import Sidebar from '../CommonLayouts/Navbar/Sidebar_Admin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function View_Restaurant_Admin() {
    const styles = {
        logo: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            marginBottom: '20px',
        },
        container: {
            display: 'flex',
            height: '100vh',
        },
        table: {
            borderCollapse: 'collapse',
            width: '100%',
        },
        th: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '15px',
        },
        td: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '15px',
        },
        tdbtn: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '15px',
        },
        button: {
            marginRight: '5px',
            marginTop: '5px',
            width: '100px',
        },
        h1: {
            fontSize: '45px',
            fontWeight: 400,
            textAlign: 'center',
            letterSpacing: '9px',
            wordSpacing: '4px',
            margin: '40px 0',
            color: 'black',
        },
        filterContainer: {
            display: 'flex',
            marginBottom: '20px',
        },
        filter: {
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
    };
    const [resData, setResData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [totalEarnings, setTotalEarnings] = useState({}); 
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:5000/restaurant/viewRestaurant');
                setResData(res.data);
                setFilteredData(res.data);
                calculateTotalEarnings(res.data); 
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

        async function fetchCities() {
            try {
                const res = await axios.get('http://localhost:5000/city/viewCity');
                setCities(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCities();
    }, []);

    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        setSelectedCity(selectedCity);
        if (selectedCity) {
            const filtered = resData.filter((item) => item.city && item.city.toLowerCase() === selectedCity.toLowerCase());
            setFilteredData(filtered);
            calculateTotalEarnings(filtered); 
        } else {
            setFilteredData(resData);
            calculateTotalEarnings(resData); 
        }
    };

    const calculateTotalEarnings = async (restaurants) => {
        try {
            const promises = restaurants.map(async (restaurant) => {
                const { data } = await axios.get(`http://localhost:5000/restaurantorder/countAmount?restaurantId=${restaurant._id}`);
                return { restaurantId: restaurant._id, totalEarnings: data.totalCOD + data.totalOnline };
            });
            const earnings = await Promise.all(promises);
            const earningsMap = {};
            earnings.forEach((earn) => {
                earningsMap[earn.restaurantId] = earn.totalEarnings;
            });
            setTotalEarnings(earningsMap);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTotalEarningsClick = (restaurantId) => {
        navigate(`/viewTotalAmountAdmin/${restaurantId}`);
    };


    return (
        <div style={styles.container}>
            <Sidebar />
            <div>
                <div>
                    <h1 style={styles.h1}>View Restaurant Details</h1>
                    <div style={styles.filterContainer}>
                        <select value={selectedCity} onChange={handleCityChange} style={styles.filter}>
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city._id} value={city.name}>{city.cityname}</option>
                            ))}
                        </select>
                    </div>
                    {filteredData.length === 0 ? (
                        <p>No restaurants found for the selected city.</p>
                    ) : (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Restaurant Logo</th>
                                    <th style={styles.th}>Restaurant Name</th>
                                    <th style={styles.th}>Email ID</th>
                                    <th style={styles.th}>Password</th>
                                    <th style={styles.th}>Mobile Number</th>
                                    <th style={styles.th}>Address</th>
                                    <th style={styles.th}>City</th>
                                    <th style={styles.th}>Postal Code</th>
                                    <th style={styles.th}>Total Weekly Earning</th>
                                    <th style={styles.th}>Restaurant Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.id}>
                                        <td style={styles.td}>
                                            <img src={`http://localhost:5000/restaurantlogo/${item.restaurantImg || "./logo-food.png"}`} alt="Logo" style={styles.logo} />
                                        </td>
                                        <td style={styles.td}>{item.restaurantname}</td>
                                        <td style={styles.td}>{item.emailid}</td>
                                        <td style={styles.td}>{item.password}</td>
                                        <td style={styles.td}>{item.mobno}</td>
                                        <td style={styles.td}>{item.address}</td>
                                        <td style={styles.td}>{item.city}</td>
                                        <td style={styles.td}>{item.postalcode}</td>
                                        <td style={styles.td}>
                                            <a href='' onClick={() => handleTotalEarningsClick(item._id)}> Rs.{totalEarnings[item._id] || 0}</a>
                                        </td>
                                        <td style={styles.td}>{item.restaurantStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
