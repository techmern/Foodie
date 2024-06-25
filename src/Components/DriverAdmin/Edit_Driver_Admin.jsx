import React, { useEffect, useState } from 'react'
import Sidebar from '../CommonLayouts/Navbar/Sidebar_Admin';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';

export default function Edit_Driver_Admin() {

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
    },
    content: {
      flex: '1',
      padding: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '500px',
      margin: 'auto',
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
    button: {
      marginTop: '10px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    h1: {
      fontSize: "45px",
      fontWeight: 400,
      textAlign: "center",
      letterSpacing: "9px",
      wordSpacing: "4px",
      marginTop: "20px",
      marginBottom: "20px",
      color: "black",
    },
  };

  const { driverId } = useParams();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false)
  const [msg, setMsg] = useState('')
  const [type, setType] = useState('')

  const [driverData, setDriverData] = useState({});
  const [cities, setCities] = useState([]);

  
  const [formData, setFormData] = useState({
    drivername: '',
    emailid: '',
    password: '',
    phone_no: '',
    city: '',
    license_no: '',
    vehicle_type: ''
});

const [errors, setErrors] = useState({
  drivername: '',
  emailid: '',
  password: '',
  phone_no: '',
  city: '',
  license_no: '',
  vehicle_type: ''
})

useEffect(() => {
  fetchDriverData(driverId);
  const fetchCities = async () => {
    try {
        const response = await axios.get('http://localhost:5000/city/viewCity');
        setCities(response.data);
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
};
fetchCities();
}, [driverId]);

const fetchDriverData = async (driverId) => {
  try {
      const res = await axios.get(`http://localhost:5000/driver/getDriver/${driverId}`);
      setDriverData(res.data);
     
      setFormData({
        drivername: res.data.drivername,
        emailid: res.data.emailid,
        password: res.data.password,
        phone_no: res.data.phone_no,
        city: res.data.city,
        license_no: res.data.license_no,
        vehicle_type: res.data.vehicle_type,
      });
  } catch (error) {
      console.error(error);
  }
};

const handleChange = (e) => {
  setFormData({
      ...formData,
      [e.target.name]: e.target.value
  });
};

const handleInputBlur = (e) => {
  const { name, value } = e.target
  if (value.trim() === '') {
      setErrors({
          ...errors,
      })
      e.preventDefault()
      setShowToast(true)
      setMsg(`${name} can not be blank`)
      setType("error")
      setTimeout(() => {
          setShowToast(false)
      }, 3000)
  }
}

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!formData.drivername.trim()) {
      setShowToast(true);
      setMsg('Please Enter Driver Name');
      setType('error');
      return;
  }
  if (!formData.emailid.trim()) {
      setShowToast(true);
      setMsg('Please Enter Email Id');
      setType('error');
      return;
  }
  if (!formData.password.trim()) {
      setShowToast(true);
      setMsg('Please Enter Password');
      setType('error');
      return;
  }
  if (!formData.phone_no.trim()) {
      setShowToast(true);
      setMsg('Please Enter Mobile Number');
      setType('error');
      return;
  }
  if (!formData.city.trim()) {
      setShowToast(true);
      setMsg('Please Enter City');
      setType('error');
      return;
  }
  if (!formData.license_no.trim()) {
      setShowToast(true);
      setMsg('Please Enter License Number');
      setType('error');
      return;
  }
  if (!formData.vehicle_type.trim()) {
      setShowToast(true);
      setMsg('Please Enter Vehicle Type');
      setType('error');
      return;
  }
      const res = await axios.put(`http://localhost:5000/driver/updateDriver/${driverId}`, formData);
      if (res.data.sts === '1') {
          alert(res.data.msg);
          navigate('/viewDriverAdmin');
      } else {
          console.error("Deletion failed:", res.data.error);
      }

  } catch (error) {
      console.error(error)
  }

}


  return (
    <div style={styles.container}>

      <Sidebar />

      <div style={styles.content}>
        <h1 style={styles.h1}>Edit Driver Details</h1>
        <form style={styles.form}>
          <label style={styles.label} htmlFor="drivername">Driver Name:</label>
          <input style={styles.input} type="text" value={formData.drivername} id="drivername" name="drivername" onBlur={handleInputBlur} onChange={handleChange} required=""/>

          <label style={styles.label} htmlFor="emailid">Email ID:</label>
          <input style={styles.input} type="email" value={formData.emailid} id="emailid" name="emailid" onBlur={handleInputBlur} onChange={handleChange} required=""/>

          <label style={styles.label} htmlFor="password">Password:</label>
          <input style={styles.input} type="text" value={formData.password} id="password" name="password" onBlur={handleInputBlur} onChange={handleChange} required=""/>

          <label style={styles.label} htmlFor="phone_no">Mobile Number:</label>
          <input style={styles.input} type="tel" value={formData.phone_no} id="phone_no" name="phone_no" onBlur={handleInputBlur} onChange={handleChange} required=""/>

          <label style={styles.label} htmlFor="city">City:</label>
          {/* <input style={styles.input} type="text" value={formData.city} id="city" name="city" onBlur={handleInputBlur} onChange={handleChange} required=""/> */}
          <div className="form-sub-w3">
                        <select name="city" id="city" value={formData.city} onChange={handleChange} required="" style={styles.input}>
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city._id} value={city.cityname}>
                                    {city.cityname}
                                </option>
                            ))}
                        </select>
                        {errors.city && <p style={styles.errorMessage}>{errors.city}</p>}
                    </div>
          <label style={styles.label} htmlFor="license_no">License Number:</label>
          <input style={styles.input} type="text" value={formData.license_no} id="license_no" name="license_no" onBlur={handleInputBlur} onChange={handleChange} required=""/>

          <label style={styles.label} htmlFor="vehicle_type">Vehicle Type:</label>
          <input style={styles.input} type="text" value={formData.vehicle_type} id="vehicle_type" name="vehicle_type" onBlur={handleInputBlur} onChange={handleChange} required=""/>

          <button style={styles.button} type="submit"  onClick={handleSubmit}>Save Changes</button>
        </form>
      </div>
    </div>
  )
}
