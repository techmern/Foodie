import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './User.css'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function Login_User() {
    const navigate = useNavigate()


    const [userlogin, setUserlogin] = useState({
        'Email_Id': '',
        'Password': '',
        
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserlogin({
            ...userlogin,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Check for empty fields
        if (userlogin.Email_Id.trim() === '' || userlogin.Password.trim() === '') {
            setErrors({
                Email_Id: 'Email field cannot be blank',
                Password: 'Password field cannot be blank',
            });
            return;

        }

        try {
            const response = await axios.post('http://localhost:5000/user/userlogin', userlogin);
            console.log(response.data);
            const { data } = response;
            console.log('Response data:', data);


            localStorage.setItem('User', JSON.stringify(data.userData));
            console.log('Stored user data:', data.userData);


            if (data.loginsts === 0) {
                alert('Email not found');

            } else if (data.loginsts === 1) {
                alert('Password is Incorrect');

            } else if (data.loginsts === 2) {
                const userData = data.userData;

                console.log('Stored user data:', userData);
                localStorage.setItem('User', JSON.stringify(userData));
                localStorage.setItem('Token', data.Token);
                navigate('/welcomeuser');
                alert('Login successful!');
            }


        } catch (error) {
            console.error(error);
        }
    };

    const [errors, setErrors] = useState({});

    const handleInputBlur = (e) => {
        const { name, value } = e.target;

        if (value.trim() === '') {
            setErrors({
                ...errors,
                [name]: `${name} field can not be blank`,
            });


        }
    };



    return (
        <div className='bg-image' style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='form' style={{ width: '100%' }}>
                <div className='container'>
                    <div className='row '>
                        <div className='col-md-4 mx-auto form-container' style={{ backgroundColor: '#E8EAF6', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', borderRadius: '10px', padding: '20px', height: '100%' }}>
                            <div className="text-center mb-2">
                                <img src="logo.jpg" alt="profile" style={{ width: '80px', borderRadius: '50%' }} className="rounded-circle" />
                            </div>
                            <h1 className="text-center mb-4">Login</h1>
                            <div className="mb-4">
                                <input type="email" className="form-control" placeholder="Enter email" id="exampleInputEmail1" aria-describedby="emailHelp" name='Email_Id' onChange={handleInputChange} onBlur={handleInputBlur} />
                                {errors.Email_Id && <span className="text-danger">{errors.Email_Id}</span>}

                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Enter Password" id="exampleInputPassword1" name='Password' onChange={handleInputChange} onBlur={handleInputBlur} />
                                {errors.Password && <span className="text-danger">{errors.Password}</span>}

                            </div>


                            <div className="text-left mb-3">
                                <a className='ms-2' href="/forgotPassOTPUser">Forget Password</a>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary mx-auto d-block" style={{ width: '391px' }} onClick={handleFormSubmit}>Login</button>
                            </div>
                            <div className="mb-3">
                                <p style={{ textAlign: 'center' }}>OR</p>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-outline-primary mx-auto d-block" style={{ width: '391px' }} >Sign In with Google</button>
                            </div>
                            <div className="text-center mt-3">Do Not have an account?
                                <a className='ms-2' href="/userregister">Create an Account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login_User