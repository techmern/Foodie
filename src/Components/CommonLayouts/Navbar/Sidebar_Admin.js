import React, { useState } from 'react'
import { FaTachometerAlt, FaUsers, FaCog, FaSignOutAlt, FaAngleDown, FaAngleUp,FaUtensils,FaPlus ,FaList,FaCity,FaBicycle} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Sidebar_Admin() {
    const navigate = useNavigate();
    const [isDriverSubMenuOpen, setIsDriverSubMenuOpen] = useState(false);
    const [isCitySubMenuOpen, setIsCitySubMenuOpen] = useState(false);

    const styles = {
        container: {
            display: 'flex',
            height: '100vh',
            backgroundColor: '#f0f0f0',
        },
        sidebar: {
            width: '250px',
            backgroundColor: '#333',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
        },
        logo: {
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#4CAF50',
        },
        navLink: {
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            textDecoration: 'none',
            padding: '10px 15px',
            width: '100%',
            textAlign: 'left',
            margin: '10px 0',
            backgroundColor: '#444',
            borderRadius: '5px',
            transition: 'background-color 0.3s',
        },
        navLinkHovered: {
            backgroundColor: '#555',
        },
        navLinkIcon: {
            marginRight: '10px',
        },
        mainContent: {
            flexGrow: 1,
            padding: '20px',
            backgroundColor: '#fff',
        },
        logoIcon: {
            width: '100px',
            height: '70px',
            borderRadius: '50px',
        },
        subMenu: {
            backgroundColor: '#555',
            borderRadius: '5px',
            width: '100%',
        },
        subMenuLink: {
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            textDecoration: 'none',
            padding: '5px 15px',
            textAlign: 'left',
            margin: '0',
            backgroundColor: '#444',
            borderRadius: '5px',
            transition: 'background-color 0.3s',
        },
        subMenuLinkHovered: {
            color: '#4CAF50',
        },
    };

    const toggleDriverSubMenu = () => {
        setIsDriverSubMenuOpen(!isDriverSubMenuOpen);
    };

    const toggleCitySubMenu = () => {
        setIsCitySubMenuOpen(!isCitySubMenuOpen);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem('admin');
            navigate('/loginAdmin');
        } catch (error) {
            console.error('Error updating logout time:', error);
        }
    };

    const handleAddDriverClick = () => {
        navigate('/addDriverAdmin');
    };

    const handleViewDriversClick = () => {
        navigate('/viewDriverAdmin');
    };

    const handleAddCityClick = () => {
        navigate('/addCityAdmin');
    };

    const handleViewCityClick = () => {
        navigate('/viewCityAdmin');
    };
    
    const handleViewRestaurant = () =>{
        navigate('/viewRestaurantAdmin');
    }

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <img src={`${process.env.PUBLIC_URL}/Driveria.png`} alt="Logo" style={styles.logoIcon} />
                <div style={styles.logo}>Admin Panel</div>
                <a href="/welcomeAdmin" style={styles.navLink}>
                    <FaTachometerAlt style={styles.navLinkIcon} />
                    Dashboard
                </a>
                
                <div style={{ ...styles.navLink, cursor: 'pointer' }} onClick={toggleCitySubMenu}>
                    <FaCity style={styles.navLinkIcon} />
                    Manage City
                    {isCitySubMenuOpen ? <FaAngleUp style={{ marginLeft: 'auto' }} /> : <FaAngleDown style={{ marginLeft: 'auto' }} />}
                </div>
                {isCitySubMenuOpen && (
                    <div style={styles.subMenu}>
                        <a href="" style={{ ...styles.subMenuLink }} onClick={handleAddCityClick} title='Add City'>
                            <FaPlus style={styles.navLinkIcon}/>
                            Add City
                        </a>

                        <a href="" style={{ ...styles.subMenuLink }} onClick={handleViewCityClick} title='View Citys'>
                            <FaList style={styles.navLinkIcon}/>
                            View City
                        </a>
                    </div>
                )}

                <div style={{ ...styles.navLink, cursor: 'pointer' }} onClick={toggleDriverSubMenu}>
                    <FaBicycle style={styles.navLinkIcon} />
                    Manage Driver
                    {isDriverSubMenuOpen ? <FaAngleUp style={{ marginLeft: 'auto' }} /> : <FaAngleDown style={{ marginLeft: 'auto' }} />}
                </div>
                {isDriverSubMenuOpen && (
                    <div style={styles.subMenu}>
                        <a href="" style={{ ...styles.subMenuLink }} onClick={handleAddDriverClick} title='Add Driver'>
                            <FaPlus style={styles.navLinkIcon}/>
                            Add Driver
                        </a>

                        <a href="" style={{ ...styles.subMenuLink }} onClick={handleViewDriversClick} title='View Drivers'>
                            <FaList style={styles.navLinkIcon}/>
                            View Driver
                        </a>
                    </div>
                )}
                <a href="" style={styles.navLink}  onClick={handleViewRestaurant} title='View Restaurant'>
                    <FaUtensils style={styles.navLinkIcon} />
                    View Restaurant
                </a>
                <a href="" style={styles.navLink}>
                    <FaCog style={styles.navLinkIcon} />
                    Settings
                </a>
                <a href="" style={styles.navLink} onClick={handleLogout} title="Logout">
                    <FaSignOutAlt style={styles.navLinkIcon} />
                    Logout
                </a>
            </div>
            <div style={styles.mainContent}></div>
        </div>
    );
}
