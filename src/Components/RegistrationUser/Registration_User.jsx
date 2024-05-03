import React, { useState } from 'react'
import './User.css'
import axios from 'axios'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Registration_User() {

  const [userregister, setUserregister] = useState({
    'Username': '',
    'Email_Id': '',
    'Password': '',
    'Mob_No': '',

  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserregister({
      ...userregister,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      userregister.Username.trim() === '' ||
      userregister.Email_Id.trim() === '' ||
      userregister.Password.trim() === '' ||
      userregister.Mob_No.trim() === ''
    ) {
      // toast.error('Please fill in all required fields', {
      //   position: 'top-center',
      //   autoClose: 4000,
      // });
      return;
    }

    const formIsValid = Object.values(errors).every((error) => error === '');
    console.log(formIsValid);

    try {
      const response = await axios.post('http://localhost:5000/user/userregister', userregister);
      console.log(response.data);

      if (response.status === 200) {
        if (response.data.sts === '0') {
          alert('You Have Registered Successful!');

          // toast.success('Registration successful', { position: 'top-center', autoClose: 4000, });
        } else if (response.data.sts === '1') {
          setErrors({ ...response.data });
          // toast.error('Registration failed', { position: 'top-center', autoClose: 4000, });
        } else {
          console.error('Unknown response:', response);
        }

      }
    } catch (error) {
      console.error('Error inserting data:', error);
      // toast.error('Please fill in all required fields correctly', { position: 'top-center', autoClose: 4000 });

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
    } else {
      if (name === 'Username') {
        if (!/^[a-zA-Z]{5,12}$/.test(value)) {
          setErrors({
            ...errors,
            [name]: 'Username should be 5 to 12 characters only',
          });

        }
      } else if (name === 'Email_Id') {
        if (!/\S+@\S+\.\S+/.test(value)) {
          setErrors({
            ...errors,
            [name]: 'Enter a valid email address',
          });

        }
      } else if (name === 'Password') {
        if (!/^[a-zA-Z0-9_-]{5,12}$/.test(value)) {
          setErrors({
            ...errors,
            [name]: 'Password should be 5 to 12 characters alphanumeric',
          });

        }
      } else if (name === 'Mob_No') {
        if (!/^\d{10}$/.test(value)) {
          setErrors({
            ...errors,
            [name]: 'Enter a 10-digit mobile number',
          });

        }
      }
    }
  };

  return (

    <div className='form bg-image' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className='container'>
        <div className='row '   >
          <div className='col-md-4 mx-auto form-container' style={{ backgroundColor: '#E8EAF6', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', borderRadius: '10px', padding: '20px' }}>
            <div className="text-center mb-2">
              <img src="logo.jpg" alt="profile" style={{ width: '80px', borderRadius: '50%' }} className="rounded-circle" />
            </div>
            <h2 className="text-center mb-4">Create an Account</h2>
            <div className="mb-3    ">
              <input type="text" className="form-control" placeholder="Enter Username" id="exampleInputusername1" aria-describedby="emailHelp" name='Username' onChange={handleInputChange} onBlur={handleInputBlur} />
              {errors.Username && <span className="text-danger">{errors.Username}</span>}

            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Enter email" id="exampleInputEmail1" aria-describedby="emailHelp" name='Email_Id' onChange={handleInputChange} onBlur={handleInputBlur} />
              {errors.Email_Id && <span className="text-danger">{errors.Email_Id}</span>}

            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter Password" id="exampleInputPassword1" name='Password' onChange={handleInputChange} onBlur={handleInputBlur} />
              {errors.Password && <span className="text-danger">{errors.Password}</span>}

            </div>

            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter Mobile Number" id="exampleInputsMob_No1" name='Mob_No' onChange={handleInputChange} onBlur={handleInputBlur} />
              {errors.Mob_No && <span className="text-danger">{errors.Mob_No}</span>}

            </div>



            <div className="mb-3">
              <button type="submit" className="btn btn-primary mx-auto d-block"
                style={{ justifyContent: 'center', width: ' 400px' }} onClick={handleFormSubmit}>Register</button>
            </div>
            <div className="mb-3">
              <p style={{ justifyContent: 'center', textAlign: 'center' }}>OR</p>
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-outline-primary mx-auto d-block"
                style={{ justifyContent: 'center', width: ' 400px' }}>Sign In with Google</button>
            </div>
            <div className="text-center mt-3 "> Allready have an account?
              <a className='ms-2' href="/userlogin">Login</a>
            </div>

          </div>

        </div>


      </div>


    </div>
  )
}

export default Registration_User