import React, { useEffect, useState } from 'react';
import Navbar from '../CommonLayouts/Navbar/Navbar_Driver';
import axios from 'axios';


function View_My_Past_Order_Driver() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [reviews, setReviews] = useState([]);
    const driverId = JSON.parse(localStorage.getItem('driver'))._id;

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axios.get('http://localhost:5000/restaurantorder/viewOrder');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }

        fetchOrders();
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/driverreview/viewDriverview');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        if (orders.length > 0) {
            const filtered = orders.filter(order => {
                const orderDate = new Date(order.orderDate).toLocaleDateString();
                const filterDate = selectedDate ? new Date(selectedDate).toLocaleDateString() : null;
                return (
                    order.deliveryStatus === 'Delivered' &&
                    order.driverId === driverId &&
                    (!filterDate || orderDate === filterDate)
                );
            });
            setFilteredOrders(filtered);
        }
    }, [orders, driverId, selectedDate]);

    const getOrderReview = (orderId) => {
        const review = reviews.find(r => r.orderId._id === orderId);
        return review ? { rating: review.rating, review: review.review, reviewId: review._id } : { rating: null, review: 'No review available', reviewId: null };
    };

    const renderStars = (rating) => {
        const stars = [];
        if (rating === null) {
            for (let i = 0; i < 5; i++) {
                stars.push(<span key={`empty-${i}`} style={styles.starIconEmpty}>&#9734;</span>);
            }
            return stars;
        }

        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} style={styles.starIcon}>&#9733;</span>);
        }
        if (halfStar) {
            stars.push(<span key="half" style={styles.starIcon}>&#9733;</span>);
        }
        const remainingEmptyStars = 5 - fullStars - halfStar;
        for (let i = 0; i < remainingEmptyStars; i++) {
            stars.push(<span key={`empty-${i}`} style={styles.starIconEmpty}>&#9734;</span>);
        }

        return stars;
    };

    const styles = {
        title: {
            fontSize: "45px",
            fontWeight: 400,
            textAlign: "center",
            letterSpacing: "9px",
            wordSpacing: "4px",
            margin: "40px 0",
            color: "black",
            fontFamily: "'Lobster', cursive",
        },
        container: {
            backgroundColor: "white",
            padding: "50px",
            minHeight: "100vh"
        },
        dateFilter: {
            display: 'inline-flex',
            alignItems: 'center',
            marginBottom: '20px'
        },
        dateInput: {
            fontSize: '16px',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginLeft: '10px'
        },
        card: {
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "20px",
            margin: "10px 0",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        },
        cardHeader: {
            fontWeight: "bold",
            marginBottom: "10px"
        },
        cardBody: {
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        },
        cardFooter: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px"
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '10px'
        },
        th: {
            borderBottom: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
            fontWeight: 'bold'
        },
        td: {
            borderBottom: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left'
        },
        noOrders: {
            textAlign: 'center',
            fontSize: '20px',
            marginTop: '20px'
        },
        starIcon: {
            color: '#ff9900',
            marginRight: '5px',
            fontSize: '24px',
        },
        starIconEmpty: {
            color: 'gray',
            marginRight: '5px',
            fontSize: '24px',
        },
    };

    
    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <h1 style={styles.title}>My Completed Orders</h1>
                <div style={styles.dateFilter}>
                    <label htmlFor="dateInput">Choose Date:</label>
                    <input
                        id="dateInput"
                        type="date"
                        style={styles.dateInput}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => {
                        const { rating, review } = getOrderReview(order._id);
                        return (
                            <div key={order._id} style={styles.card}>
                                <div style={styles.cardHeader}>Order ID: {order.order_id}</div>
                                <div style={styles.cardBody}>
                                    <div><strong>User Name:</strong> {order.Username}</div>
                                    <div><strong>Restaurant Name:</strong> {order.restaurantname}</div>
                                    <div><strong>User Address:</strong> {order.user_address}, {order.landmark}, {order.pincode}</div>
                                    <div><strong>User Mobile No:</strong> {order.Mob_No}</div>
                                    <div><strong>User Email Id:</strong> {order.Email_Id}</div>
                                    <table style={styles.table}>
                                        <thead>
                                            <tr>
                                                <th style={styles.th}>Item Name</th>
                                                <th style={styles.th}>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.items.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td style={styles.td}>{item.item_name}</td>
                                                    <td style={styles.td}>{item.quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div style={styles.cardFooter}>
                                        <div><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</div>
                                        <div><strong>Total:</strong> Rs.{order.orderTotal}</div>
                                    </div>
                                    <div style={styles.cardFooter}>
                                        <div><strong>Payment Method:</strong> {order.payment_category}</div>
                                    </div>
                                    <div>
                                        <div><strong>Rating:</strong> {renderStars(rating)}</div>
                                        <div><strong>Review:</strong> {review}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p style={styles.noOrders}>No past orders found.</p>
                )}
            </div>
        </div>
    );
}

export default View_My_Past_Order_Driver;
