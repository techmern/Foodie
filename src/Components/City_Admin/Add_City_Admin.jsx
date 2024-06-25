import React, { useEffect, useState } from 'react';
import Sidebar from '../CommonLayouts/Navbar/Sidebar_Admin';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';

function Add_City_Admin() {
    const styles = {
        container: {
            display: 'flex',
            height: '100vh',
        },
        content: {
            flex: 1,
            padding: '20px',
        },
        form: {
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #dddddd',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
        },
        label: {
            marginBottom: '5px',
            fontWeight: 'bold',
        },
        input: {
            border: '1px solid #dddddd',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
            width: '100%',
        },
        select: {
            border: '1px solid #dddddd',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
            width: '100%',
            appearance: 'none',
            backgroundSize: '12px',
        },
        button: {
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
        },
        h1: {
            fontSize: '45px',
            fontWeight: 400,
            textAlign: 'center',
            letterSpacing: '9px',
            wordSpacing: '4px',
            margin: '40px 0',
            color: 'black',
        },
    };

    const [showToast, setShowToast] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState('Available');

    const [formData, setFormData] = useState({
        cityname: '',
        city_postalcode: '',
        citystatus: 'Available',
    });

    const [errors, setErrors] = useState({
        cityname: '',
        city_postalcode: '',
        citystatus: '',
    });

    const handleChangeAvailability = (e) => {
        setSelectedAvailability(e.target.value);
        setFormData({
            ...formData,
            citystatus: e.target.value,
        });
    };

    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        if (value.trim() === '') {
            setErrors({
                ...errors,
                [name]: `${name} cannot be blank`,
            });
            setShowToast(true);
            setMsg(`${name} cannot be blank`);
            setType('error');
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.cityname.trim()) {
                setShowToast(true);
                setMsg('Please enter City Name');
                setType('error');
                return;
            }
            if (!formData.city_postalcode.trim()) {
                setShowToast(true);
                setMsg('Please enter Postal Code');
                setType('error');
                return;
            }

            const res = await axios.post('http://localhost:5000/city/addCity', formData);
            console.log(res);

            if (res.data.sts === 0) {
                setShowToast(true);
                setMsg('Data Added Successfully');
                setType('success');
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            } else {
                setShowToast(true);
                setMsg('Data Not Added Successfully');
                setType('error');
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            setShowToast(true);
            setMsg('An error occurred');
            setType('error');
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    };

    return (
        <div style={styles.container}>
            <Sidebar />
            <div style={styles.content}>
                <ErrorMessage showToast={showToast} msg={msg} type={type} />
                <h1 style={styles.h1}>Add City</h1>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <label style={styles.label} htmlFor="cityname">City Name:</label>
                    <input
                        style={styles.input}
                        type="text"
                        id="cityname"
                        name="cityname"
                        required
                        onBlur={handleInputBlur}
                        onChange={handleInputChange}
                    />

                    <label style={styles.label} htmlFor="city_postalcode">Postal Code:</label>
                    <input
                        style={styles.input}
                        type="text"
                        id="city_postalcode"
                        name="city_postalcode"
                        required
                        onBlur={handleInputBlur}
                        onChange={handleInputChange}
                    />

                    <label style={styles.label} htmlFor="citystatus">City Status:</label>
                    <select
                        style={styles.select}
                        id="citystatus"
                        name="citystatus"
                        value={selectedAvailability}
                        onChange={handleChangeAvailability}
                    >
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>

                    <button style={styles.button} type="submit">Add City</button>
                </form>
            </div>
        </div>
    );
}

export default Add_City_Admin;
