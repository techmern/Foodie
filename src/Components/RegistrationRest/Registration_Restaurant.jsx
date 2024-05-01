import React, { useEffect, useState } from 'react'
import './style.css'
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
                if (!/^\d{10}$/.test(value)){
                    setErrors({
                        ...errors,
                        [name]:'Enter proper Mobile No'
                    })
                    e.preventDefault()
                    setShowToast(true)
                    setMsg('Enter proper Mobile No')
                    setType("error")
                    setTimeout(()=>{
                        setShowToast(false)
                    },3000)
                }
            }
        }
    }


    return (
        <div className='bodybg'>

            <h1><span>R</span>egistration<span> F</span>orm</h1>
            <ErrorMessage showToast={showToast} msg={msg} type={type} />
            <div class="wthree-form">

                <h2>Fill Out the form below to Registration</h2>
                <div class="w3l-login form">

                    <form>
                        <div class="form-sub-w3">
                            <input type="text" name="restaurantname" class="form-control" id="restaurantname" onBlur={handleInputBlur} placeholder="Restaurant Name" required="" onChange={handleInputChange} />
                        </div>
                        <div class="form-sub-w3">
                            <input type="text" name="emailid" id="emailid" class="form-control" placeholder="Email Id" onBlur={handleInputBlur} required="" onChange={handleInputChange} />
                        </div>
                        <div class="form-sub-w3">
                            <input type="password" name='password' class="form-control" id="password" placeholder="Password" onBlur={handleInputBlur} required="" onChange={handleInputChange} />
                        </div>
                        <div class="form-sub-w3">
                            <input type="number" name='mobno' class="form-control" id="mobno" placeholder="Phone Number" onBlur={handleInputBlur} required="" onChange={handleInputChange} />
                        </div>

                        <div class="submit-agileits">
                            <input type="button" value="Submit" onClick={handleSubmit} id='Submit' name='Submit' />
                        </div>
                        <p class="bottom-text">
                            By Clicking the Sign Up Button, you agree to our
                            <a href="">Term & Conditions</a> and <a href="">Primary Policy</a>
                        </p>
                        <p>Already Have an Account? <a href="" onClick={handlelogin}>Login Here</a></p>
                    </form>

                </div>
            </div>
        </div>



    )
}

export default Registration_Restaurant