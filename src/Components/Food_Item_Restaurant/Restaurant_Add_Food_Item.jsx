import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';
import Cropper from 'react-easy-crop';

function Restaurant_Add_Food_Item() {
    const [showToast, setShowToast] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('');
    const [selectedAvailablity, setselectedAvailablity] = useState('');
    const [selectedCategory, setselectedcategory] = useState('');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    const [showCroppedImage, setShowCroppedImage] = useState(false);

    const loguser = localStorage.getItem('restaurants')

    const restaurants = JSON.parse(loguser);

    const [formData, setFormData] = useState({
        item_name: '',
        item_price: '',
        restaurant_id: restaurants._id,
        item_ingredients: '',
        item_description: '',
        food_availability: '',
        food_category: '',
        food_itemImg: '',
    })

    const [errors, setErrors] = useState({
        item_name: '',
        item_price: '',
        restaurant_id: '',
        item_ingredients: '',
        item_description: '',
        food_availability: '',
        food_category: '',
        food_itemImg: '',
    })

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
    }

    const handleChangeAvailablity = (e) => {
        setselectedAvailablity(e.target.value)
    }
    const handleChangeCategory = (e) => {
        setselectedcategory(e.target.value)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
        setErrors({
            ...errors,
            [name]: '',
        })
    }

    useEffect(() => {

    }, [formData, showToast, msg, type, selectedAvailablity, selectedCategory])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.item_name.trim()) {
                setShowToast(true);
                setMsg('Please enter Item Name');
                setType('error');
                return;
            }
            if (!formData.item_price.trim()) {
                setShowToast(true);
                setMsg('Please enter Item Price');
                setType('error');
                return;
            }

            if (!formData.item_description.trim()) {
                setShowToast(true);
                setMsg('Please enter Item Description');
                setType('error');
                return;
            }

            const formDataToSend = new FormData();
            formDataToSend.append('item_name', formData.item_name);
            formDataToSend.append('item_price', formData.item_price);
            formDataToSend.append('restaurant_id', formData.restaurant_id);
            formDataToSend.append('item_ingredients', formData.item_ingredients);
            formDataToSend.append('item_description', formData.item_description);
            formDataToSend.append('food_availability', selectedAvailablity);
            formDataToSend.append('food_category', selectedCategory);
            formDataToSend.append('food_itemImg', formData.food_itemImg);

            const res = await axios.post("http://localhost:5000/restaurantmenu/addMenu", formDataToSend);
            console.log(res.data);


            if (res.data.sts === 0) {
                e.preventDefault()
                setShowToast(true)
                setMsg('Data Added Successfully')
                setType("success")
                setTimeout(() => {
                    setShowToast(false)
                }, 3000)
            } else {
                e.preventDefault()
                setShowToast(true)
                setMsg('Data Not Added Successfully')
                setType("error")
                setTimeout(() => {
                    setShowToast(false)
                }, 3000)
            }

        } catch (error) {
            console.error(error)
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
                food_itemImg: file,
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
                        food_itemImg: croppedImg,
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


    const style = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f2f2f2',
            padding: '20px',
        },
        box: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
            maxWidth: '800px',
            overflow: 'hidden',
            margin: 'auto',
        },
        imageContainer: {
            flex: 1,
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#f2f2f2',
        },
        image: {
            maxWidth: '100%',
            height: '100%',
        },

        itemimage: {
            display: 'flex',
            justifyContent: 'center',
            width: '100px',
            height: '100px',
            margin: 'auto',
        },
        formContainer: {
            flex: 1,
            padding: '20px',
        },
        formHeader: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#333333',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        formInput: {
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #cccccc',
            borderRadius: '5px',
            boxSizing: 'border-box',
            fontSize: '16px',
        },
        formSelect: {
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #cccccc',
            borderRadius: '5px',
            boxSizing: 'border-box',
            fontSize: '16px',
            appearance: 'none',
            background: 'url("data:image/svg+xml,%3Csvg fill=\'%23222\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E") no-repeat right 10px center',
        },
        formButton: {
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: '#ffffff',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
        },
    };

    return (
        <div style={style.container}>
            <div style={style.box}>
                <div style={style.imageContainer}>
                    <img src="./add_menu.jpg" alt="Image" style={style.image} />
                </div>
                <div style={style.formContainer}>
                    <div style={style.form}>
                        <h1 style={style.formHeader}>Add Food Item</h1>
                        <form>
                            <div class="form-sub-w3" >
                                {formData.imgPreview && <img src={formData.imgPreview} alt="Preview" style={style.itemimage} />}
                            </div>
                            <div class="form-sub-w3" style={style.fileInputContainer}>
                                <label htmlFor="fileInput" style={style.fileInputButton}>Choose Logo</label>
                                <input id="fileInput" type='file' name='food_itemImg' style={style.fileInput} onChange={handleImgChange} />
                            </div>
                            <div class="form-sub-w3" >
                                {formData.imgPreview && !isCropping && !showCroppedImage && (
                                    <Cropper
                                        image={formData.imgPreview}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={3 / 3}
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

                            <input style={style.formInput} type="text" name="item_name" id="item_name" placeholder="Food Item Name" required onBlur={handleInputBlur} onChange={handleInputChange} />
                            <input style={style.formInput} type="text" name="item_price" id="item_price" placeholder="Food Item Price" required onBlur={handleInputBlur} onChange={handleInputChange} />
                            <input style={style.formInput} type="text" name="item_ingredients" id="item_ingredients" placeholder="Food Item Ingredients" required onBlur={handleInputBlur} onChange={handleInputChange} />
                            <input style={style.formInput} type="text" name="item_description" id="item_description" placeholder="Food Item Description" required onBlur={handleInputBlur} onChange={handleInputChange} />

                            <select style={style.formSelect} name="food_availability" id="food_availability" onChange={handleChangeAvailablity}>
                                <option value="Available">Available</option>
                                <option value="Not Available">Not Available</option>
                            </select>

                            <select style={style.formSelect} name="food_category" id="food_category" onChange={handleChangeCategory}>
                                <option value="Jain">Jain</option>
                                <option value="Regular">Regular</option>
                                <option value="Both">Both</option>
                            </select>
                            <button type="submit" style={style.formButton} onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Restaurant_Add_Food_Item;
