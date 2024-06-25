import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../CommonLayouts/Navbar/Navbar';

function Restaurant_View_Cancelled_order() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const navigate = useNavigate();
    const [resData, setResData] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reply, setReply] = useState('');
    const [selectedReview, setSelectedReview] = useState(null);

    const loggedInRestaurant = JSON.parse(localStorage.getItem('restaurants'));

    const getOrders = async () => {
        try {
            if (!loggedInRestaurant) {
                navigate('/loginRestaurant');
            } else {
                const res = await axios.get("http://localhost:5000/restaurantorder/viewOrder");
                const filteredData = res.data.filter(order => {
                    const isStatusValid = order.orderStatus === 'Cancelled';
                    return order.restaurant_id._id === loggedInRestaurant._id && isStatusValid;
                });
                setResData(filteredData);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const getReviews = async () => {
        try {
            const res = await axios.get("http://localhost:5000/ordereview/viewOrderreview");
            setReviews(res.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        if (!loggedInRestaurant) {
            navigate('/loginRestaurant');
        } else {
            getOrders();
            getReviews();
        }
    }, [loggedInRestaurant, fromDate, toDate]);

    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
    };

    const getOrderReview = (orderId) => {
        const review = reviews.find(r => r.orderId._id === orderId);
        return review ? { rating: review.rating, review: review.review, reviewId: review._id } : {};
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} style={style.starIcon}>&#9733;</span>);
        }
        if (halfStar) {
            stars.push(<span key="half" style={style.starIcon}>&#9733;</span>);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} style={style.starIconEmpty}>&#9734;</span>);
        }

        return stars;
    };
    const handleReplyChange = (event) => {
        setReply(event.target.value);
    };

    const handleReplySubmit = async (reviewId) => {
        try {
            const response = await axios.post("http://localhost:5000/ordereview/addReply", {
                reviewId,
                reply,
                restaurantId: loggedInRestaurant._id
            });

            if (response.status === 200) {
                setReply('');
                setSelectedReview(null);
                getReviews();
            } else {
                console.error("Failed to submit reply:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting reply:", error);
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
        bodycolor: {
            backgroundColor: "white",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            padding: "50px",
            height: "100%"
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
        reviewBox: {
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            marginTop: '10px',
            backgroundColor: '#f9f9f9',
            position: 'relative',
        },
        replyButton: {
            position: 'absolute',
            top: '10px',
            right: '10px',
        },
        btn: {
            fontSize: "1em",
            fontWeight: "400",
            textAlign: "center",
            border: "1px solid black",
            outline: "none",
            cursor: "pointer",
            padding: "10px",
            width:"200px",
            borderRadius: "5px",
            backgroundColor: "#f2f2f2",
        },
    };

    return (
        <div>
            <Navbar />
            <div style={style.bodycolor}>
                <h1 style={style.testing}>View Cancelled Order</h1>
                <div style={{ marginLeft: '20px' }}>
                    <span style={{ marginRight: '10px' }}>From Date</span>
                    <input type="date" value={fromDate} onChange={handleFromDateChange} style={{ marginRight: '10px' }} />
                    <span style={{ marginRight: '10px' }}>To Date</span>
                    <input type="date" value={toDate} onChange={handleToDateChange} style={{ marginRight: '10px' }} />
                </div>
                <div>
                    {resData.length === 0 ? (
                        <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>No cancelled orders found.</p>
                    ) : (
                        resData.map((order, index) => {
                            const { rating, review, reviewId } = getOrderReview(order._id);
                            return (
                                <div key={index} style={style.card}>
                                    <div style={style.cardHeader}>Order Id: {order.order_id}</div>
                                    <div style={style.cardBody}>
                                        <div><strong>User Name:</strong> {order.Username}</div>
                                        <div><strong>User Mobile No:</strong> {order.Mob_No}</div>
                                        <div><strong>User Email Id:</strong> {order.Email_Id}</div>
                                        <div><strong>User Address:</strong> {order.user_address}, {order.landmark}, {order.pincode}</div>
                                        <table style={style.table}>
                                            <thead>
                                                <tr>
                                                    <th style={style.th}>Item Name</th>
                                                    <th style={style.th}>Quantity</th>
                                                    <th style={style.th}>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td style={style.td}>{item.item_name}</td>
                                                        <td style={style.td}>{item.quantity}</td>
                                                        <td style={style.td}>{item.item_price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div style={style.cardFooter}>
                                            <div><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</div>
                                            <div><strong>Total:</strong> {order.orderTotal}</div>
                                        </div>
                                        <div style={style.cardFooter}>
                                            <div><strong>Order Status:</strong> {order.orderStatus}</div>
                                            <div><strong>Delivery Status:</strong> {order.deliveryStatus}</div>
                                        </div>
                                        {rating !== undefined &&  (
                                            <div style={style.reviewBox}>
                                                <div><strong>Rating:</strong> {renderStars(rating)}</div>
                                                <div><strong>Review:</strong> {review}</div>
                                                <button style={{ ...style.btn, ...style.replyButton }} onClick={() => setSelectedReview(selectedReview === reviewId ? null : reviewId)}>
                                                    {selectedReview === reviewId ? 'Cancel' : 'Reply'}
                                                </button>
                                                {selectedReview === reviewId && (
                                                    <div>
                                                        <textarea value={reply} onChange={handleReplyChange} placeholder="Write your reply" rows="3" cols="50"/>
                                                        <br/>
                                                        <button style={style.btn} onClick={() => handleReplySubmit(reviewId)}>Submit Reply</button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default Restaurant_View_Cancelled_order;
