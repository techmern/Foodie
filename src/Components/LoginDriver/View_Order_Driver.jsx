import React, { useEffect, useState } from 'react';
import Navbar from '../CommonLayouts/Navbar/Navbar_Driver';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function View_Order_Driver() {
    const loggedInDriver = JSON.parse(localStorage.getItem('driver')) || {};
    const [deliveryStatuses, setDeliveryStatuses] = useState({});
    const [paymentStatuses, setPaymentStatuses] = useState({});
    const navigate = useNavigate();
    const [resData, setResData] = useState([]);
    const { restaurantId } = useParams();

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
            padding: "10px",
            width: "90%",
            margin: "5px"
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
        note: {
            margin: "20px",
            fontSize: "35px",
            fontWeight: 400,
        }
    };

    const getRes = async () => {
        try {
            if (!loggedInDriver) {
                navigate('/loginDriver');
            } else {
                const res = await axios.get(`http://localhost:5000/restaurantorder/viewSingleOrder/${restaurantId}`);
                const currentDateOrders = res.data.filter(order => {
                    const orderDate = new Date(order.orderDate).toLocaleDateString();
                    const currentDate = new Date().toLocaleDateString();
                    return orderDate === currentDate && order.deliveryStatus !== 'Delivered' && order.orderStatus !== 'Cancelled';
                });
                setResData(currentDateOrders);

            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!loggedInDriver) {
            navigate('/loginDriver');
        } else {
            getRes();
        }
    }, [loggedInDriver]);

    const handleDeliveryStatusChange = async (event, orderId) => {
        const { value } = event.target;
        setDeliveryStatuses(prevStatuses => ({
            ...prevStatuses,
            [orderId]: value
        }));

        try {
            const payload = { deliveryStatus: value };

            if (value === "Accept") {
                payload.driverId = loggedInDriver._id;
            }

            await axios.put(`http://localhost:5000/restaurantorder/updateDeliveryStatus/${orderId}`, payload);
            console.log('Delivery status updated successfully');
        } catch (error) {
            console.error('Failed to update delivery status', error);
        }
    };

    const handlePaymentStatusChange = async (event, orderId) => {
        const { value } = event.target;
        setPaymentStatuses(prevStatuses => ({
            ...prevStatuses,
            [orderId]: value
        }));

        try {
            const payload = {};

            if (value === "Accept") {
                const randomPaymentId = `pay_${Math.random().toString(36).substr(2, 9)}`;
                payload.paymentId = randomPaymentId;
                payload.payment_category = "Cash On Delivery";
            }

            await axios.put(`http://localhost:5000/restaurantorder/updatePaymentStatus/${orderId}`, payload);
            console.log('Payment status updated successfully');
            getRes();  // Refresh the orders list to reflect the updated payment status
        } catch (error) {
            console.error('Failed to update payment status', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div style={style.bodycolor}>
                <h1 style={style.testing}>View Order</h1>
                {resData.length === 0 ? (
                    <p style={style.note}>No Orders Found</p>
                ) : (
                    <table style={style.table}>
                        <thead>
                            <tr>
                                <th style={style.th}>Order Id</th>
                                <th style={style.th}>User Name</th>
                                <th style={style.th}>User Mob_No</th>
                                <th style={style.th}>User Email_Id</th>
                                <th style={style.th}>User Address</th>
                                <th style={style.th}>Item Name</th>
                                <th style={style.th}>Item Quantity</th>
                                <th style={style.th}>Item Price</th>
                                <th style={style.th}>Order Date</th>
                                <th style={style.th}>Order Total</th>
                                <th style={style.th}>Order Status</th>
                                <th style={style.th}>Delivery Status</th>
                                <th style={style.th}>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resData.map((order, index) => (
                                <tr key={index}>
                                    <td style={style.td}>{order.order_id}</td>
                                    <td style={style.td}>{order.Username}</td>
                                    <td style={style.td}>{order.Mob_No}</td>
                                    <td style={style.td}>{order.Email_Id}</td>
                                    <td style={style.td}>{order.user_address}, {order.landmark}, {order.pincode}</td>
                                    <td style={style.td}>
                                        {order.items.map((item, idx) => (
                                            <div key={idx}>
                                                <p>{item.item_name}</p>
                                            </div>
                                        ))}
                                    </td>
                                    <td style={style.td}>
                                        {order.items.map((item, idx) => (
                                            <div key={idx}>
                                                <p>{item.quantity}</p>
                                            </div>
                                        ))}
                                    </td>
                                    <td style={style.td}>
                                        {order.items.map((item, idx) => (
                                            <div key={idx}>
                                                <p>{item.item_price}</p>
                                            </div>
                                        ))}
                                    </td>
                                    <td style={style.td}>{new Date(order.orderDate).toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}</td>
                                    <td style={style.td}>{order.orderTotal}</td>
                                    <td style={style.td}>{order.orderStatus}</td>
                                    <td style={style.td}>
                                        <select
                                            value={deliveryStatuses[order._id] || order.deliveryStatus}
                                            onChange={(event) => handleDeliveryStatusChange(event, order._id)}>
                                            <option value="Pending">Select Status</option>
                                            <option value="Accept">Accept</option>
                                            <option value="On the way To Pickup">On the way To Pickup</option>
                                            <option value="Pickup">Pickup</option>
                                            <option value="On the Way Delivered">On the Way Delivered</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td style={style.td}>
                                        {order.payment_category === 'Cash On Delivery' ? (
                                            <select
                                                value={paymentStatuses[order._id] || order.paymentStatus}
                                                onChange={(event) => handlePaymentStatusChange(event, order._id)}>
                                                <option value="Pending">Select Status</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Accept">Accept</option>
                                            </select>
                                        ) : (
                                            <span>Payment Done</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default View_Order_Driver;
