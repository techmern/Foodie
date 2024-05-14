import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PopupBox from './PopupBox';


function Restaurant_View_Food_Item() {

  const style = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      maxWidth: '1200px',
      margin: 'auto',
      marginTop: '30px',
    },
    
    itemContainer: {
      width: '30%',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    
    image: {
      display: 'flex',
      justifyContent: 'center',
      width: '150px',
      height: '150px',
      margin: 'auto',
      border: '1px solid #ccc',
      borderRadius: '25px',
      objectFit: 'cover',
    },
    itemName: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    itemPrice: {
      fontSize: '16px',
      marginBottom: '10px',
    },
    readMoreButton: {
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
      textAlign: 'center',
      marginTop: 'auto',
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

  };


  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [resData, setResData] = useState([]);

  const loggedInRestaurant = JSON.parse(localStorage.getItem('restaurants'));
  const restaurants = loggedInRestaurant || {};

  

  const getRes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/restaurantmenu/viewMenu");
      const filteredData = res.data.filter(item => item.restaurant_id._id === loggedInRestaurant._id);
      setResData(filteredData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!loggedInRestaurant) {
      navigate('/loginRestaurant');
    } else {
      getRes();
    }
  }, [loggedInRestaurant]);

  const handleReadMore = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
    {restaurants && restaurants.restaurantname && (
      <div style={style.titlemenu}>{restaurants.restaurantname}'s Menu</div>
    )}
    <div style={style.container}>
      {resData.map((item, index) => (
        <div key={index} style={style.itemContainer}>
          <img src={`http://localhost:5000/foodmenu/${item.food_itemImg}`} style={style.image} />
          <div style={style.itemName}>{item.item_name}</div>
          <div style={style.itemPrice}>{item.item_price} Rs.</div>

          <button style={style.readMoreButton} onClick={() => handleReadMore(item)}>Read More</button>

        </div>
      ))}
      {showPopup && selectedItem && <PopupBox item={selectedItem} onClose={handleClosePopup} />}
    </div>
  </div>
  );
}

export default Restaurant_View_Food_Item;


