import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassOTPRestaurant() {
  const [emailid, setEmailid] = useState('');
  const [otp, setOTP] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailid(value);
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
      const res = await axios.post("http://localhost:5000/forgototprestaurant/forgotpassotp", formData);
      setOTP(newOTP);
      navigate('/newpasswordotpRestaurant');
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        setErrors({ emailid: "Invalid email ID" });
      }
    }
  };

  const style = {

    wthreeForm: {
      textAlign: "center",
      backgroundColor: "#131315",
      width: "40%",
      margin: "0 auto",
      padding: "3em",
      boxShadow: "4px 4px 0px rgb(77, 78, 80)",
      opacity: 0.7,
      boxSizing: "border-box",
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

    h1: {
      fontSize: "45px",
      fontWeight: 400,
      textAlign: "center",
      letterSpacing: "9px",
      wordSpacing: "4px",
      margin: "40px 0",
      color: "#fff",
      fontFamily: "'Lobster', cursive",
    },
    h2: {
      fontSize: "20px",
      fontWeight: 400,
      textAlign: "center",
      letterSpacing: "0.1em",
      padding: "0.5em",
      color: "#fff",
      borderBottom: "2px solid red",
    },

    span: {
      color: "red",
    },

    errormsg:{
      color: "white",
    },
    button: {
      fontSize: '1em',
      fontWeight: 500,
      textAlign: 'center',
      letterSpacing: '3px',
      margin: '20px 0',
      padding: '8px 0',
      border: '2px solid #fff',
      outline: 'none',
      cursor: 'pointer',
      width: '50%',
      boxSizing: 'border-box',
      transition: '0.5s all',
      borderRadius: '2em',
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

    input: {
      fontSize: '1em',
      fontWeight: 500,
      textAlign: 'center',
      letterSpacing: '1px',
      margin: 'auto auto 10px auto',
      width: '300px',
      padding: '8px 0',
      border: '2px solid #fff',
      outline: 'none',
      boxSizing: 'border-box',
    }
  };

  const handleBack = () => {
    navigate('/loginRestaurant');
  };

  return (
    <div>
      <button style={style.backButton} onClick={handleBack} onMouseEnter={(e) => (e.target.style.background = '#e0a800')} onMouseLeave={(e) => (e.target.style.background = 'red')}>Back</button>
      <h1 style={style.h1}><span style={style.span}>Forgot Password</span></h1>
      <div style={style.wthreeForm}>
        <h2 style={style.h2}>Fill out the form below to Get OTP</h2>
        <div className="w3l-login form">
          <div className="mb-3">
          {errors.emailid && <span style={style.errormsg}>{errors.emailid}</span>}
            <input style={style.input} type="text" name='emailid' className="form-control" id="emailid" placeholder="Enter Email Id" onChange={handleInputChange} />
          </div>
          <div>
            <input type="button" value="Forgot Password" onClick={handleSubmit} style={style.button} onMouseOver={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#fff';
              e.target.style.borderRadius = '2em';
            }} onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = 'black';
              e.target.style.transition = '0.5s all';
            }} />
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassOTPRestaurant;
