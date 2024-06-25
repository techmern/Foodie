import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PopupBox from './User_PopupBox';

export default function User_View_Menu() {
    const navigate = useNavigate();
    const { restaurant_id } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/restaurantmenu/viewMenuUser/${restaurant_id}`);
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    };

    const style = {
        menuItemContainer: {
            marginBottom: '20px'
        },
        menuItem: {
            display: 'flex',
            border: '1px solid #ccc',
            borderRadius: '10px',
            overflow: 'hidden',
            marginLeft: '30px'
        },
        menuItemDetails: {
            padding: '20px',
            flex: 1
        },
        menuItemImage: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
        },
        menuItemImageImg: {
            width: '200px',
            height: '200px',
            borderRadius: '10px',
            marginBottom: '10px',
            marginTop: '10px'
        },
        soldOutTag: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'red',
            color: 'white',
            padding: '5px',
            borderRadius: '5px'
        },
        titlemenu: {
            fontSize: '26px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'center',
            color: 'black',
            fontWeight: 'bold',
            textDecoration: 'underline'
        },
        searchInput: {
            width: '500px',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            justifyContent: 'right',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            marginLeft:'40px'
        },
       
    };

    const handleReadMore = (menuItem) => {
        setSelectedItem(menuItem);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleAddToCart = (menuItem) => {
        navigate('/addtocartuser', { state: { selectedItem: menuItem } });
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredMenuItems = menuItems.filter((menuItem) =>
        menuItem.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <div style={style.titlemenu}>{menuItems.length > 0 && `${menuItems[0].restaurant_id.restaurantname}'s Menu`}</div>
            <input type="text" placeholder="Search by Dishes"value={searchQuery}onChange={handleSearchChange}style={style.searchInput}/>
            <div>
                {filteredMenuItems.map((menuItem) => (
                    <div key={menuItem._id} style={style.menuItemContainer}>
                        <div style={style.menuItem}>
                            <div style={style.menuItemDetails}>
                                <h5>{menuItem.item_name}</h5>
                                <p style={{fontSize:'20px'}}>{menuItem.item_price} Rs.</p>
                                <p>{menuItem.item_ingredients}</p>
                                {menuItem.food_category !== 'Both' ? (
                                    <span style={{ color: 'red' }}>Regular Food Only</span>
                                ) : (
                                    <span style={{ color: 'red' }}>Regular And Jain Both are Available </span>
                                )}
                                <br />
                                {menuItem.food_availability !== 'Not Available' ? (
                                    <span></span>
                                ) : (
                                    <button className="btn btn-primary" style={{ marginBottom: '10px', width: '100px' }} disabled>Sold Out</button>
                                )}
                            </div>
                            <div style={style.menuItemImage}>
                                <img src={`http://localhost:5000/foodmenu/${menuItem.food_itemImg}`} alt={menuItem.item_name} title='View More Detail' onClick={() => handleReadMore(menuItem)} style={style.menuItemImageImg} />
                                {menuItem.food_availability !== 'Not Available' ? (
                                    <button className="btn btn-primary" style={{ marginBottom: '10px', width: '100px' }} onClick={() => handleAddToCart(menuItem)}>Add</button>
                                ) : (
                                    <button className="btn btn-primary" style={{ marginBottom: '10px', width: '100px' }} disabled>Add</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showPopup && selectedItem && <PopupBox item={selectedItem} onClose={handleClosePopup} />}
        </div>
    );
}
