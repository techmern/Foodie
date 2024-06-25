import React, { useEffect, useState } from 'react'
import Sidebar from '../CommonLayouts/Navbar/Sidebar_Admin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function View_Driver_Admin() {


    const styles = {
        container: {
            display: 'flex',
            height: '100vh',
        },
        table: {
            borderCollapse: 'collapse',
            width: '100%',
        },
        th: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '8px',
        },
        td: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '8px',
        },
        button: {
            marginRight: '5px',
            marginTop:'5px',
            width:'100px'
        },
        h1: {
            fontSize: "45px",
            fontWeight: 400,
            textAlign: "center",
            letterSpacing: "9px",
            wordSpacing: "4px",
            margin: "40px 0",
            color: "black",
        },
    };


    const [resData, setResData] = useState([]);
    const navigate = useNavigate();

    const getRes = async () => {
        try {
            const res = await axios.get("http://localhost:5000/driver/viewDriver");
            setResData(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {

        getRes();

    }, []);

    const handleEdit =  (driverId) => {
        navigate(`/editDriver/${driverId}`);
    }


    const handleDelete = async (driverId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/driver/deleteDriver/${driverId}`);
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

    return (

        <div style={styles.container}>
            <Sidebar />
            <div>
                <div>
                    <h1 style={styles.h1}>Driver Details</h1>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Driver Name</th>
                                <th style={styles.th}>Email ID</th>
                                <th style={styles.th}>Password</th>
                                <th style={styles.th}>Mobile Number</th>
                                <th style={styles.th}>City</th>
                                <th style={styles.th}>License Number</th>
                                <th style={styles.th}>Vehicle Type</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resData.map((driver) => (
                                <tr key={driver.id}>
                                    <td style={styles.td}>{driver._id}</td>
                                    <td style={styles.td}>{driver.drivername}</td>
                                    <td style={styles.td}>{driver.emailid}</td>
                                    <td style={styles.td}>{driver.password}</td>
                                    <td style={styles.td}>{driver.phone_no}</td>
                                    <td style={styles.td}>{driver.city}</td>
                                    <td style={styles.td}>{driver.license_no}</td>
                                    <td style={styles.td}>{driver.vehicle_type}</td>
                                    <td style={styles.td}>
                                        <button style={styles.button} onClick={() => handleEdit(driver._id)}>Edit</button>
                                        <br/>
                                        <button style={styles.button} onClick={() => handleDelete(driver._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}
