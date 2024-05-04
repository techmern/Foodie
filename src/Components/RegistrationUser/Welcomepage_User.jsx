import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Welcomepage_User() {
    const navigate = useNavigate();

    const [user, setUser] = useState();

    useEffect(() => {
        const userData = localStorage.getItem('User');

        if (userData && userData !== 'undefined') {
            try {
                const parsedUserData = JSON.parse(userData);
                
                setUser(parsedUserData);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);
    
    
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/user/userlogout', user);
            console.log(response.data);

            if (response.data.logoutsts === 0) {
                localStorage.removeItem('User'); 
                navigate('/userlogin');
            } else {
                console.log("Logout failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/home">Food Delivery</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/addrestureant">Add Restaurants</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/userlogin">LogIn</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/userlogin">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/help">Help</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="text" placeholder="Search" />
                            <button className="btn btn-primary" type="button">Search</button>
                        </form>
                        <div className="ms-4 dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="image.png" alt="profile" style={{ width: '40px', borderRadius: '50%' }} className="rounded-pill" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end mt-4" aria-labelledby="profileDropdown">
                            <li><a className="dropdown-item">{user && user.Username}</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/userprofile">Manage Your Profile</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Welcomepage_User;
