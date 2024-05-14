import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';

function Restaurant_Edit_table() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false)
    const [msg, setMsg] = useState('')
    const [type, setType] = useState('')

    const { tableId } = useParams();

    const [tableData, setTableData] = useState({});

    useEffect(() => {
        const loguser = localStorage.getItem('restaurants');
        const restaurants = loguser ? JSON.parse(loguser) : {}; 
      
      
        if (!loguser) {
          navigate('/loginRestaurant');
          return;
        }
      }, [navigate]);

    const [formData, setFormData] = useState({
        table_number: '',
        table_capacity: '',
        table_availability: '',
    });

    const [errors, setErrors] = useState({
        table_number: '',
        table_capacity: '',
        restaurant_id: '',
        table_availability: '',
    })

    
    useEffect(() => {
        fetchTableData(tableId);
    }, [tableId]);

    const fetchTableData = async (tableId) => {
        try {
            // console.log(tableId);
            const res = await axios.get(`http://localhost:5000/restauranttable/getTable/${tableId}`);
            setTableData(res.data); 
            setFormData({
                table_number: res.data.table_number,
                table_capacity: res.data.table_capacity,
                table_availability: res.data.table_availability
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
    }
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
              const res = await axios.put(`http://localhost:5000/restauranttable/updateTable/${tableId}`, formData);
            if (res.data.sts === '1') {
                // e.preventDefault()
                // setShowToast(true)
                // setMsg('Data Updated Successfully')
                // setType("success")
                // setTimeout(() => {
                //     setShowToast(false)
                // }, 3000)
                alert(res.data.msg);  
                navigate('/viewTableRestaurant');
            } else {
                console.error("Deletion failed:", res.data.error); 
            }

        } catch (error) {
            console.error(error)
        }

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
            margin: 'auto auto 10px auto',
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

    const handleBack = () => {
        navigate('/viewTableRestaurant');
    };

    
  return (
    <div style={style.body}>
<button style={style.backButton} onClick={handleBack} onMouseEnter={(e) => (e.target.style.background = '#e0a800')}
                        onMouseLeave={(e) => (e.target.style.background = 'red')}>Back
                    </button>
    <h1 style={style.h1}><span style={style.span}>Update Tables Details</span></h1>
    <ErrorMessage showToast={showToast} msg={msg} type={type} />
    <div style={style.wthreeform}>
        <div class="w3l-login form">

            <form>
                <div class="form-sub-w3">
                    <input style={style.input} type="text" name='table_number' class="form-control" id="table_number" onBlur={handleInputBlur}  placeholder="Table Number" value={formData.table_number}
                        onChange={handleChange} required="" />
                </div>
                <div class="form-sub-w3">
                    <input style={style.input} type="text" name='table_capacity' class="form-control" id="table_capacity" onBlur={handleInputBlur} placeholder="Table Capacity"  value={formData.table_capacity}
                        onChange={handleChange} required="" />
                </div>
                <div class="mb-3">
                    <label style={style.label} htmlFor="table_availability" className="form-label">Select a Table Availability:</label>
                    <br />
                    <select style={style.input} name="table_availability" id="table_availability"  value={formData.table_availability}  onChange={handleChange}>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>
                </div>

                <div class="submit-agileits">
                    <input type="button" value="Update" onClick={handleSubmit}  id='Submit' name='Submit' style={style.button}
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

               
            </form>

        </div>
    </div>
</div>
  )
}

export default Restaurant_Edit_table