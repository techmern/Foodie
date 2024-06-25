import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';

function Login_Driver() {

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
  };

  
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false)
  const [msg, setMsg] = useState('')
  const [type, setType] = useState('')
  const navigate = useNavigate();
  const [emailid, setEamilid] = useState('');
  const [password, setPassword] = useState('');

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
    if (value.trim() === '') {
        setErrors({
            ...errors,
            [name]: `${name} can not be blank`,
        });
        setTimeout(() => {
            setErrors({
                ...errors,
                [name]: '',
            });
        }, 3000);
    }
    else {

        if (name === 'emailid') {
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                setErrors({
                    ...errors,
                    [name]: 'Enter proper E-mail ID'
                })
                e.preventDefault()
                setShowToast(true)
                setMsg('Enter proper E-mail ID')
                setType("error")
                setTimeout(() => {
                    setShowToast(false)
                }, 3000)
            }
        }
        else if (name === 'password') {
            if (!/^[A-Za-z\d@#$]{5,12}$/.test(value)) {
                setErrors({
                    ...errors,
                    [name]: 'Please enter a valid password with upper case, lower case, digits (0-9), and @#$ characters',
                })
                e.preventDefault()
                setShowToast(true)
                setMsg('Please enter a valid password with upper case, lower case, digits (0-9), and @#$ characters');
                setType("error")
                setTimeout(() => {
                    setShowToast(false)
                }, 3000)
            }
        }
    }
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {

      if (!emailid.trim() || !password.trim()) {
          setShowToast(true);
          setMsg('Please Enter Email Id');
          setType('error');
          return;
      }

      if (!password.trim()) {
          setShowToast(true);
          setMsg('Please enter Password');
          setType('error');
          return;
      }

      const res = await axios.post("http://localhost:5000/driver/driverlogin", { emailid, password });
      const { msg, loginsts, driver } = res.data;
      console.log(res);

      if (loginsts === 2) {
          localStorage.setItem('driver', JSON.stringify(driver));
          navigate('/welcomedriver');
      } else {
          setErrors({
              ...errors,
          })
          e.preventDefault()
          setShowToast(true)
          setMsg(`${msg}`)
          setType("error")
          setTimeout(() => {
              setShowToast(false)
          }, 3000)
      }
  } catch (error) {
      console.error(error);
  }
};

  return (

    <div style={styles.container}>
      <div style={styles.backgroundImage}></div>
      <div style={styles.box}>
        <div style={styles.imageContainer}></div>
        <div style={styles.formContainer}>
        <ErrorMessage showToast={showToast} msg={msg} type={type} />
          <h2 style={styles.title}>Login Form For Driver</h2>
          <input type="email" placeholder="Email" name="emailid" id="emailid"  style={styles.input} onBlur={handleInputBlur}  required="" value={emailid} onChange={(e) => setEamilid(e.target.value)}/>
          <input type="text" placeholder="Password" name="password" id="password" style={styles.input} onBlur={handleInputBlur} required="" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button style={styles.button} onClick={handleSubmit}>Login</button>
          <div style={styles.forgotPassword}>
            <Link to="/forgotpassotpDriver" style={{color: '#4CAF50', textDecoration: 'none'}}>Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login_Driver
