import React, { useEffect, useState } from 'react';
import axios from 'axios';

import AOS from 'aos';
import 'aos/dist/aos.css';

function User_Address() {


    const [useraddress, setUserAddress] = useState({
        userId: '',
        user_address: '',
        landmark: '',
        pincode: '',
    });

    const [errors, setErrors] = useState({
        user_address: '',
        landmark: '',
        pincode: '',
    });

    useEffect(() => {
        const fetchUserDataFromLocalStorage = () => {
            const userDataFromLocalStorage = localStorage.getItem('User');
            if (userDataFromLocalStorage) {
                const userData = JSON.parse(userDataFromLocalStorage);
                setUserAddress({
                    ...useraddress,
                    userId: userData.userId,
                });
            }
        };
        fetchUserDataFromLocalStorage();
    }, []);

    useEffect(() => {
        const getuser = async () => {
            try {
                const userDataFromLocalStorage = JSON.parse(localStorage.getItem('User'));
                console.log(userDataFromLocalStorage);

                const response = await axios.get(`http://localhost:5000/user/singleuser/${userDataFromLocalStorage.userId}`);
                setUserAddress(response.data);

            } catch (error) {
                console.error('Error Viewing data:', error);
            }
        };
        getuser();
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!useraddress.user_address) newErrors.user_address = 'Address is required';
        if (!useraddress.pincode) newErrors.pincode = 'Pincode is required';
        if (useraddress.pincode && (useraddress.pincode.length !== 6 || isNaN(useraddress.pincode))) {
            newErrors.pincode = 'Pincode must be a 6-digit number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserAddress({
            ...useraddress,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('Please fix the errors before submitting.');
            return;
        }

        try {
            const userDataFromLocalStorage = JSON.parse(localStorage.getItem('User'));
            const userId = userDataFromLocalStorage.userId;

            const response = await axios.post('http://localhost:5000/useraddress/addaddress', {
                ...useraddress,
                userId,
            });

            console.log(response.data);

            if (response.status === 200 && response.data.sts === '0') {
                alert('Address Added Successfully!');
                setUserAddress({
                    userId: '',
                    user_address: '',
                    landmark: '',
                    pincode: '',
                });
                setErrors({
                    user_address: '',
                    landmark: '',
                    pincode: '',
                });

                fetchAddresses();
            } else {
                alert('Failed to Add. Please try again.');
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            alert('An error occurred while saving the address.');
        }
    };


    const [addressdata, setAddressData] = useState([]);

    // Fetch addresses
    const fetchAddresses = async () => {
        try {
            const userIdObject = JSON.parse(localStorage.getItem('User'));
            const userId = userIdObject._id;
            console.log('Fetching addresses for user ID:', userId);
            const response = await axios.get('http://localhost:5000/useraddress/viewaddress', { params: { userId } });
            console.log('Addresses fetched:', response.data);
            setAddressData(response.data); // Update addressdata state
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    useEffect(() => {
        fetchAddresses(); // Fetch addresses on component mount
        AOS.init();

    }, []);


    const deleteAddress = async (addressId) => {
        try {
            await axios.delete(`http://localhost:5000/useraddress/deleteaddress/${addressId}`);
            setAddressData(addressdata.filter(address => address._id !== addressId));
            alert('Address deleted successfully');
        } catch (error) {
            console.error('Error deleting address:', error);
            alert('An error occurred while deleting the address.');
        }
    };


    

    return (

        <div className='container'>
            <div className='row justify-content-center mt-4' >
                <div className='col-md-6 mt-4' data-aos="fade-up" data-aos-duration="1000">
                    <div className='p-4' style={{ background: '#f5f5f5', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                        <h2 className="text-center mb-4">Add Address</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <textarea className="form-control"
                                    placeholder="Enter Your Complete Address"
                                    name='user_address'
                                    onChange={handleInputChange}
                                    value={useraddress.user_address}
                                ></textarea>
                                {errors.user_address && <div className="text-danger">{errors.user_address}</div>}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter landmark"
                                    name='landmark'
                                    onChange={handleInputChange}
                                    value={useraddress.landmark}
                                />
                                {errors.landmark && <div className="text-danger">{errors.landmark}</div>}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter pincode"
                                    name='pincode'
                                    onChange={handleInputChange}
                                    value={useraddress.pincode}
                                />
                                {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Save Address</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='col-md-6 mt-4' data-aos="fade-up" data-aos-duration="1000">
                    <div className='p-4' style={{ background: '#f5f5f5', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                        <h2 className="text-center mb-4">My Addresses</h2>
                        <ul className="list-unstyled">
                            {addressdata.map((address) => (
                                <li key={address._id} className="d-flex justify-content-between align-items-center">
                                    {address.user_address}, {address.landmark}, {address.pincode}
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm mt-2"
                                        onClick={() => deleteAddress(address._id)}
                                    >Delete
                                    </button>

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
           
        </div>
    );
}

export default User_Address;
