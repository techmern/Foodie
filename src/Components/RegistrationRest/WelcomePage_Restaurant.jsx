import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import test from './EditProfle.module.css'
import axios from 'axios';

const WelcomePage = () => {

    const navigate = useNavigate();

    const loguser = localStorage.getItem('restaurants')
    const token = localStorage.getItem('token')

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token===null){
                navigate('/loginRestaurant');
            }
    })
  
    const restaurants = JSON.parse(loguser);

    const [tokendt, settokendt] = useState({
      token
    });

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(' http://localhost:5000/restaurant/logout',tokendt)
            if (res.data.logout_sts===0) {
                localStorage.removeItem('token')
                localStorage.removeItem('restaurants')
                navigate('/loginRestaurant');
            } else {
                console.log("Logout Failed due to server issue");
            }
        } catch (error) {
            console.error('Error updating logout time:', error);
        }
    }

    const handleProfile = () => {
        const loguser = localStorage.getItem('restaurants')

        if (token === ''){
            navigate('/loginRestaurant');
        }

        if (!loguser) {
            navigate('/loginRestaurant');

        }
        else {
            navigate('/viewprofileRestaurant');
        }
    }
    const handleTable = () => {
        navigate('/addtableRestaurant');
    }

    
    const handleTableView = () => {
        const loguser = localStorage.getItem('restaurants')

        if (!loguser) {
            navigate('/loginRestaurant');
        } else {
            navigate('/viewTableRestaurant');
        }
    }

    const handleFoodItem = () => {
        navigate('/addfooditemRestaurant');
    }


    const handleFoodItemView = () => {
        const loguser = localStorage.getItem('restaurants')

        if (!loguser) {
            navigate('/loginRestaurant');
        } else {
            navigate('/viewfooditemRestaurant');
        }
    }

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (

        <div>

            <nav className={test.navbarStyle}>
                <div className={test.logo}>
                    <img src="./Driveria.png" alt="Logo" className={test.logoIcon} />
                </div>
                <ul className={test.navListStyle}>
                    <li className={test.navItemStyle}><a href="" className={test.navLinkStyle}>Home</a></li>
                    
                    <li className={test.navItemStyle}>
                        <div className={test.dropdown}>
                            <a href="" className={test.navLinkStyle}>Table</a>
                            <div className={test.dropdowncontent}>
                                <a href="" onClick={handleTable}>Add Table</a>
                                <a href="" onClick={handleTableView}>View Table</a>
                            </div>
                        </div>
                    </li>
                    

                    <li className={test.navItemStyle}>
                        <div className={test.dropdown}>
                            <a href="" className={test.navLinkStyle}>Menu</a>
                            <div className={test.dropdowncontent}>
                                <a href="" onClick={handleFoodItem}>Add Food Item</a>
                                <a href="" onClick={handleFoodItemView}>View Food Item</a>
                            </div>
                        </div>
                    </li>
                    
                    <li className={test.navItemStyle}><a href="" className={test.navLinkStyle}>About</a></li>
                   
                    <li className={test.navItemStyle}><a href="" className={test.navLinkStyle}>Contact</a></li>

                </ul>

                <div className={test.dropdownprofile} onClick={toggleDropdown}>
                    <img src={'./profile.png'} className={test.profileIcon} />
                    {showDropdown && (
                        <div className={test.dropdowncontentprofile}>
                            <a href="" onClick={handleProfile} title="View/Edit Profile">Profile</a>
                            <a href="" onClick={handleLogout} title="Logout">Logout</a>
                        </div>
                    )}
                </div>
            </nav>


            <div className={test.bodycolor}>

                {/* <p>Token is : {token}</p> */}

            </div>

        </div>
    );
};

export default WelcomePage;
