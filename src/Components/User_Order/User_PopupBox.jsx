import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PopupBox = ({ item, onClose }) => {
    const style = {
        image: {
            width: '300px',
            height: '300px',
            margin: 'auto',
            border: '1px solid #ccc',
            borderRadius: '25px',
            objectFit: 'cover',
            display: 'flex',
            justifyContent: 'center',
        },
        popupContainer: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            zIndex: '999',
        },
        closeSign: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '24px',
            cursor: 'pointer',
        },
        Button: {
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            textDecoration: 'none',
            textAlign: 'center',
            marginTop: 'auto',
            marginRight: '15px',
        },
    };

    const loggedInRestaurant = JSON.parse(localStorage.getItem('restaurants'));
    const [resData, setResData] = useState([]);
    const navigate = useNavigate();

    const handleEdit = (itemid) => {
        navigate(`/editmenu/${itemid}`);
    }

    const handleEditImage = (itemid) => {
        navigate(`/editmenuimage/${itemid}`);
    }

    const getRes = async () => {
        try {
            const res = await axios.get("http://localhost:5000/restaurantmenu/viewMenu");
            const filteredData = res.data.filter(item => item.restaurant_id._id === loggedInRestaurant._id);
            setResData(filteredData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (itemid) => {
        try {
            const res = await axios.delete(`http://localhost:5000/restaurantmenu/deleteItem/${itemid}`);
            if (res.data.sts === '1') {
                alert(res.data.msg);
                onClose();
                getRes();
            } else {
                console.error("Deletion failed:", res.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="popup-container" style={style.popupContainer}>
            <span style={style.closeSign} onClick={onClose}>X</span>
            <div className="popup-content">
                <img src={`http://localhost:5000/foodmenu/${item.food_itemImg}`} alt={item.item_name} style={style.image} />
                <h2>{item.item_name}</h2>
                <p>Price: {item.item_price} Rs.</p>
                <p>Ingredients: {item.item_ingredients}</p>
                <p>Description: {item.item_description}</p>
                <p>Category: {item.food_category}
                    {item.food_category !== 'Both' ? (
                        <span></span>
                    ) : (
                        <span> (Regular And Jain)</span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default PopupBox;
