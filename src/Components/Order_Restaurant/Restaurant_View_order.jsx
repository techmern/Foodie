import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../CommonLayouts/Navbar/Navbar';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function Restaurant_View_order() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [orderStatuses, setOrderStatuses] = useState({});
    const [deliveryStatuses, setDeliveryStatuses] = useState({});
    const navigate = useNavigate();
    const [resData, setResData] = useState([]);

    const loggedInRestaurant = JSON.parse(localStorage.getItem('restaurants'));

    const getRes = async () => {
        try {
            if (!loggedInRestaurant) {
                navigate('/loginRestaurant');
            } else {
                const res = await axios.get("http://localhost:5000/restaurantorder/viewOrder");
                const filteredData = res.data.filter(order => {
                    const orderDate = new Date(order.orderDate);
                    const currentDate = new Date();
                    const isDateInRange = (!fromDate || new Date(fromDate) <= orderDate) &&
                        (!toDate || orderDate <= new Date(toDate));
                    const isStatusValid = order.deliveryStatus !== 'Delivered' && order.orderStatus !== 'Cancelled';
                    const isCurrentDateOrder = orderDate.toDateString() === currentDate.toDateString(); // Check if the order date is equal to the current date
    
                    return order.restaurant_id._id === loggedInRestaurant._id && isDateInRange && isStatusValid && isCurrentDateOrder;
                });

                setResData(filteredData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!loggedInRestaurant) {
            navigate('/loginRestaurant');
        } else {
            getRes();
        }
    }, [loggedInRestaurant, fromDate, toDate]);

    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
    };

    const handleOrderStatusChange = async (event, orderId) => {
        const { value } = event.target;
        setOrderStatuses(prevStatuses => ({
            ...prevStatuses,
            [orderId]: value
        }));
        try {
            await axios.put(`http://localhost:5000/restaurantorder/updateOrderStatus/${orderId}`, { orderStatus: value });
            console.log('Order status updated successfully');
        } catch (error) {
            console.error('Failed to update order status', error);
        }
    };

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
            width: "100%",
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
        btn: {
            fontSize: "1em",
            fontWeight: "400",
            textAlign: "center",
            border: "1px solid black",
            outline: "none",
            cursor: "pointer",
            width: "100%",
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
        searchInput: {
            display: 'inline-flex',
            alignOrders: 'center',
        },
        searchIcon: {
            color: 'red',
            marginLeft: '5px',
            cursor: 'pointer',
        },
    };

    const handleDownloadPDF = (order) => {
        const doc = new jsPDF();

        const imgData = new Image();
        imgData.src = `http://localhost:5000/restaurantlogo/${loggedInRestaurant.restaurantImg}`;
        imgData.onload = () => {
            doc.addImage(imgData, 'PNG', 10, 10, 30, 30);
            generatePDFContent(doc, order);
        };
    };

    const generatePDFContent = (doc, order) => {
        doc.setFont('helvetica', 'normal');

        doc.setFontSize(20);
        doc.text(`${loggedInRestaurant.restaurantname}'s Order Receipt`, 105, 20, null, null, 'center');

        // Add order details
        doc.setFontSize(12);
        doc.text(`Order ID: ${order.order_id}`, 10, 50);
        doc.text(`Order Date: ${order.orderDate}`, 10, 60);
        doc.text(`Payment Id: ${order.payment_category},  ${order.paymentId}`, 10, 70);
        doc.text(`User Name: ${order.Username}`, 10, 80);
        doc.text(`Delivery Address: ${order.user_address}, ${order.landmark}, ${order.pincode}`, 10, 90);

        // Add a horizontal line below the delivery address
        doc.line(10, 75, 200, 75);

        // Add ordered items title
        doc.setFontSize(14);
        doc.text('Ordered Items', 10, 100);

        // Add ordered items table
        const columns = ['Item Name', 'Quantity', 'Price', 'Total Price'];
        const rows = order.items.map(item => [
            item.item_name,
            item.quantity.toString(),
            `${item.item_price.toFixed(2)}`,
            `${(item.quantity * item.item_price).toFixed(2)}`
        ]);

        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 110,
            styles: {
                fontSize: 12,
                cellPadding: 3,
            },
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: [255, 255, 255]
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240]
            }
        });

        // Calculate table height
        const finalY = doc.autoTable.previous.finalY;

        // Add total amount below the table
        doc.setFontSize(12);
        doc.text(`Total Amount: ${order.orderTotal}`, 10, finalY + 10);

        // Save the PDF
        doc.save(`order_${order.order_id}.pdf`);
    };



    return (
        <div>
            <Navbar />
            <div style={style.bodycolor}>
                <h1 style={style.testing}>View Order</h1>
                <div style={{ marginLeft: '20px' }}>
                    <span style={{ marginRight: '10px' }}>From Date</span>
                    <input type="date" value={fromDate} onChange={handleFromDateChange} style={{ marginRight: '10px' }} />
                    <span style={{ marginRight: '10px' }}>To Date</span>
                    <input type="date" value={toDate} onChange={handleToDateChange} style={{ marginRight: '10px' }} />
                </div>
                <div>
                {resData.length === 0 ? (
                    <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>No orders available.</p>
                ) : (
                    <div>
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
                                    <th style={style.th}>Payment Method</th>
                                    <th style={style.th}>Payment Id</th>
                                    <th style={style.th}>Order Status</th>
                                    <th style={style.th}>Delivery Status</th>
                                    <th style={style.th}>Driver Detail</th>
                                    <th style={style.th}>Download PDF</th>
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
                                        <td style={style.td}>{new Date(order.orderDate).toLocaleString()}</td>
                                        <td style={style.td}>{order.orderTotal}</td>
                                        <td style={style.td}>{order.payment_category}</td>
                                        <td style={style.td}>{order.paymentId}</td>
                                        <td style={style.td}>
                                            <select
                                                value={orderStatuses[order._id] || order.orderStatus}
                                                onChange={(event) => handleOrderStatusChange(event, order._id)}>
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Prepared">Prepared</option>
                                                <option value="Ready">Ready</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td style={style.td}>
                                            {order.deliveryStatus}
                                        </td>

                                        <td style={style.td}>
                                            Name: {order.drivername || 'N/A'}
                                            <br />
                                            Phone No: {order.phone_no || 'N/A'}
                                        </td>
                                        <td style={style.td}>
                                            <button style={style.btn} onClick={() => handleDownloadPDF(order)}>
                                                PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     )}
                </div>
            </div>
        </div>
    );
}
