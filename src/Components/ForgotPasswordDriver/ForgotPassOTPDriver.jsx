import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassOTPDriver() {
  const [emailid, setEmailid] = useState('');
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
 

  const handleInputChange = (e) => {
    setEmailid(e.target.value);
  };

  const generateRandomDigits = (length) => {
    let randomDigits = '';
    for (let i = 0; i < length; i++) {
      randomDigits += Math.floor(Math.random() * 10);
    }
    return randomDigits;
  };

  const handleSubmit = async () => {
    const newOTP = generateRandomDigits(6);
    const formData = { emailid, otp: newOTP };
    console.log(newOTP);
    try {
        const res = await axios.post("http://localhost:5000/forgototpdriver/forgotpassotp", formData);
        setOTP(newOTP);
        navigate('/newpasswordotpDriver');
    } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 400) {
            setErrors({ emailid: "Invalid email ID" }); // Here, setErrors should be used
        }
    }
};


  const handleBack = () => {
    navigate('/loginDriver');
  };

  const styles = {
    container: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      overflow: 'hidden',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url(/food-delivery-boy.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.5,
      zIndex: -1,
    },
    box: {
      display: 'flex',
      width: '60%',
      height: '60%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      zIndex: 1,
    },
    imageContainer: {
      width: '50%',
      height: '100%',
      background: 'url(/food-delivery.jpg) no-repeat center center',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    },
    formContainer: {
      width: '60%',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    input: {
      margin: '10px 0',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      margin: '10px 0',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: 'white',
      cursor: 'pointer',
    },
    title: {
      marginBottom: '20px',
      fontSize: '25px',
      textAlign: 'center',
      fontFamily: "'Lobster', cursive",
    },
    forgotPassword: {
      marginTop: '10px',
      textAlign: 'center',
    },
    h1: {
      fontSize: "35px",
      fontWeight: 400,
      textAlign: "center",
      letterSpacing: "9px",
      wordSpacing: "4px",
      margin: "40px 0",
      color: "#fff",
      fontFamily: "'Lobster', cursive",
    },
    span: {
      color: "red",
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
  };

  return (
    <div>
      <div style={styles.container}>
      <button style={styles.backButton} onClick={handleBack} onMouseEnter={(e) => (e.target.style.background = '#e0a800')} onMouseLeave={(e) => (e.target.style.background = 'red')}>Back</button>
        <div style={styles.backgroundImage}></div>
        <div style={styles.box}>
          <div style={styles.imageContainer}></div>
          <div style={styles.formContainer}>
            <div class="mb-3">
            {errors.emailid && <span style={styles.span}>{errors.emailid}</span>}
            <h2 style={styles.title}>Forgot Password Form For Driver</h2>
              <input style={styles.input} type="text" name='emailid' class="form-control" id="emailid" placeholder="Enter Email Id" onChange={handleInputChange} />
            </div>
            <button style={styles.button} onClick={handleSubmit}>Forgot Password</button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassOTPDriver;
