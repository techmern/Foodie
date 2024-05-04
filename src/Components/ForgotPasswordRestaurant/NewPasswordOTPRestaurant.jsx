import React, { useState } from 'react'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';



function NewPasswordOTP() {

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
      const bcryptPassword = await bcrypt.hash(newpass, 10);
      const response = await axios.post('http://localhost:5000/restaurant/updatepasswordotp', {
        emailid: emailid,
        otp: otp,
        newpass: bcryptPassword
      });
      console.log(response);
      navigate('/loginRestaurant');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  }

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

  return (
    <div>


      <h1 style={style.h1}><span style={style.span}>Update Password</span></h1>
      <div style={style.wthreeForm}>

        <h2 style={style.h2}>Fill out the form below to Update Password</h2>


        <div class="w3l-login form">


          <div class="mb-3"> 
            <input style={style.input} type="text" name='emailid' class="form-control" id="emailid" placeholder="Enter Email Id" onChange={handleInputChange} />
          </div>

          <div class="mb-3">
           <input style={style.input} type="text" name='otp' class="form-control" id="otp" placeholder="Enter OTP" onChange={handleInputChange} />
          </div>

          <div class="mb-3">
            <input style={style.input} type="text" name='newpass' class="form-control" id="newpass" placeholder="Enter New Password" onChange={handleInputChange} />
          </div>
          <div>
         
            <input type="button" value="Update Password" onClick={handleUpdatePassOTP} style={style.button}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#fff';
                e.target.style.borderRadius = '2em';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = 'black';
                e.target.style.transition = '0.5s all';
              }} />
            
          </div>


          <br />

        </div>
      </div>
    </div>
  )
}

export default NewPasswordOTP