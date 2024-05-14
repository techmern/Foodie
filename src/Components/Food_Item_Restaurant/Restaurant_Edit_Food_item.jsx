import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';
import axios from 'axios';

function RestaurantEditFoodItem() {

  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false)
  const [msg, setMsg] = useState('')
  const [type, setType] = useState('')

  const [menuData, setMenuData] = useState({});

  const { itemid } = useParams();

  const style = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
     
    },
    header: {
      backgroundColor: '#f9f9f9',
      color: 'black',
      padding: '20px',
      fontSize: "45px",
      fontWeight: 400,
      textAlign: "center",
      letterSpacing: "9px",
      wordSpacing: "4px",
      margin: "auto",
      fontFamily: "'Lobster', cursive",
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },

    backButton: {
      position: 'absolute',
      left: '20px',
      top: '20px',
      padding: '10px 20px',
      backgroundColor: 'red',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
   mainContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
    },
    formContainer: {
      backgroundColor: "#f9f9f9",
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '500px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    input: {
      marginBottom: '20px',
      width: '100%',
      padding: '12px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '16px',
    },
    select: {
      marginBottom: '20px',
      width: '100%',
      padding: '12px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '16px',
      appearance: 'none',
      background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23989898\'%3E%3Cpath d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E") no-repeat right 12px center/14px auto',
    },
    button: {
      fontSize: '1em',
      fontWeight: 500,
      textAlign: 'center',
      letterSpacing: '3px',
      margin: '20px 20px 20px 120px',
      padding: '8px 0',
      border: '2px solid red',
      outline: 'none',
      cursor: 'pointer',
      width: '50%',
      boxSizing: 'border-box',
      transition: '0.5s all',
      borderRadius: '2em',
      backgroundColor: 'red',
      color: 'white',
    },

    buttonHover: {
      fontSize: '1em',
      fontWeight: 500,
      textAlign: 'center',
      borderRadius: '2em',
      border: '2px solid #fff',
      padding: '8px 0',
      outline: 'none',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: '#fff',
    },
    image: {
      width: '200px',
      height: '200px',
      margin: 'auto',
      border: '1px solid #ccc',
      borderRadius: '25px',
      objectFit: 'cover',
      display: 'flex',
      justifyContent: 'center',
      marginBottom:'5px'
    },
    h1: {
      fontSize: "45px",
      fontWeight: 400,
      textAlign: "center",
      letterSpacing: "9px",
      wordSpacing: "4px",
      margin: "auto",
      color: "#fff",
      fontFamily: "'Lobster', cursive",
    },
    span: {
      color: "red"
    },
  };

  const [formData, setFormData] = useState({
    item_name: '',
    item_price: '',
    item_ingredients:'',
    item_description:'',
    food_availability:'',
    food_category: '',
    restaurant_id: '',
    food_itemImg: '',
  });

  const [errors, setErrors] = useState({
    item_name: '',
    item_price: '',
    item_ingredients:'',
    item_description:'',
    food_availability:'',
    food_category: '',
    restaurant_id: '',
    food_itemImg: '',
  })

  const handleBack = () => {
    navigate('/viewfooditemRestaurant');
  };

  
  useEffect(() => {
    const loguser = localStorage.getItem('restaurants');
        const restaurants = loguser ? JSON.parse(loguser) : {}; 
      
    if (!loguser) {
      navigate('/loginRestaurant');
      return;
    }
    fetchMenuData(itemid);
}, [itemid]);


const fetchMenuData = async (itemid) => {
  try {
    const res = await axios.get(`http://localhost:5000/restaurantmenu/getMenu/${itemid}`);
    console.log(res.data.food_category);
      setMenuData(res.data);
      setFormData({
          item_name: res.data.item_name,
          item_price: res.data.item_price,
          item_ingredients: res.data.item_ingredients,
          item_description: res.data.item_description,
          food_availability: res.data.food_availability,
          food_category: res.data.food_category,
          food_itemImg: res.data.food_itemImg,
      });
  } catch (error) {
      console.error(error);
  }
};

  const handleSubmit = async (e) => {
    try {
      try {
        if (!formData.item_name.trim()) {
            setShowToast(true);
            setMsg('Please enter Item Name');
            setType('error');
            return;
        }
        if (!formData.item_price.trim()) {
            setShowToast(true);
            setMsg('Please enter Item Price');
            setType('error');
            return;
        }
        if (!formData.item_ingredients.trim()) {
            setShowToast(true);
            setMsg('Please enter Item Ingredients');
            setType('error');
            return;
        }
        if (!formData.item_description.trim()) {
            setShowToast(true);
            setMsg('Please enter Item Description');
            setType('error');
            return;
        }
        const res = await axios.put(`http://localhost:5000/restaurantmenu/updateMenu/${itemid}`, formData);
        if (res.data.sts === '1') {
            alert(res.data.msg);
            navigate('/viewfooditemRestaurant');
        } else {
            console.error("Deletion failed:", res.data.error);
        }

    } catch (error) {
        console.error(error)
    }


    } catch (error) {
      console.error(error)
    }

  }

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

  return (
    <div>
    <header style={style.header}>
      <h1>Update Food Item Details</h1>
    </header>

    <button style={style.backButton} onClick={handleBack}>Back</button>

    <div style={style.mainContainer}>
      <div style={style.formContainer}>

        <img src={`http://localhost:5000/foodmenu/${formData.food_itemImg}`} alt="Logo" style={style.image}/>
        <form>
          <label style={style.label} className="form-label">Food Item Name  :</label>
          <input type="text" placeholder="Food Name" style={style.input} name='item_name'  value={formData.item_name} />

          <label style={style.label} className="form-label">Food Item Price  :</label>
          <input type="text" placeholder="Price" style={style.input} name='item_price'  value={formData.item_price}/>

          <label style={style.label} className="form-label">Food Item Ingredients  :</label>
          <input type="text" placeholder="Ingredients" style={style.input} name='item_ingredients'  value={formData.item_ingredients}/>

          <label style={style.label} className="form-label">Food Item Description  :</label>
          <textarea placeholder="Description" style={style.input} name='item_description'  value={formData.item_description}></textarea>

          <label style={style.label} htmlFor="food_availability" className="form-label">Food Item Availability:</label>
          <select style={style.input}  value={formData.food_availability} onChange={handleChange} name="food_availability" id="food_availability">
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
          <label style={style.label} htmlFor="food_category" className="form-label">Food Item Category  :</label>
          <select style={style.input}  value={formData.food_category} onChange={handleChange} name="food_category" id="food_category" >
            <option value="jain">Jain</option>
            <option value="Regular">Regular</option>
            <option value="Both">Both</option>
          </select>

             <div class="submit-agileits">
              <input type="button" value="Update" onClick={handleSubmit} id='Submit' name='Submit' style={style.button}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f0f0f0';
                  e.target.style.color = 'red';
                  e.target.style.borderRadius = '2em';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'red';
                  e.target.style.color = 'white';
                  e.target.style.transition = '0.5s all';
                }} />

            </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default RestaurantEditFoodItem;
