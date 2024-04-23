import React from 'react'
import './style2.css'

function Login_User() {
  return (
    <div>
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
                                <input type="email" className="form-control" placeholder="Enter email" id="exampleInputEmail1" aria-describedby="emailHelp" name='Email_Id'  />

                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Enter Password" id="exampleInputPassword1" name='Password' />

                            </div>
                            <div className="text-left mb-3">
                                <a className='ms-2' href="/sendemail">Forget Password</a>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary mx-auto d-block" style={{ width: '391px' }} >Login</button>
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
    </div>
  )
}

export default Login_User