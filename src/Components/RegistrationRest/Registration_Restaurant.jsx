import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';


function Registration_Restaurant() {

    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false)
    const [msg, setMsg] = useState('')
    const [type, setType] = useState('')






    const [formData, setFormData] = useState({
        restaurantname: '',
        emailid: '',
        password: '',
        mobno: '',

    })

    const [errors, setErrors] = useState({
        restaurantname: '',
        emailid: '',
        password: '',
        mobno: '',
    })


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
        setErrors({
            ...errors,
            [name]: '',
        })
    }

    useEffect(() => {


    }, [formData, showToast, msg, type])

    const handleSubmit = async (e) => {
        try {

            if (!formData.restaurantname.trim()) {
                setShowToast(true);
                setMsg('Please enter restaurant name');
                setType('error');
                return;
            }
            if (!formData.emailid.trim()) {
                setShowToast(true);
                setMsg('Please enter email');
                setType('error');
                return;
            }
            if (!formData.password.trim()) {
                setShowToast(true);
                setMsg('Please enter password');
                setType('error');
                return;
            }
            if (!formData.mobno.trim()) {
                setShowToast(true);
                setMsg('Please enter mobile number');
                setType('error');
                return;
            }


            const res = await axios.post("http://localhost:5000/restaurant/addRestaurant", formData)
            console.log(res.data)

            if (res.data.sts === 0) {
                e.preventDefault()
                setShowToast(true)
                setMsg('Data Added Successfully')
                setType("success")
                setTimeout(() => {
                    setShowToast(false)
                }, 3000)
            } else {
                e.preventDefault()
                setShowToast(true)
                setMsg('Data Not Added Successfully')
                setType("error")
                setTimeout(() => {
                    setShowToast(false)
                }, 3000)
            }

        } catch (error) {
            console.error(error)
        }

    }

    const handlelogin = (e) => {
        navigate('/loginRestaurant');
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
        else {
            if (name === 'restaurantname') {
                if (!/^[A-Za-z\d@$!%*?&\s]+$/.test(value)) {
                    setErrors({
                        ...errors,
                        [name]: 'Please write a proper restaurant name with valid characters.',
                    });
                    e.preventDefault();
                    setShowToast(true);
                    setMsg('Please write a proper restaurant name with valid characters.');
                    setType("error");
                    setTimeout(() => {
                        setShowToast(false);
                    }, 3000)
                }
            }
            else if (name === 'emailid') {
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
            else if (name === 'mobno') {
                if (!/^\d{10}$/.test(value)) {
                    setErrors({
                        ...errors,
                        [name]: 'Enter proper Mobile No'
                    })
                    e.preventDefault()
                    setShowToast(true)
                    setMsg('Enter proper Mobile No')
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
            margin: '10px',
            width: '300px',
            padding: '8px 0',
            border: '2px solid #fff',
            outline: 'none',
            boxSizing: 'border-box',
        }
    };


    return (
        <div style={style.bodybg}>
            <h1 style={style.h1}><span style={style.span}>R</span>egistration<span style={style.span}> F</span>orm</h1>
            <ErrorMessage showToast={showToast} msg={msg} type={type} />
            <div style={style.wthreeForm}>

                <h2 style={style.h2}>Fill Out the form below to Registration</h2>
                <div class="w3l-login form">

                    <form>
                        <div class="form-sub-w3">
                            <input type="text" style={style.input} name="restaurantname" class="form-control" id="restaurantname" onBlur={handleInputBlur} placeholder="Restaurant Name" required="" onChange={handleInputChange} />
                        </div>
                        <div class="form-sub-w3">
                            <input type="text" style={style.input} name="emailid" id="emailid" class="form-control" placeholder="Email Id" onBlur={handleInputBlur} required="" onChange={handleInputChange} />
                        </div>
                        <div class="form-sub-w3">
                            <input type="password" style={style.input} name='password' class="form-control" id="password" placeholder="Password" onBlur={handleInputBlur} required="" onChange={handleInputChange} />
                        </div>
                        <div class="form-sub-w3">
                            <input type="number" style={style.input} name='mobno' class="form-control" id="mobno" placeholder="Phone Number" onBlur={handleInputBlur} required="" onChange={handleInputChange} />
                        </div>

                        <div class="submit-agileits">
                          <input type="button" value="Submit" onClick={handleSubmit} id="Submit" name="Submit" style={style.button}
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
                        <p style={style.p}>
                            By Clicking the Sign Up Button, you agree to our
                            <a href="" style={style.a}>Term & Conditions</a> and <a href="" style={style.a}>Primary Policy</a>
                        </p>
                        <p style={style.p}>Already Have an Account? <a href="" onClick={handlelogin} style={style.a}>Login Here</a></p>
                    </form>

                </div>
            </div>
        </div>



    )
}

export default Registration_Restaurant