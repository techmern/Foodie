import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';

function Restaurant_Add_table() {

    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false)
    const [msg, setMsg] = useState('')
    const [type, setType] = useState('')
    const [selectedAvailablity, setselectedAvailablity] = useState('');

    const loguser = localStorage.getItem('restaurants')

    const restaurants = JSON.parse(loguser);

    const [formData, setFormData] = useState({
        table_number: '',
        table_capacity: '',
        restaurant_id: restaurants._id,
        table_availability: '',
    })

    const [errors, setErrors] = useState({
        table_number: '',
        table_capacity: '',
        restaurant_id: '',
        table_availability: '',
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

    }, [formData, showToast, msg, type, selectedAvailablity])


    const handleSubmit = async (e) => {
        try {
            if (!formData.table_number.trim()) {
                setShowToast(true);
                setMsg('Please enter Table Number');
                setType('error');
                return;
            }
            if (!formData.table_capacity.trim()) {
                setShowToast(true);
                setMsg('Please enter Table Capacity');
                setType('error');
                return;
            }


            const res = await axios.post("http://localhost:5000/restauranttable/addTable", {
                ...formData,
                restaurant_id: formData.restaurant_id,
                table_availability: selectedAvailablity,
            });
            console.log(res.data)

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

    const handleTableView = () => {
        navigate('/viewTableRestaurant');
    }

    const style = {
        body: {
            backgroundImage: "url('/table_bg.jpg')",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: "100vh",
            margin: 0,
            padding: "10px"
          },
          span: {
            color: "red"
          },
          bottomtext: {
            color: "red",
            fontSize: "20px"
          },
          wthreeform: {
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.07)",
            width: "40%",
            margin: "0 auto",
            padding: "3em",
            boxShadow: "1px 1px 0px red",
            opacity: "10",
            boxSizing: "border-box"
          },
          h1: {
            fontSize: "45px",
            fontWeight: 400,
            textAlign: "center",
            letterSpacing: "9px",
            wordSpacing: "4px",
            margin: "40px 0",
            color: "#fff",
            fontFamily: "'Lobster', cursive",
        },
        button: {
            fontSize: '1em',
            fontWeight: 500,
            textAlign: 'center',
            letterSpacing: '3px',
            margin: '20px 0',
            padding: '8px 0',
            border: '2px solid #fff',
            outline: 'none',
            cursor: 'pointer',
            width: '50%',
            boxSizing: 'border-box',
            transition: '0.5s all',
            borderRadius: '2em',
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
        input: {
            fontSize: '1em',
            fontWeight: 500,
            textAlign: 'center',
            letterSpacing: '1px',
            margin: '10px',
            width: '300px',
            padding: '8px 0',
            border: '2px solid #fff',
            outline: 'none',
            boxSizing: 'border-box',
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
        a: {
            color: "red",
            textDecoration: "none",
            letterSpacing: "1px",
        },
    };

    return (
      
             <div style={style.body}>

            <h1 style={style.h1}><span style={style.span}>Add Tables Details</span></h1>
            <ErrorMessage showToast={showToast} msg={msg} type={type} />
            <div style={style.wthreeform}>
                <div class="w3l-login form">

                    <form>
                        <div class="form-sub-w3">
                            <input style={style.input} type="text" name='table_number' class="form-control" id="table_number" onBlur={handleInputBlur} onChange={handleInputChange} placeholder="Table Number" required="" />
                        </div>
                        <div class="form-sub-w3">
                            <input style={style.input} type="text" name='table_capacity' class="form-control" id="table_capacity" onBlur={handleInputBlur} onChange={handleInputChange} placeholder="Table Capacity" required="" />
                        </div>
                        <div class="mb-3">
                            <label style={style.label} htmlFor="table_availability" className="form-label">Select a Table Availability:</label>
                            <br />
                            <select style={style.input} name="table_availability" id="table_availability" onChange={handleChangeAvailablity}>
                                <option value="Available">Available</option>
                                <option value="Not Available">Not Available</option>
                            </select>
                        </div>

                        <div class="submit-agileits">
                           <input type="button" value="Submit" onClick={handleSubmit}  id='Submit' name='Submit' style={style.button}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#fff';
                                    e.target.style.borderRadius = '2em';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = 'white';
                                    e.target.style.color = 'black';
                                    e.target.style.transition = '0.5s all';
                                }} />

                        </div>

                        <a href=""  style={style.a} onClick={handleTableView}>View Table Details</a>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default Restaurant_Add_table