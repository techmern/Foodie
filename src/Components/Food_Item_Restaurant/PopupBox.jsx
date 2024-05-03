import React from 'react';

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

  return (
    <div className="popup-container" style={style.popupContainer}>
      <span style={style.closeSign} onClick={onClose}>X</span>
      <div className="popup-content">
        <img src={`http://localhost:5000/foodmenu/${item.food_itemImg}`} alt={item.item_name} style={style.image} />
        <h2>{item.item_name}</h2>
        <p>Price: {item.item_price} Rs.</p>
        <p>Ingredients: {item.item_ingredients}</p>
        <p>Description: {item.item_description}</p>
        <p>Availability: {item.food_availability}</p>
        <p>Category: {item.food_category}</p>
        <button style={style.Button}>Edit Item</button>
        <button style={style.Button}>Delete Item</button>
      </div>
    </div>
  );
};

export default PopupBox;
