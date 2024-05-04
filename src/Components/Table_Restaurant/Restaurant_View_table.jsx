import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Restaurant_View_table() {
    const navigate = useNavigate();
    const [resData, setResData] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);

    const loggedInRestaurant = JSON.parse(localStorage.getItem('restaurants'));

    useEffect(() => {
        if (!loggedInRestaurant) {
            navigate('/loginRestaurant');
        } else {
            getRes();
        }
    }, [loggedInRestaurant]);

    const getRes = async () => {
        try {
            const res = await axios.get("http://localhost:5000/restauranttable/viewTable");
            const filteredData = res.data.filter(item => item.restaurant_id._id === loggedInRestaurant._id);
            setResData(filteredData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCheckboxChange = (tableId) => {
        const selectedIndex = selectedTables.indexOf(tableId);
        if (selectedIndex === -1) {
            setSelectedTables([...selectedTables, tableId]);
        } else {
            const updatedSelectedTables = [...selectedTables];
            updatedSelectedTables.splice(selectedIndex, 1);
            setSelectedTables(updatedSelectedTables);
        }
    };

    const updateNotAvailability = async () => {
        try {
            await axios.put("http://localhost:5000/restauranttable/updateAvailability", {
                tableIds: selectedTables,
                availability: "Not Available"
            });
            getRes();
            setSelectedTables([]);
        } catch (error) {
            console.error(error);
        }
    };
    const updateAvailability = async () => {
        try {
            await axios.put("http://localhost:5000/restauranttable/updateAvailability", {
                tableIds: selectedTables,
                availability: "Available"
            });
            getRes();
            setSelectedTables([]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (tableId) => {
        navigate(`/editTable/${tableId}`);
    }

    const deleteTable = async (tableId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/restauranttable/deleteTable/${tableId}`);
            if (res.data.sts === '1') {
                alert(res.data.msg);
                getRes();
            } else {
                console.error("Deletion failed:", res.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    }


    const style = {
        testing: {
            fontSize: "45px",
            fontWeight: 400,
            textAlign: "center",
            letterSpacing: "9px",
            wordSpacing: "4px",
            margin: "40px 0",
            color: "black",
            fontFamily: "'Lobster', cursive",
        },
        bodycolor: {
            backgroundColor: "white",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            padding: "50px",
            height: "100%"
        },
        table: {
            border: "2px solid gray",
            borderRadius: "10px",
            padding: "20px",
            width: "100%",
            margin: "20px"
        },
        th: {
            borderBottom: "2px solid gray",
            padding: "20px",
            margin: "20px",
            textAlign: "center"
        },
        td: {
            padding: "20px",
            margin: "20px",
            textAlign: "center"
        },
        btn: {
            fontSize: "1em",
            fontWeight: "500",
            textAlign: "center",
            border: "2px solid #fff",
            outline: "none",
            cursor: "pointer",
            width: "50%",
            color: "black",
            backgroundColor: "#f2f2f2",
            boxSizing: "border-box",
            borderRadius: "1em",
            marginBottom: "5px"
        },
        btnHover: {
            fontSize: "1em",
            fontWeight: "500",
            textAlign: "center",
            borderRadius: "1em",
            border: "2px solid red",
            outline: "none",
            cursor: "pointer",
            backgroundColor: "transparent",
            color: "red"
        },
        btneditdel: {
            fontSize: "1em",
            fontWeight: "500",
            textAlign: "center",
            border: "2px solid #fff",
            outline: "none",
            cursor: "pointer",
            width: "50%",
            boxSizing: "border-box",
            marginBottom: "5px"
        },
        btneditdelHover: {
            fontSize: "1em",
            fontWeight: "500",
            textAlign: "center",
            cursor: "pointer",
            color: "red"
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
        navigate('/addtableRestaurant');
    };

    return (

        <div style={style.bodycolor}>
<button style={style.backButton} onClick={handleBack} onMouseEnter={(e) => (e.target.style.background = '#e0a800')}
                        onMouseLeave={(e) => (e.target.style.background = 'red')}>Back
                    </button>
            <h1 style={style.testing}>View Table Detail</h1>

            <div>
                <div>
                    <table style={style.table}>
                        <thead>
                            <tr>
                                <th style={style.th}>Restaurants Name</th>
                                <th style={style.th}>Table Number</th>
                                <th style={style.th}>Table Capacity</th>
                                <th style={style.th}>Table Availability</th>
                                <th style={style.th}></th>
                                <th style={style.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resData.map((item, index) => (
                                <tr key={index}>

                                    <td style={style.td}>{item.restaurant_id.restaurantname}</td>
                                    <td style={style.td}>{item.table_number}</td>
                                    <td style={style.td}>{item.table_capacity}</td>
                                    <td style={style.td}>{item.table_availability}</td>
                                    <td style={style.td}>
                                        <input type="checkbox" onChange={() => handleCheckboxChange(item._id)} checked={selectedTables.includes(item._id)} />
                                    </td>
                                    <td style={style.td}>

                                        <input type="button" value="Edit" onClick={() => handleEdit(item._id)} id="Submit" name="Submit" style={style.btneditdel}
                                            onMouseOver={(e) => {
                                                e.target.style.backgroundColor = '#f2f2f2';
                                                e.target.style.color = 'red';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.backgroundColor = '#f2f2f2';
                                                e.target.style.color = 'black';
                                                e.target.style.transition = '0.5s all';
                                            }} />
                                        
                                        <br/>

                                        <input type="button" value="Delete" onClick={() => deleteTable(item._id)} id="Submit" name="Submit" style={style.btneditdel}
                                            onMouseOver={(e) => {
                                                e.target.style.backgroundColor = '#f2f2f2';
                                                e.target.style.color = 'red';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.backgroundColor = '#f2f2f2';
                                                e.target.style.color = 'black';
                                                e.target.style.transition = '0.5s all';
                                            }} />
                                      


                                        </td>
                                </tr>
                            ))}
                        </tbody>
                        <div>

                            <input type="button" value="Available" onClick={updateAvailability} id="Submit" name="Submit" style={style.btn}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#f2f2f2';
                                    e.target.style.color = 'red';
                                    e.target.style.borderRadius = '1em';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = '#f2f2f2';
                                    e.target.style.color = 'black';
                                    e.target.style.transition = '0.5s all';
                                }} />

                            <input type="button" value="Not Available" onClick={updateNotAvailability} id="Submit" name="Submit" style={style.btn}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#f2f2f2';
                                    e.target.style.color = 'red';
                                    e.target.style.borderRadius = '1em';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = '#f2f2f2';
                                    e.target.style.color = 'black';
                                    e.target.style.transition = '0.5s all';
                                }} />
                        </div>
                    </table>
                </div>
            </div>
        </div>


    )
}
