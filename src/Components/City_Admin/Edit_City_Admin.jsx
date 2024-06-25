import React, { useEffect, useState } from 'react';
import Sidebar from '../CommonLayouts/Navbar/Sidebar_Admin';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Edit_City_Admin() {

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
    },
    content: {
      flex: 1,
      padding: '20px',
    },
    form: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #dddddd',
      borderRadius: '5px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    },
    label: {
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      border: '1px solid #dddddd',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
      width: '100%',
    },
    select: {
      border: '1px solid #dddddd',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
      width: '100%',
      appearance: 'none',
      backgroundSize: '12px',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '100%',
    },
    h1: {
      fontSize: '45px',
      fontWeight: 400,
      textAlign: 'center',
      letterSpacing: '9px',
      wordSpacing: '4px',
      margin: '40px 0',
      color: 'black',
    },
  };

  const [formData, setFormData] = useState({
    cityname: '',
    city_postalcode: '',
    citystatus: 'Available',
  });

  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { cityId } = useParams();

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/city/getCity/${cityId}`);
        if (response.data) {
          setFormData(response.data);
        } else {
          alert('City not found');
        }
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCityData();
  }, [cityId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/city/updateCity/${cityId}`, formData);
      if (response.data.sts === '1') {
        alert('City updated successfully');
        navigate('/viewCityAdmin');
      } else {
        alert('Failed to update city');
      }
    } catch (error) {
      console.error('Error updating city:', error);
      alert('Error updating city');
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h1 style={styles.h1}>Edit City</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label} htmlFor="cityname">City Name:</label>
          <input
            style={styles.input}
            type="text"
            id="cityname"
            name="cityname"
            value={formData.cityname}
            onChange={handleInputChange}
            required
          />

          <label style={styles.label} htmlFor="city_postalcode">Postal Code:</label>
          <input
            style={styles.input}
            type="text"
            id="city_postalcode"
            name="city_postalcode"
            value={formData.city_postalcode}
            onChange={handleInputChange}
            required
          />

          <label style={styles.label} htmlFor="citystatus">City Status:</label>
          <select
            style={styles.select}
            id="citystatus"
            name="citystatus"
            value={formData.citystatus}
            onChange={handleInputChange}
            required
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>

          <button style={styles.button} type="submit">Update City</button>
        </form>
      </div>
    </div>
  );
}

export default Edit_City_Admin;
