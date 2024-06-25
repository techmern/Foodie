import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import test from './Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate();
    const loguser = localStorage.getItem('restaurants');
    const token = localStorage.getItem('token');

    const [showDropdown, setShowDropdown] = useState(false);
    const [restaurantData, setRestaurantData] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate('/loginRestaurant');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (loguser) {
            setRestaurantData(JSON.parse(loguser));
        }
    }, [loguser]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/restaurant/logout', { token });
            if (res.data.logout_sts === 0) {
                localStorage.removeItem('token');
                localStorage.removeItem('restaurants');
                navigate('/loginRestaurant');
            } else {
                console.log("Logout Failed due to server issue");
            }
        } catch (error) {
            console.error('Error updating logout time:', error);
        }
    };

    const handleProfile = () => {
        if (!token) {
            navigate('/loginRestaurant');
        } else {
            navigate('/viewprofileRestaurant');
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };


    return (
        <nav className={test.navbarStyle}>
            <div className={test.logo}>
                <img src={`${process.env.PUBLIC_URL}/Driveria.png`} alt="Logo" className={test.logoIcon} />
            </div>
            <ul className={test.navListStyle}>
                <li className={test.navItemStyle}><a href="" onClick={() => handleNavigation('/welcomeRestaurant')} className={test.navLinkStyle}>Home</a></li>
                <li className={test.navItemStyle}>
                    <div className={test.dropdown}>
                        <a href="" className={test.navLinkStyle}>Table</a>
                        <div className={test.dropdowncontent}>
                            <a href="" onClick={() => handleNavigation('/addtableRestaurant')}>Add Table</a>
                            <a href="" onClick={() => handleNavigation('/viewTableRestaurant')}>View Table</a>
                        </div>
                    </div>
                </li>
                <li className={test.navItemStyle}>
                    <div className={test.dropdown}>
                        <a href="" className={test.navLinkStyle}>Menu</a>
                        <div className={test.dropdowncontent}>
                            <a href="" onClick={() => handleNavigation('/addfooditemRestaurant')}>Add Food Item</a>
                            <a href="" onClick={() => handleNavigation('/viewfooditemRestaurant')}>View Food Item</a>
                        </div>
                    </div>
                </li>
                <li className={test.navItemStyle}>
                    <div className={test.dropdown}>
                        <a href="" className={test.navLinkStyle}>Order</a>
                        <div className={test.dropdowncontent}>
                            <a href="" onClick={() => handleNavigation('/vieworderRestaurant')}>View Order</a>
                            <a href="" onClick={() => handleNavigation('/viewCompletedorderRestaurant')}>View Completed Order</a>
                            <a href="" onClick={() => handleNavigation('/viewCancelledorderRestaurant')}>View Cancelled Order</a>
                        </div>
                    </div>
                </li>
                <li className={test.navItemStyle}>
                    <div className={test.dropdown}>
                        <a href="" className={test.navLinkStyle}>Rating</a>
                        <div className={test.dropdowncontent}>
                            <a href="" onClick={() => handleNavigation('/viewRatingRestaurant')}>View Restaurant Rating</a>
                        </div>
                    </div>
                </li>

                <li className={test.navItemStyle}>
                    <div className={test.dropdown}>
                        <a href="" className={test.navLinkStyle}>Earning</a>
                        <div className={test.dropdowncontent}>
                            <a href="" onClick={() => handleNavigation('/viewEarningRestaurant')}>View Earning</a>
                            <a href="" onClick={() => handleNavigation('/viewPaymentRestaurant')}>View Payment</a>
                        </div>
                    </div>
                </li>

                <li className={test.navItemStyle}><a href="" className={test.navLinkStyle}>About</a></li>
                <li className={test.navItemStyle}><a href="" className={test.navLinkStyle}>Contact</a></li>
            </ul>
            <div className={test.dropdownprofile} onClick={toggleDropdown}>
                {restaurantData && restaurantData.restaurantImg ? (
                    <img src={`http://localhost:5000/restaurantlogo/${restaurantData.restaurantImg}`} className={test.profileIcon} alt="profile" />
                ) : (
                    <img src={`${process.env.PUBLIC_URL}/profile.png`} className={test.profileIcon} alt="profile" />
                )}
                {showDropdown && (
                    <div className={test.dropdowncontentprofile}>
                        <a href="" onClick={handleProfile} title="View/Edit Profile">Profile</a>
                        <a href="" onClick={handleLogout} title="Logout">Logout</a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
