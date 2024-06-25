import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';
import Cropper from 'react-easy-crop';

function EditProfile_Restaurant() {

    const style = {
        logo: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            marginBottom: '20px',
        },
        homePageStyle: {
            textAlign: 'center',
            padding: '50px 0',
        },
        formContainer: {
            textAlign: 'center',
            backgroundColor: '#7f7f83',
            width: '40%',
            margin: '0 auto',
            padding: '3em',
            boxShadow: '4px 4px 0px rgb(151, 152, 154)',
            opacity: '0.7',
            boxSizing: 'border-box',
        },
        heading: {
            fontSize: "45px",
            fontWeight: 400,
            textAlign: "center",
            letterSpacing: "9px",
            wordSpacing: "4px",
            margin: "40px 0",
            color: "black",
            fontFamily: "'Lobster', cursive",
        },
        bodyColor: {
            backgroundColor: 'white',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
        },
        button: {
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: 'red',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            background: '#e0a800',
        },
        fileInputContainer: {
            position: 'relative',
            display: 'inline-block',
            overflow: 'hidden',
            marginTop: '20px',
        },
        fileInputButton: {
            backgroundColor: 'transparent',
            color: 'black',
            padding: '8px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '20px',
            transition: 'background-color 0.3s',
            textDecoration: 'underline',
            textDecorationColor: 'red',
            textDecorationThickness: '2px',
        },

        fileInput: {
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer',
        },
        label: {
            fontSize: "1em",
            fontWeight: 500,
            textAlign: "center",
            letterSpacing: "1px",
            margin: "10px",
            padding: "8px 0",
            color: "#e6ebff",
        },
        input: {
            fontSize: '1em',
            fontWeight: 500,
            textAlign: 'center',
            letterSpacing: '1px',
            margin: 'auto auto 10px auto',
            width: '300px',
            padding: '8px 0',
            border: '2px solid #fff',
            outline: 'none',
            boxSizing: 'border-box',
        },
        backButton: {
            position: 'absolute',
            left: '20px',
            top: '20px',
            padding: '10px 20px',
            backgroundColor: 'red',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
        },
    };



    const [showToast, setShowToast] = useState(false)
    const [msg, setMsg] = useState('')
    const [type, setType] = useState('')
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    const [showCroppedImage, setShowCroppedImage] = useState(false);
    const [cities, setCities] = useState([]);


    const navigate = useNavigate();

    const loguser = localStorage.getItem('restaurants');
    const restaurants = loguser ? JSON.parse(loguser) : {};


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


    const [formData, setFormData] = useState({
        restaurantname: restaurants.restaurantname,
        emailid: restaurants.emailid,
        password: '',
        mobno: restaurants.mobno,
        address: restaurants.address,
        city: restaurants.city,
        postalcode: restaurants.postalcode,
        restaurantStatus: restaurants.restaurantStatus,
        restaurantImg: restaurants.restaurantImg,
    });

    const [errors, setErrors] = useState({
        restaurantname: '',
        emailid: '',
        password: '',
        mobno: '',
        address: '',
        city: '',
        postalcode: '',
        restaurantImg: '',
    });

    useEffect(() => {
        if (!loguser) {
            navigate('/loginRestaurant');
        } else {
            setFormData({
                ...formData,
                restaurantname: restaurants.restaurantname,
                emailid: restaurants.emailid,
                mobno: restaurants.mobno,
                address: restaurants.address,
                city: restaurants.city,
                postalcode: restaurants.postalcode,
                restaurantStatus: restaurants.restaurantStatus,
                restaurantImg: restaurants.restaurantImg,
            });
        }
    }, [loguser, navigate]);

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
    }, []);

    const getdata = async (e) => {
        try {
            const res = await fetch(`http://localhost:5000/restaurant/restaurantProfile/${restaurants._id}`);
            const data = await res.json();
            const bcryptPassword = await bcrypt.hash(formData.password, 10);
            if (res.status === 200) {
                const updatedrestaurant = {
                    ...restaurants,
                    restaurantname: formData.restaurantname,
                    emailid: formData.emailid,
                    password: bcryptPassword,
                    mobno: formData.mobno,
                    address: formData.address,
                    city: formData.city,
                    postalcode: formData.postalcode,
                    restaurantStatus: formData.restaurantStatus,
                    restaurantImg: data.restaurantImg,
                };

                localStorage.setItem('restaurants', JSON.stringify(updatedrestaurant));
                console.log(msg);
                navigate('/viewprofileRestaurant');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
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
            if (!formData.mobno) {
                setShowToast(true);
                setMsg('Please enter a valid mobile number');
                setType('error');
                return;
            }
            if (!formData.address.trim()) {
                setShowToast(true);
                setMsg('Please enter address');
                setType('error');
                return;
            }
            if (!formData.city.trim()) {
                setShowToast(true);
                setMsg('Please enter city');
                setType('error');
                return;
            }
            if (!formData.postalcode.trim()) {
                setShowToast(true);
                setMsg('Please enter postal code');
                setType('error');
                return;
            }
            if (!formData.restaurantImg) {
                setShowToast(true);
                setMsg('Please upload a restaurant image');
                setType('error');
                return;
            }
        
            console.log('formData:', formData);
        
            const formDataToUpload = new FormData();
            formDataToUpload.append('restaurantname', formData.restaurantname);
            formDataToUpload.append('emailid', formData.emailid);
            formDataToUpload.append('password', bcrypt.hash(formData.password, 10));
            formDataToUpload.append('mobno', formData.mobno);
            formDataToUpload.append('address', formData.address);
            formDataToUpload.append('city', formData.city);
            formDataToUpload.append('postalcode', formData.postalcode);
            formDataToUpload.append('restaurantStatus', formData.restaurantStatus);
            formDataToUpload.append('restaurantImg', formData.restaurantImg);
        
            console.log('formDataToUpload:', formDataToUpload);
        
            const response = await axios.put(`http://localhost:5000/restaurant/updateProfile/${restaurants._id}`, formDataToUpload);
        
            if (response.status === 200) {
                const { msg } = response.data;
                setShowToast(true);
                setMsg(msg);
                setType('success');
                getdata();
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setShowToast(true);
            setMsg('Error updating profile');
            setType('error');
        }
    };
    


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
                if (!/^\d{10}$/.test(value)) {
                    setErrors({
                        ...errors,
                        [name]: 'Enter proper Mobile No'
                    })
                    e.preventDefault()
                    setShowToast(true)
                    setMsg('Enter proper Mobile No')
                    setType("error")
                    setTimeout(() => {
                        setShowToast(false)
                    }, 3000)
                }
            }
            else if (name === 'address') {
                if (!/^[A-Za-z\d@$!%*?&\s]+$/.test(value)) {
                    setErrors({
                        ...errors,
                        [name]: 'Enter proper Address'
                    })
                    e.preventDefault()
                    setShowToast(true)
                    setMsg('Enter proper Address')
                    setType("error")
                    setTimeout(() => {
                        setShowToast(false)
                    }, 3000)
                }
            }
            else if (name === 'city') {
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    setErrors({
                        ...errors,
                        [name]: 'Please enter a proper address with only letters and spaces.'
                    })
                    e.preventDefault()
                    setShowToast(true)
                    setMsg('Please enter a proper address with only letters and spaces.')
                    setType("error")
                    setTimeout(() => {
                        setShowToast(false)
                    }, 3000)
                }
            }
            else if (name === 'postalcode') {
                if (!/^\d{6}$/.test(value)) {
                    setErrors({
                        ...errors,
                        [name]: 'Please enter a valid postal code.'
                    })
                    e.preventDefault()
                    setShowToast(true)
                    setMsg('Please enter a valid postal code.')
                    setType("error")
                    setTimeout(() => {
                        setShowToast(false)
                    }, 3000)
                }
            }
        }
    }

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            setShowCroppedImage(false);
            setCrop({ x: 0, y: 0 });
            setZoom(0);
            setCroppedAreaPixels(null);

            setFormData({
                ...formData,
                restaurantImg: file,
                imgPreview: URL.createObjectURL(file)
            });
        } else {
            console.error("No file selected.");
        }
    };

    const handleCrop = () => {
        if (croppedAreaPixels && formData.imgPreview) {
            setIsCropping(true);

            const img = new Image();
            img.src = formData.imgPreview;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const scaleX = img.naturalWidth / img.width;
                const scaleY = img.naturalHeight / img.height;
                canvas.width = croppedAreaPixels.width * scaleX;
                canvas.height = croppedAreaPixels.height * scaleY;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(
                    img,
                    croppedAreaPixels.x * scaleX,
                    croppedAreaPixels.y * scaleY,
                    croppedAreaPixels.width * scaleX,
                    croppedAreaPixels.height * scaleY,
                    0,
                    0,
                    croppedAreaPixels.width * scaleX,
                    croppedAreaPixels.height * scaleY
                );
                canvas.toBlob((blob) => {
                    const croppedImg = new File([blob], "cropped_image.jpg");
                    setFormData({
                        ...formData,
                        restaurantImg: croppedImg,
                        imgPreview: URL.createObjectURL(croppedImg)
                    });
                    setShowCroppedImage(true);
                    setIsCropping(false);
                }, "image/jpeg");
            };
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onCropChange = useCallback((crop) => {
        setCrop(crop);
    }, []);

    const onZoomChange = useCallback((zoom) => {
        setZoom(zoom);
    }, []);

    const handleBack = () => {
        navigate('/viewprofileRestaurant');
    };

    return (
        <div style={style.bodyColor}>
            <button style={style.backButton} onClick={handleBack} onMouseEnter={(e) => (e.target.style.background = '#e0a800')}
                onMouseLeave={(e) => (e.target.style.background = 'red')}>Back
            </button>
            <h1 style={style.heading}>Update Profile</h1>
            <ErrorMessage showToast={showToast} msg={msg} type={type} />
            <div style={style.formContainer}>
                <form>

                    <div class="form-sub-w3" >
                        {formData.imgPreview ? (
                            <img src={formData.imgPreview} style={style.logo} />
                        ) : (
                            restaurants.restaurantImg ? (
                                <img src={`http://localhost:5000/restaurantlogo/${restaurants.restaurantImg}`} style={style.logo} alt="Restaurant Logo" />
                            ) : (
                                <img src="./Selectlogo.png" style={style.logo} alt="Default Logo" />
                            )
                        )}
                    </div>
                    <div class="form-sub-w3" style={style.fileInputContainer}>
                        <label htmlFor="fileInput" style={style.fileInputButton}>Choose Logo</label>
                        <input id="fileInput" type='file' name='restaurantImg' style={style.fileInput} onChange={handleImgChange} />
                    </div>

                    <div class="form-sub-w3" >
                        {formData.imgPreview && !isCropping && !showCroppedImage && (
                            <Cropper
                                image={formData.imgPreview}
                                crop={crop}
                                zoom={zoom}
                                aspect={2 / 2}
                                onCropChange={onCropChange}
                                onZoomChange={onZoomChange}
                                onCropComplete={onCropComplete}
                                style={{ width: '100%', height: '300px' }}
                            />
                        )}
                        {formData.imgPreview && !isCropping && !showCroppedImage && (
                            <input type='button' value={"Crop Image"} name='upload' onClick={handleCrop} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '250px' }} />
                        )}
                    </div>

                    <div class="form-sub-w3" >
                        <input style={style.input} type="text" name="restaurantname" value={formData.restaurantname} onBlur={handleInputBlur} onChange={handleInputChange} placeholder="Restaurant Name" required />
                    </div>
                    <div class="form-sub-w3">
                        <input style={style.input} type="text" name="emailid" id="emailid" value={formData.emailid} onChange={handleInputChange} onBlur={handleInputBlur} placeholder="Email Id" required="" />
                    </div>
                    <div class="form-sub-w3">
                        <input style={style.input} type="text" name="password" id="password" value={formData.password} onChange={handleInputChange} onBlur={handleInputBlur} placeholder="Password" required="" />
                    </div>
                    <div class="form-sub-w3">
                        <input style={style.input} type="text" name="mobno" id="mobno" value={formData.mobno} onChange={handleInputChange} onBlur={handleInputBlur} placeholder="Mobile No" required="" />
                    </div>
                    <div class="form-sub-w3">
                        <input style={style.input} type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} onBlur={handleInputBlur} placeholder="Address" required="" />
                    </div>
                    {/* <div class="form-sub-w3">
                        <input style={style.input} type="text" name="city" id="city" onChange={handleInputChange} value={formData.city} onBlur={handleInputBlur} placeholder="City" required="" />
                    </div> */}
                    <div className="form-sub-w3">
                        <select name="city" id="city" value={formData.city} onChange={handleInputChange} required="" style={style.input}>
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city._id} value={city.cityname}>
                                    {city.cityname}
                                </option>
                            ))}
                        </select>
                        {errors.city && <p style={style.errorMessage}>{errors.city}</p>}
                    </div>
                    <div class="form-sub-w3">
                        <input style={style.input} type="text" name="postalcode" id="postalcode" onChange={handleInputChange} value={formData.postalcode} onBlur={handleInputBlur} placeholder="Postal Code" required="" />
                    </div>
                    <div class="mb-3">
                        <label style={style.label} htmlFor="restaurantStatus" className="form-label">Select a Restaurant Status:</label>
                        <br />
                        <select style={style.input} name="restaurantStatus" id="restaurantStatus" value={formData.restaurantStatus} onChange={handleInputChange}>
                            <option value="Close">Close</option>
                            <option value="Open">Open</option>
                            <option value="Temporary Close">Temporary Close</option>
                        </select>
                    </div>

                    <div class="submit-agileits">
                        <button style={style.button} onClick={handleSubmit} onMouseEnter={(e) => (e.target.style.background = '#e0a800')}
                            onMouseLeave={(e) => (e.target.style.background = 'red')}>Update Profile
                        </button>
                    </div>


                </form>


            </div>
        </div>
    )
}

export default EditProfile_Restaurant
