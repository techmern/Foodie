import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import Navbar from '../CommonLayouts/Navbar/Navbar'

export default function Restaurant_Edit_Food_item_Image() {

    const navigate = useNavigate();

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    const [showCroppedImage, setShowCroppedImage] = useState(false);

    const [menuData, setMenuData] = useState({});

    const { itemid } = useParams();

    const style = {

        header: {
            backgroundColor: '#f9f9f9',
            color: 'black',
            padding: '20px',
            fontSize: "45px",
            fontWeight: 400,
            textAlign: "center",
            letterSpacing: "9px",
            wordSpacing: "4px",
            marginTop:'60px',
            margin: "auto",
            fontFamily: "'Lobster', cursive",
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        },

        backButton: {
            position: 'absolute',
            marginLeft: '20px',
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: 'red',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
        },
        mainContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'auto',
            padding: '20px',
        },
        formContainer: {
            backgroundColor: "#f9f9f9",
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '500px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        },


        button: {
            fontSize: '1em',
            fontWeight: 500,
            textAlign: 'center',
            letterSpacing: '3px',
            margin: '20px 20px 20px 20px',
            justifyContent: 'center',
            padding: '8px 0',
            border: '2px solid red',
            outline: 'none',
            cursor: 'pointer',
            width: '50%',
            boxSizing: 'border-box',
            transition: '0.5s all',
            borderRadius: '2em',
            backgroundColor: 'red',
            color: 'white',
        },

        buttonHover: {
            fontSize: '1em',
            fontWeight: 500,
            textAlign: 'center',
            borderRadius: '2em',
            border: '2px solid #fff',
            padding: '8px 0',
            outline: 'none',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: '#fff',
        },
        image: {
            width: '200px',
            height: '200px',
            margin: 'auto',
            border: '1px solid #ccc',
            borderRadius: '25px',
            objectFit: 'cover',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '15px',
            marginTop:'20px',
        },
        file:{
            marginLeft:'20px',
        },
    };


    const handleBack = () => {
        navigate('/viewfooditemRestaurant');
    };

    const [formData, setFormData] = useState({
        restaurant_id: '',
        food_itemImg: '',
    });



    useEffect(() => {
        const loguser = localStorage.getItem('restaurants');
        const restaurants = loguser ? JSON.parse(loguser) : {};

        if (!loguser) {
            navigate('/loginRestaurant');
            return;
        }
        fetchMenuData(itemid);
    }, [itemid]);


    const fetchMenuData = async (itemid) => {
        try {
            const res = await axios.get(`http://localhost:5000/restaurantmenu/getMenu/${itemid}`);
            console.log(res.data.food_category);
            setMenuData(res.data);
            setFormData({
                item_name: res.data.item_name,
                item_price: res.data.item_price,
                item_ingredients: res.data.item_ingredients,
                item_description: res.data.item_description,
                food_availability: res.data.food_availability,
                food_category: res.data.food_category,
                food_itemImg: res.data.food_itemImg,
            });
        } catch (error) {
            console.error(error);
        }
    };



    const handleImgChange = (e) => {
     
        const file = e.target.files[0];
        if (file) {

            setShowCroppedImage(false);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
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

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onCropChange = useCallback((crop) => {
        setCrop(crop);
    }, []);

    const onZoomChange = useCallback((zoom) => {
        setZoom(zoom);
    }, []);

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.food_itemImg) {
            const formDataToUpload = new FormData();
            formDataToUpload.append('food_itemImg', formData.food_itemImg);

            axios.post(`http://localhost:5000/restaurantmenu/updatefoodimg/${itemid}`, formDataToUpload)
                .then((response) => {
                    console.log(response);
                    setFormData({
                        ...formData,
                        food_itemImg: response.data.item.food_itemImg,
                        imgPreview: null
                    });
                    setShowCroppedImage(false);
                    alert("Image updated successfully!");
                    navigate('/viewfooditemRestaurant')
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.error("No cropped image to upload.");
        }
    }


    return (


        <div>

            <Navbar/>
            <button style={style.backButton} onClick={handleBack}>Back</button>
            <header style={style.header}>
                <h1>Update Food Item Details</h1>
            </header>


            <div style={style.mainContainer}>
                <table style={style.formContainer}>
                    <tbody>
                        <tr>
                            <td>
                                {formData.imgPreview ? (
                                    <img src={formData.imgPreview} style={style.image} alt="New Image" />
                                ) : (
                                    <img src={`http://localhost:5000/foodmenu/${formData.food_itemImg}`} style={style.image} />
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <input type='file' name='food_itemImg' onChange={handleImgChange} style={style.file}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
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
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <form>
                                    <div className="submit-agileits">
                                        <input
                                            type="button"
                                            value="Update"
                                            onClick={handleSubmit}
                                            id='Submit'
                                            name='Submit'
                                            style={style.button}
                                            onMouseOver={(e) => {
                                                e.target.style.backgroundColor = '#f0f0f0';
                                                e.target.style.color = 'red';
                                                e.target.style.borderRadius = '2em';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.backgroundColor = 'red';
                                                e.target.style.color = 'white';
                                                e.target.style.transition = '0.5s all';
                                            }}
                                        />
                                    </div>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}
