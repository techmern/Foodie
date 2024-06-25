import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function User_Navbar({ selectedCity, setSelectedCity }) {
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [token, setToken] = useState('');
    const [cities, setCities] = useState([]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/user/userlogout', { token });
            console.log(response.data);

            if (response.data.logoutsts === 0) {
                localStorage.removeItem('User');
                localStorage.removeItem('Token');
                localStorage.removeItem('SelectedCity');

                setUser(null);
                setToken('');
                navigate('/userlogin');
            } else {
                console.log("Logout failed with status:", response.data.logoutsts);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const getCity = async () => {
        try {
            const response = await axios.get('http://localhost:5000/city/viewcity');
            setCities(response.data);

            if (response.data.length > 0 && !selectedCity) {
                const savedCity = localStorage.getItem('selectedCity') || response.data[0].name;
                setSelectedCity(savedCity);
            }
        } catch (error) {
            console.error('Error fetching city data:', error);
        }
    };

    const handleCityChange = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        localStorage.setItem('selectedCity', city);
    };

    useEffect(() => {
        const userData = localStorage.getItem('User');
        const storedToken = localStorage.getItem('Token');

        const savedCity = localStorage.getItem('selectedCity');

        if (!userData || userData === 'undefined') {
            navigate('/userlogin');
            return;
        }

        try {
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
        } catch (error) {
            console.error('Error parsing user data:', error);
            navigate('/userlogin');
            return;
        }

        if (!storedToken) {
            navigate('/userlogin');
            return;
        }

        setToken(storedToken);
        
        if (savedCity) {
            setSelectedCity(savedCity);
        }

        getCity();


    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ height: '70px', backgroundColor: '#37474F' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/welcomeuser" style={{ height: '100%', display: 'flex', alignItems: 'center', fontFamily: 'cursive', fontSize: '30px' }}>Foodie</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/welcomeuser"> Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/aboutus">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Services">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/help">Help</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <select
                                className="form-control"
                                style={{ width: '250px', height: '50px' }}
                                value={selectedCity}
                                onChange={handleCityChange}
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.name}>
                                        {city.cityname}
                                    </option>
                                ))}
                            </select>
                        </form>
                        <div className="ms-2 dropdown me-1">
                            <button className="btn btn-secondary dropdown-toggle  border-0 bg-transparent" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false"
                                style={{
                                    backgroundImage: 'none',
                                    boxShadow: 'none',
                                    paddingRight: 0,
                                }}
                            >
                                <img
                                    src={`http://localhost:5000/${user && user.User_profile}`}
                                    alt="profile"
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                                    className="rounded-pill "
                                />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="profileDropdown">
                                <li className="text-center " style={{ textTransform: 'capitalize', fontFamily: 'Georgia, Serif', fontSize: '22px' }} ><a className="dropdown-item"><strong>{user && user.Username}</strong></a></li>
                                <li ><hr className="dropdown-divider" style={{ border: '2px solid grey' }} /></li>
                                <li className="text-center"><a className="dropdown-item" href="/userprofile">Manage Your Profile</a></li>

                                <li><hr className="dropdown-divider" /></li>
                                <li className="text-center"><a className="dropdown-item" href="/useraddress">My Address</a></li>

                                <li><hr className="dropdown-divider" /></li>
                                <li className="text-center"><a className="dropdown-item" href="/cart">My Cart</a></li>


                                <li><hr className="dropdown-divider" /></li>
                                <li className="text-center"><a className="dropdown-item" href="/userbooking">Booking Details </a></li>

                                <li><hr className="dropdown-divider" /></li>
                                <li className="text-center"><a className="dropdown-item" href="/userorder">Order Details</a></li>

                                <li ><hr className="dropdown-divider" style={{ border: '2px solid grey', }} /></li>
                                <li className="text-center" style={{ fontSize: '20px' }} ><a className="dropdown-item" onClick={handleLogout}><strong>Logout</strong></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default User_Navbar;
