import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function NewPasswordOTPDriver() {
  const [emailid, setEmailid] = useState('');
  const [otp, setOtp] = useState('');
  const [newpass, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const [formData, setFormData] = useState({
    emailid: '',
    otp: '',
    newpass: '',
  })


  const handleUpdatePassOTP = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const { emailid, otp, newpass } = formData;
    
      const response = await axios.post('http://localhost:5000/driver/updatepasswordotp', {
        emailid: emailid,
        otp: otp,
        newpass: newpass
      });
      console.log(response);
      navigate('/loginDriver');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleBack = () => {
    navigate('/forgotpassotpDriver');
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
      fontSize: '30px',
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
            <h2 style={styles.title}>Update Password</h2>
              <input style={styles.input} type="text" name='emailid' class="form-control" id="emailid" placeholder="Enter Email Id" onChange={handleInputChange} />
              <input style={styles.input} type="text" name='otp' class="form-control" id="otp" placeholder="Enter OTP" onChange={handleInputChange} />
              <input style={styles.input} type="text" name='newpass' class="form-control" id="newpass" placeholder="Enter New Password" onChange={handleInputChange} />
            </div>
            <button style={styles.button} onClick={handleUpdatePassOTP}>Forgot Password</button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPasswordOTPDriver;
