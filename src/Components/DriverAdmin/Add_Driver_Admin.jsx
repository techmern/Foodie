import React, { useEffect, useState } from 'react';
import Sidebar from '../CommonLayouts/Navbar/Sidebar_Admin';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';

export default function Add_Driver_Admin() {
    const styles = {
        container: {
            display: 'flex',
            height: '100vh',
        },
        contentContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '100%',
            marginTop: '30px'
        },
        formContainer: {
            width: '600px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        },
        title: {
            marginBottom: '20px',
            fontSize: '24px',
            textAlign: 'center',
            color: '#333',
        },
        input: {
            width: '100%',
            margin: '10px 0',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        button: {
            width: '100%',
            margin: '10px 0',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
        },
    };

    const [showToast, setShowToast] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('');
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        drivername: '',
        emailid: '',
        password: '',
        phone_no: '',
        city: '',
        license_no: '',
        vehicle_type: ''
    });

    const [errors, setErrors] = useState({
        drivername: '',
        emailid: '',
        password: '',
        phone_no: '',
        city: '',
        license_no: '',
        vehicle_type: ''
    });

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://localhost:5000/city/viewCity');
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, [formData,msg,type]);


    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        if (value.trim() === '') {
            setErrors({
                ...errors,
                [name]: `${name} cannot be blank`,
            });
            setShowToast(true);
            setMsg(`${name} cannot be blank`);
            setType("error");
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
        try {
            if (!formData.drivername.trim()) {
                setShowToast(true);
                setMsg('Please Enter Driver Name');
                setType('error');
                return;
            }
            if (!formData.emailid.trim()) {
                setShowToast(true);
                setMsg('Please Enter Email Id');
                setType('error');
                return;
            }
            if (!formData.password.trim()) {
                setShowToast(true);
                setMsg('Please Enter Password');
                setType('error');
                return;
            }
            if (!formData.phone_no.trim()) {
                setShowToast(true);
                setMsg('Please Enter Mobile Number');
                setType('error');
                return;
            }
            if (!formData.city.trim()) {
                setShowToast(true);
                setMsg('Please Select City');
                setType('error');
                return;
            }
            if (!formData.license_no.trim()) {
                setShowToast(true);
                setMsg('Please Enter License Number');
                setType('error');
                return;
            }
            if (!formData.vehicle_type.trim()) {
                setShowToast(true);
                setMsg('Please Enter Vehicle Type');
                setType('error');
                return;
            }

            const res = await axios.post("http://localhost:5000/driver/addDriver", {
                ...formData,
            });
            console.log(res.data);

            if (res.data.sts === 0) {
                e.preventDefault();
                setShowToast(true);
                setMsg('Data Added Successfully');
                setType("success");
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            } else {
                e.preventDefault();
                setShowToast(true);
                setMsg('Data Not Added Successfully');
                setType("error");
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={styles.container}>
            <Sidebar />
            <div style={styles.contentContainer}>
                <div style={styles.formContainer}>
                    <ErrorMessage showToast={showToast} msg={msg} type={type} />
                    <h2 style={styles.title}>Add Driver</h2>
                    <input type="text" placeholder="Name" name='drivername' id="drivername" style={styles.input} onBlur={handleInputBlur} onChange={handleInputChange} required="" />
                    <input type="text" placeholder="Email" name='emailid' id="emailid" style={styles.input} onBlur={handleInputBlur} onChange={handleInputChange} required="" />
                    <input type="text" placeholder="Password" name='password' id="password" style={styles.input} onBlur={handleInputBlur} onChange={handleInputChange} required="" />
                    <input type="text" placeholder="Phone Number" name='phone_no' id="phone_no" style={styles.input} onBlur={handleInputBlur} onChange={handleInputChange} required="" />
                    <select name="city" id="city" style={styles.input} onBlur={handleInputBlur} onChange={handleInputChange} required="">
                        <option value="">Select City</option>
                        {cities && cities.map(city => (
                            <option key={city._id} value={city.cityname}>{city.cityname}</option>
                        ))}
                    </select>
                    <input type="text" placeholder="License Number" name='license_no' id="license_no" style={styles.input} onBlur={handleInputBlur} onChange={handleInputChange} required="" />
                    <input type="text" placeholder="Vehicle Type" name='vehicle_type' id="vehicle_type" style={styles.input} onBlur={handleInputBlur} onChange={handleInputChange}  required="" />
                    <button style={styles.button} onClick={handleSubmit}>Add Driver</button>
                </div>
            </div>
        </div>

    );
}
