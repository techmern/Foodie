
import test from './Navbar_Driver.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [drivername, setDriverName] = useState('');

    useEffect(() => {
        const driver = JSON.parse(localStorage.getItem('driver'));
        if (driver && driver.drivername) {
            setDriverName(driver.drivername);
        }
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem('driver');
            navigate('/loginDriver');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleProfile = () => {
        navigate('/viewprofileDriver');
    };

    return (
        <nav className={test.navbarStyle}>
            <div className={test.logo} onClick={() => handleNavigation('/welcomedriver')}>
                <img src={`${process.env.PUBLIC_URL}/Driveria.png`} alt="Logo" className={test.logoIcon} />
            </div>
            <ul className={test.navListStyle}>
                <li className={test.navItemStyle}><a href="" onClick={() => handleNavigation('/welcomedriver')} className={test.navLinkStyle}>Home</a></li>
                <li className={test.navItemStyle}><a href="" onClick={() => handleNavigation('/viewMyPastOrderDriver')}  className={test.navLinkStyle}>View Completed Order</a></li>
                <li className={test.navItemStyle}><a href="" onClick={() => handleNavigation('/viewEarningDriver')}  className={test.navLinkStyle}>View Earning</a></li>
                <li className={test.navItemStyle}><a href="" className={test.navLinkStyle}>Contact</a></li>
            </ul>
            <div className={test.profileSection}>
                <span className={test.drivername}>{drivername}</span>
                <div className={test.dropdownprofile} onClick={toggleDropdown}>
                    <img src={`${process.env.PUBLIC_URL}/profile.png`} className={test.profileIcon} alt="profile" title='Profile/Logout' />
                    {showDropdown && (
                        <div className={test.dropdowncontentprofile}>
                            <a href="" title="View/Edit Profile" onClick={handleProfile}>Profile</a>
                            <a href="" title="Logout" onClick={handleLogout}>Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
