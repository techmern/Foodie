import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';

function Login_Restaurant() {
    
    const navigate = useNavigate();
    const [emailid, setEamilid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false)
    const [msg, setMsg] = useState('')
    const [type, setType] = useState('')

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

            const res = await axios.post("http://localhost:5000/restaurant/login", { emailid, password });
            const { msg, loginsts, restaurants,token } = res.data;
            console.log(res);

            if (loginsts === 2) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('restaurants', JSON.stringify(restaurants));
                navigate('/welcomeRestaurant');
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

    const handleRegis = (e) => {
        navigate('/registrationRestaurant');
    }
    const handleForgot = (e) => {
        navigate('/forgotpassotpRestaurant');
    }

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
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]{5,12}$/.test(value)) {
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

        bodybg: {
            backgroundImage: "url('/banner.jpg')",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: "100vh",
            margin: 0,
            padding: "10px",
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
        formControl: {
            fontSize: "1em",
            fontWeight: 500,
            textAlign: "center",
            letterSpacing: "1px",
            margin: "10px",
            width: "300px",
            padding: "8px 0",
            border: "2px solid #fff",
            outline: "none",
            boxSizing: "border-box",
        },
        label: {
            fontSize: "1em",
            fontWeight: 500,
            textAlign: "center",
            letterSpacing: "1px",
            margin: "10px",
            padding: "8px 0",
            color: "#e6ebff",
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
        p: {
            margin: 0,
            color: "#fffcfc",
            textDecoration: "none",
            letterSpacing: "1px",
        },
        a: {
            color: "red",
            textDecoration: "none",
            letterSpacing: "1px",
        },

        inputCheckbox: {
            marginLeft: '2px',
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
        <div style={style.bodybg}>

            <h1 style={style.h1}><span style={style.span}>L</span>ogin <span style={style.span}>F</span>rom</h1>
            <ErrorMessage showToast={showToast} msg={msg} type={type} />
            <div style={style.wthreeForm}>

                <h2 style={style.h2}>Fill out the form below to login</h2>
                <div class="w3l-login form">

                    <form>
                        <div class="form-sub-w3">
                            <input type="text" style={style.input} name="emailid" id="emailid" onBlur={handleInputBlur} placeholder="Email Id" required="" value={emailid} onChange={(e) => setEamilid(e.target.value)} />
                        </div>
                        <div class="form-sub-w3">
                            <input type="password" style={style.input} name="password" id="password" onBlur={handleInputBlur} placeholder="Password" required="" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <label class="anim">
                            <input type="checkbox" class="checkbox" style={style.inputCheckbox} />
                            <span style={style.p}>Remember Me</span>
                        </label>
                        <div class="submit-agileits">

                            <input type="button" value="Login" onClick={handleSubmit} style={style.button}
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
                        <a href="" onClick={handleForgot} style={style.a}>Forgot Password ?</a><br /><br />
                        <p style={style.p}>Create an Account <a href="" onClick={handleRegis} style={style.a}>Sign Up</a></p>

                    </form>
                    <br />
                    {/* {error && <a>{error}</a>} */}
                </div>
            </div>
        </div>
    )
}

export default Login_Restaurant