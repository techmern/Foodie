import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import User_Navbar from '../CommonLayouts/User_Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';

function User_order_Details() {
    
    const [selectedCity, setSelectedCity] = useState('');


    const [orders, setOrders] = useState([]);
    const [orderReplies, setOrderReplies] = useState([]);

    // fetch User , Order 
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const userIdObject = JSON.parse(localStorage.getItem('User'));
                const userId = userIdObject._id;
                // console.log('Fetching orders for user ID:', userId);

                const ordersResponse = await axios.get('http://localhost:5000/placeorder/ordernotify', { params: { userId } });
                console.log('Orders Response:', ordersResponse);

                setOrders(ordersResponse.data);



                const replyPromises = ordersResponse.data.map(async (order) => {
                    const replyResponse = await axios.get('http://localhost:5000/ordereview/viewreply', { params: { userId, orderId: order._id } });
                    return { orderId: order._id, reply: replyResponse.data, driverId: order.driverId._id, };

                });


                // Resolve all promises and update orderReplies state
                const replies = await Promise.all(replyPromises);
                const replyMap = replies.reduce((acc, { orderId, reply }) => {
                    acc[orderId] = reply;
                    return acc;
                }, {});
                setOrderReplies(replyMap);
                // console.log(replies.map(reply => reply.driverId));

            } catch (error) {
                console.error('Error fetching orders:', error);
                // Handle error, e.g., show error message to user
                // alert('Error fetching orders. Please try again later.');
            }
        };

        fetchOrderDetails();
        AOS.init();
    }, []);


    // Download Pdf

    const orderPdfRef = useRef([]);

    const handleDownloadPDF = async (ref, filename) => {
        const input = ref.current;
        try {
            const canvas = await html2canvas(input, { scrollY: -window.scrollY });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${filename}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    // Rating Orders
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [hover, setHover] = useState(0);
    const [orderId, setOrderId] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const handleRatingSubmit = async (e) => {
        e.preventDefault();

        const userIdObject = JSON.parse(localStorage.getItem('User'));
        const userId = userIdObject ? userIdObject.userId : null;
        console.log('User Object:', userIdObject);

        if (!userId) {
            console.error('User is not logged in or userId is not available in local storage');
            return;
        }

        console.log('Current orderId:', orderId); // Log the orderId before submitting


        try {
            const response = await axios.post('http://localhost:5000/ordereview/addordereview', {
                userId,
                orderId: orderId,
                rating: rating,
                review: review,
            });

            console.log(response.data);

            if (response.status === 200 && response.data.msg === 'Review added successfully') {
                alert('Rating Submitted Successfully!');
                setRating('');
                setReview('');
            } else {
                alert('Failed to Add. Please try again.');
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            alert('An error occurred while saving the review.');
        }
    };

    const handleShowModal = (orderId) => {
        // console.log('Order ID:', orderId); 
        setOrderId(orderId);

        setShowModal(true);
    };

    // Rating Driver

    const [showDriverRatingModal, setShowDriverRatingModal] = useState(false);
    const [driverId, setDriverId] = useState(null);

    const handleShowDriverRatingModal = (orderId, driverId) => {
        console.log('driverId:', driverId._id);

        setOrderId(orderId);
        setDriverId(driverId);
        setShowDriverRatingModal(true);

    };

    const handleDriverRatingSubmit = async (e) => {
        e.preventDefault();

        const userIdObject = JSON.parse(localStorage.getItem('User'));
        const userId = userIdObject ? userIdObject.userId : null;
        console.log('User Object:', userIdObject);

        if (!userId) {
            console.error('User is not logged in or userId is not available in local storage');
            return;
        }

        console.log('User ID:', userId);
        console.log('Order ID:', orderId);
        console.log('Driver ID:', driverId._id);


        try {
            const response = await axios.post(' http://localhost:5000/driverreview/adddrivereview', {
                userId,
                orderId: orderId,
                driverId: driverId._id,
                rating: rating,
                review: review,
            });


            console.log(response.data);

            if (response.status === 200 && response.data.msg === 'Review added successfully') {
                alert('Rating Submitted Successfully!');
                setRating('');
                setReview('');
            } else {
                alert('Failed to Add. Please try again.');
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            alert('An error occurred while saving the review.');
        }
    };


    return (
        <div>
            <User_Navbar selectedCity={selectedCity} setSelectedCity={setSelectedCity} />

            <div className="container mt-4" >
                <div className="row" data-aos="fade-up" data-aos-duration="1000">
                    <div className="col" style={{ minHeight: '100px', padding: '30px', marginTop: '20px' }}>
                        <h2 className="text-center mt-4 mb-4" data-aos="fade-up" data-aos-duration="1000">Order Details</h2>
                        {orders.map((order, index) => (
                            <div key={order.order_id} style={{ marginBottom: '20px' }} ref={(el) => (orderPdfRef.current[index] = el)}>
                                <div className="card mb-4" data-aos="fade-up" data-aos-duration="1000">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Order ID:</strong> {order._id}
                                        </div>
                                        <img src="logo.jpg" alt="profile" style={{ width: '80px', borderRadius: '50%' }} className="rounded-circle" />
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title ms-2">Order Items</h4>
                                        <hr />
                                        <h5 className="card-title ms-2"><strong>Restaurant: </strong>{order.restaurant_id.restaurantname}</h5>
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Item Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Ingredients</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items && order.items.length > 0 ? (
                                                    order.items.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.item_name}</td>
                                                            <td>${item.item_price}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.item_ingredients.join(', ')}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4">No items to display</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="card-footer">
                                        <p><strong>Total:</strong> ${order.orderTotal}</p>
                                        <p><strong>Status:</strong> {order.orderStatus}</p>
                                        <p><strong>Delivery Status:</strong> {order.deliveryStatus}</p>

                                        <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                                        {order.orderStatus === 'Confirmed' ? (
                                            <p className="text-success">Your order is <strong>Confirmed!</strong></p>
                                        ) : order.orderStatus === 'Pending' ? (
                                            <p className="text-warning">Your order is <strong>Pending.</strong></p>
                                        ) : order.orderStatus === 'Prepared' ? (
                                            <p className="text-info">Your order is <strong>Prepared.</strong></p>
                                        ) : order.orderStatus === 'Ready' ? (
                                            <p className="text-primary">Your order is <strong>Ready for pickup.</strong></p>
                                        ) : order.orderStatus === 'Cancelled' ? (
                                            <>
                                                <p className="text-danger">Your order has been <strong>Cancelled.</strong></p>
                                            </>) : (
                                            <p className="text-muted">Unknown order status.</p>

                                        )}

                                        <div>
                                            {/* view Reply */}
                                            {orderReplies[order._id] && (
                                                <div>
                                                    <a href="#demoreply" className="btn btn-outline-info btn-sm mb-3" data-bs-toggle="collapse">View Reply</a>
                                                    <p id="demoreply" className={`collapse ${orderReplies[order._id] ? 'show' : ''}`}>
                                                        {orderReplies[order._id].reply}
                                                    </p>
                                                </div>
                                            )}

                                        </div>

                                        {/* View Driver details  */}

                                        {['Ready'].includes(order.orderStatus) ? (
                                            <div>
                                                <a href="#demo" className="btn btn-primary mb-2" data-bs-toggle="collapse">View Delivery Boy Details</a>
                                                <a href="#" className="btn btn-outline-info mb-2 float-end" onClick={() => handleShowModal(order._id)}>Rate Order</a>
                                                <p id="demo" className="collapse mt-2">
                                                    {order.driverId ? (
                                                        <div>
                                                            <strong>Driver Name:</strong> {order.driverId.drivername}
                                                            <br />
                                                            <strong>Phone Number:</strong> {order.driverId.phone_no}
                                                            <br />
                                                            <button className="btn btn-outline-info mt-3 me-3" onClick={() => handleShowDriverRatingModal(order._id, order.driverId)}>Rate Driver</button>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <strong>Driver information not available.</strong>
                                                        </div>
                                                    )}


                                                </p>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div>

                                    {['Delivered', 'Pending'].includes(order.deliveryStatus) && ['Cancelled'].includes(order.orderStatus) ? (
                                        <div>
                                            {/* Rating Modal */}
                                            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none', marginTop: '75px' }}>
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title text-center">Rate Order</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p className='text-center'>Please rate your order:</p>
                                                            <div>
                                                                <div className='col-md-12 d-flex justify-content-center align-items-center flex-column'>
                                                                    <h4 className='text-center'>How was the Order Services?</h4>
                                                                    <div className="rating">
                                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                                           <i
                                                                           key={star}
                                                                           className={`fa-star ${star <= (hover || rating) ? 'fas' : 'far'}`}
                                                                           style={{
                                                                               cursor: 'pointer',
                                                                               fontSize: '2em',
                                                                               color: star <= (hover || rating) ? '#ffc107' : '#e4e5e9'
                                                                           }}
                                                                           onClick={() => setRating(star === rating ? '' : star)}
                                                                           onMouseEnter={() => setHover(star)}
                                                                           onMouseLeave={() => setHover(rating)}
                                                                       />
                                                                        ))}
                                                                    </div>

                                                                    <h4 className='text-center mt-4'>Write Your Comments</h4>

                                                                    <div className='review mb-4'>
                                                                        <textarea className="form-control"
                                                                            style={{ height: '100px', width: '400px', textAlign: 'center' }}

                                                                            placeholder="Enter Your Review"
                                                                            name='review'
                                                                            value={review} onChange={(e) => setReview(e.target.value)}
                                                                        ></textarea>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">

                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                                                            <button type="button" className="btn btn-primary" onClick={handleRatingSubmit} >Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Driver Rating Modal */}
                                            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showDriverRatingModal ? 'block' : 'none', marginTop: '75px' }}>
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title text-center">Rate Driver</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowDriverRatingModal(false)}>
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p className='text-center'>Please rate your Driver:</p>
                                                            <div>
                                                                <div className='col-md-12 d-flex justify-content-center align-items-center flex-column'>
                                                                    <h4 className='text-center'>How was the Driver?</h4>
                                                                    <div className="rating">
                                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                                            <i
                                                                                key={star}
                                                                                className={`fa-star ${star <= (hover || rating) ? 'fas' : 'far'}`}
                                                                                style={{
                                                                                    cursor: 'pointer',
                                                                                    fontSize: '2em',
                                                                                    color: star <= (hover || rating) ? '#ffc107' : '#e4e5e9'
                                                                                }}
                                                                                onClick={() => setRating(star === rating ? 0 : star)}
                                                                                onMouseEnter={() => setHover(star)}
                                                                                onMouseLeave={() => setHover(rating)}
                                                                            />
                                                                        ))}
                                                                    </div>

                                                                    <h4 className='text-center mt-4'>Write Your Comments to Driver</h4>

                                                                    <div className='review mb-4'>
                                                                        <textarea className="form-control"
                                                                            style={{ height: '100px', width: '400px', textAlign: 'center' }}

                                                                            placeholder="Enter Your Review"
                                                                            name='review'
                                                                            value={review} onChange={(e) => setReview(e.target.value)}
                                                                        ></textarea>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowDriverRatingModal(false)}>Close</button>
                                                            <button type="button" className="btn btn-primary" onClick={handleDriverRatingSubmit}  >Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}

                                </div>

                                <div className="text-right mb-4">
                                    <button className="btn btn-primary" onClick={() => handleDownloadPDF({ current: orderPdfRef.current[index] }, `order-details-${order.order_id}`)}>Download Order Details</button>
                                </div>

                            </div>

                        ))}


                    </div>
                </div>
            </div>

        </div>
    )
}

export default User_order_Details