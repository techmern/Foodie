import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../CommonLayouts/Navbar/Navbar'

function Restaurant_Booking_Details() {

    const { tableId } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [editedStatus, setEditedStatus] = useState('');
    const [alertMsg, setAlertMsg] = useState('');

    const fetchBookingDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/tablebooking/getBookingDetails/${tableId}`);
            setBookingDetails(response.data[0]); // Update here
            setEditedStatus(response.data[0].booking_status); // Update here
        } catch (error) {
            console.error("Error fetching booking details:", error);
        }
    };

    useEffect(() => {
        fetchBookingDetails();
    }, [tableId]);

    const handleStatusChange = async () => {
        try {
            await axios.put(`http://localhost:5000/tablebooking/updateBookingStatus/${bookingDetails._id}`, {
                booking_status: editedStatus
            });

            fetchBookingDetails();
            setAlertMsg('Booking status updated successfully!');
        } catch (error) {
            console.error("Error updating booking status:", error);
        }
    };

    const style = {
        container: {
            maxWidth: '600px',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            marginTop: '20px'
        },
        header: {
            textAlign: 'center',
            fontSize: '24px',
            marginBottom: '20px',
        },
        label: {
            fontWeight: 'bold',
            marginRight: '5px',
        },
        input: {
            padding: '8px',
            marginBottom: '10px',
            width: '100%',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
        },
        select: {
            padding: '8px',
            marginBottom: '10px',
            width: 'auto',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            appearance: 'none',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
        },
    };


    return (
        <div>

            <Navbar />
            <div style={style.container}>
                <h1 style={style.header}>Booking Details</h1>
                <p><span style={style.label}>User Name:</span> {bookingDetails?.first_name} {bookingDetails?.last_name}</p>
                <p><span style={style.label}>User Email:</span> {bookingDetails?.Email_Id}</p>
                <p><span style={style.label}>Mobile Number:</span> {bookingDetails?.Mob_No}</p>
                <p><span style={style.label}>Additional Request:</span> {bookingDetails?.additional_request}</p>
                <p><span style={style.label}>Table Number:</span> {bookingDetails?.table_id}</p>
                <p><span style={style.label}>Number of People:</span> {bookingDetails?.number_of_people}</p>
                <p><span style={style.label}>Booking Date:</span> {new Date(bookingDetails?.booking_date).toLocaleDateString()}</p>
                <p>
                    <span style={style.label}>Booking Status:</span>
                    <select style={style.select} value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </p>
                <button style={style.button} onClick={handleStatusChange}>Save</button>
                {alertMsg && (
                    <div style={style.alert}>{alertMsg}</div>
                )}
            </div>
        </div>
    );
}

export default Restaurant_Booking_Details;
