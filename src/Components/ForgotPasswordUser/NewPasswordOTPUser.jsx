import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewPasswordOTPUser() {
    const navigate = useNavigate()


    const [formdata, setFormdata] = useState({
        Email_Id: '',
        OTP: '',
        Password: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormdata({
            ...formdata,
            [name]: value,
        })

    }

    const handleFormUpdate = async (e) => {
        e.preventDefault();
        console.log(formdata);
        try {
            console.log('Updating password with data:', formdata);
            const response = await axios.post('http://localhost:5000/forgotuserpassword/resetuserpassword', {
                Email_Id: formdata.Email_Id,
                otp: formdata.otp, 
                Password: formdata.Password
            });
            console.log('Response:', response.data); // Log the response for debugging
            alert('Password changed successfully!');
            navigate('/userlogin')
        } catch (error) {
            console.error('Error updating data:', error);
            alert('Password change failed!');
        }
    };
    
    return (
        <div className='container'>
            <div className='row justify-content-center mt-4'>
                <div className='col-md-4'>
                    <div className='p-4' style={{ background: '#f5f5f5', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                        <h2 className="text-center mb-4">Create New Password </h2>
                        <form  >
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Enter email" name='Email_Id' id="exampleInputemail1" onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                            <input type="number" className="form-control" placeholder="Enter otp" name='otp' id="exampleInputotp1" onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Enter password" name='Password' id="exampleInputPassword1" onChange={handleInputChange} />
                            </div>

                            <button type="submit" className="btn btn-primary mx-auto d-block" onClick={handleFormUpdate}>Change Password</button>

                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default NewPasswordOTPUser