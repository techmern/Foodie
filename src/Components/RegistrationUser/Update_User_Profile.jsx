import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Update_User_Profile() {
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(null);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const [userdata, setUserdata] = useState({
        'Username': '',
        'Email_Id': '',
        'Password': '',
        'Mob_No': '',
        'User_profile': '',
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        const newValue = name === 'User_profile' ? files[0] : value;

        setUserdata({
            ...userdata,
            [name]: newValue,
        });
        if (name === 'Password') {
            setPasswordChanged(true);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        setUserdata({
            ...userdata,
            User_profile: file.name, // Set User_profile to the file name
        });
    };
    useEffect(() => {
        const fetchUserDataFromLocalStorage = () => {
            const userDataFromLocalStorage = localStorage.getItem('User');
            if (userDataFromLocalStorage) {
                setUserdata(JSON.parse(userDataFromLocalStorage));
            }
        };
        fetchUserDataFromLocalStorage();
    }, []);

    useEffect(() => {
        const getuser = async () => {
            try {
                const userDataFromLocalStorage = JSON.parse(localStorage.getItem('User'));

                const response = await axios.get(`http://localhost:5000/user/singleuser/${userDataFromLocalStorage.userId}`);
                setUserdata(response.data);
                setProfileImage(response.data.User_profile);
                localStorage.setItem('User', JSON.stringify(response.data));

            } catch (error) {
                console.error('Error Viewing data:', error);
            }
        };
        getuser();
    }, []);

    const handleFormUpdate = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('Email_Id', userdata.Email_Id);
        formData.append('Password', userdata.Password);
        formData.append('Username', userdata.Username);
        formData.append('Mob_No', userdata.Mob_No);
        if (profileImage) {
            formData.append('User_profile', profileImage); // Append the file directly
        }
    
        try {
            const response = await axios.put('http://localhost:5000/user/updateuser', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log('User updated:', response.data);
            alert('Profile updated successfully');
            // Optionally, update local storage with new user data
            const updatedUserData = {
                ...userdata,
                User_profile: response.data.User_profile // Update User_profile with the returned file path
            };
            localStorage.setItem('User', JSON.stringify(updatedUserData));
            // Optionally, navigate to another page
            navigate('/userprofile');
        } catch (error) {   
            console.error('Error updating user data:', error);
            alert('Failed to update profile');
        }
    };
    
    

    const imageUrl = profileImage instanceof File ? URL.createObjectURL(profileImage) : `http://localhost:5000/${userdata.User_profile}`;

    const handleBack = () => {
        window.location.href = '/userprofile';
    };

    useEffect(() => {
        AOS.init();

    }, []);

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center mt-4' data-aos="fade-up" data-aos-duration="1000">
                <div className='col-md-4 col-sm-6 col-12'>
                    <div className='p-4' style={{ background: '#f5f5f5', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                        <h2 className="text-center mb-4">Edit Your Profile</h2>
                        <form onSubmit={handleFormUpdate}>
                            <div className="text-center mb-2">
                                <img
                                    src={imageUrl}
                                    alt="Profile Picture"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                                <input type="file" accept="image/*" style={{ display: 'none' }} id="upload" name="User_profile" onChange={handleFileChange} />
                            </div>

                            <div className="text-center mb-4">
                                <label htmlFor="upload" className="btn btn-link">Choose File</label>
                            </div>

                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Enter Username" id="exampleInputusername1" aria-describedby="emailHelp" name='Username' value={userdata.Username} onChange={handleInputChange} />
                            </div>

                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Enter email" name='Email_Id' id="exampleInputEmail1" aria-describedby="emailHelp" value={userdata.Email_Id} onChange={handleInputChange} />
                            </div>

                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Enter Password" id="exampleInputPassword1" name='Password' value={userdata.Password} onChange={handleInputChange} />
                            </div>

                            <div className="mb-3">
                                <input type="number" className="form-control" placeholder="Enter Mobile Number" id="exampleInputsMob_No1" name='Mob_No' value={userdata.Mob_No} onChange={handleInputChange} />
                            </div>

                            <div className="text-center mb-3">
                                <button type="submit" className="btn btn-primary">Save Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className=" text-center mb-3">
                <button className="btn btn-outline-primary mt-3 me-3" onClick={handleBack}>Back</button>
            </div>
        </div>
    );
}

export default Update_User_Profile;
