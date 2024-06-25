import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassOTPUser() {
    const navigate = useNavigate();

    const [sendUserOtp, setSendUserOtp] = useState({
        Email_Id: '',
        otp: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSendUserOtp({
            ...sendUserOtp,
            [name]: value,
        });
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting data:', sendUserOtp);

        try {
            const response = await axios.post('http://localhost:5000/forgotuserpassword/sendoptuser', sendUserOtp);
            console.log(response.data);
            navigate('/newPasswordOTPUser')

        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };
    return (
        <div className='container'>
            <div className='row justify-content-center mt-4'>
                <div className='col-md-4'>
                    <div className='p-4' style={{ background: '#f5f5f5', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                        <h2 className="text-center mb-4">Enter Your Email For OTP </h2>
                        <form onSubmit={handleEmailSubmit} >

                            <div className="mb-3">
                                {/* {email} */}
                            </div>

                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Enter email" name='Email_Id' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleInputChange} />
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Send Email</button>
                            </div>
                            <div className="text-center mt-3"> Do Not have an account?
                                <a className='ms-2' href="/">Register</a>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ForgotPassOTPUser