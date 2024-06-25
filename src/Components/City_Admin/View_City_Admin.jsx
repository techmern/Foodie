import React, { useEffect, useState } from 'react';
import Sidebar from '../CommonLayouts/Navbar/Sidebar_Admin';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function View_City_Admin() {

    const styles = {
        container: {
            display: 'flex',
            height: '100vh',
        },
        content: {
            flex: 1,
            padding: '20px',
            backgroundColor: '#f9f9f9',
        },
        tableContainer: {
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        th: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
            backgroundColor: '#f2f2f2',
            textAlign: 'left',
        },
        td: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
        buttonsContainer: {
            display: 'flex',
            gap: '10px',
        },
        button: {
            padding: '5px 10px',
            fontSize: '14px',
            cursor: 'pointer',
            borderRadius: '5px',
            border: 'none',
            color: '#fff',
        },
        editButton: {
            backgroundColor: '#4CAF50',
        },
        deleteButton: {
            backgroundColor: '#f44336',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
        },
    };

    const [resData, setResData] = useState([]);
    const navigate = useNavigate();

    const { cityId } = useParams();

    const getRes = async () => {
        try {
            const res = await axios.get("http://localhost:5000/city/viewCity");
            setResData(res.data);
            console.log();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRes();
    }, []);

    const handleEdit = (cityId) => {
        navigate(`/editCity/${cityId}`);
    };

    const handleDelete = async (cityId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/city/deleteCity/${cityId}`);
            if (res.data.sts === '1') {
                alert(res.data.msg);
                getRes();
            } else {
                console.error("Deletion failed:", res.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={styles.container}>
            <Sidebar />
            <div style={styles.content}>
                <div style={styles.title}>City Details</div>
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>City Name</th>
                                <th style={styles.th}>Postal Code</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resData.map((city) => (
                                <tr key={city.id}>
                                    <td style={styles.td}>{city.cityname}</td>
                                    <td style={styles.td}>{city.city_postalcode}</td>
                                    <td style={styles.td}>{city.citystatus}</td>
                                    <td style={styles.td}>
                                        <div style={styles.buttonsContainer}>
                                            <button
                                                style={{ ...styles.button, ...styles.editButton }}
                                                onClick={() => handleEdit(city._id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                style={{ ...styles.button, ...styles.deleteButton }}
                                                onClick={() => handleDelete(city._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default View_City_Admin;
