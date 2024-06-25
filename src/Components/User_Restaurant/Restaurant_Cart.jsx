import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User_Navbar from '../CommonLayouts/User_Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Restaurant_Cart() {
  const [cartData, setCartData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [orderId, setOrderId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [selectedCity, setSelectedCity] = useState('');

  const [showModal, setShowModal] = useState(false); // Add these states

  useEffect(() => {
    const localStorageCartData = localStorage.getItem('Cart');
    const userId = localStorage.getItem('User');

    if (localStorageCartData && userId) {
      const cartItems = JSON.parse(localStorageCartData);
      const userCartItems = cartItems.filter(item => item.userId === userId);
      setCartData(userCartItems);
    }

    // Fetch addresses
    const fetchAddresses = async () => {
      try {
        const userIdObject = JSON.parse(localStorage.getItem('User'));
        const userId = userIdObject._id;
        console.log('Fetching addresses for user ID:', userId);
        const response = await axios.get('http://localhost:5000/useraddress/viewaddress', { params: { userId } });
        setAddresses(response.data);
        setSelectedAddress(response.data[0]?._id || ""); // Set default address if available
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();

    // payment script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const calculateTotal = () => {
    return cartData.reduce((total, item) => total + item.item_price * item.quantity, 0);
  };

  const handleIncrement = (itemId) => {
    const updateCart = cartData.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartData(updateCart);
    updateLocalStorage(updateCart);
  };

  const handleDecrement = (itemId) => {
    const updateCart = cartData.map(item =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartData(updateCart);
    updateLocalStorage(updateCart);
  };

  const handleRemoveItem = (itemId) => {
    const updateCart = cartData.filter(item => item.id !== itemId);
    setCartData(updateCart);
    updateLocalStorage(updateCart);
    alert('Item removed From Cart successfully!');
  };

  const updateLocalStorage = (updateCart) => {
    const userId = localStorage.getItem('User');
    const allCartItems = JSON.parse(localStorage.getItem('Cart')) || [];
    const otherUserCartItems = allCartItems.filter(item => item.userId !== userId);

    const updatedCartData = [...otherUserCartItems, ...updateCart];

    localStorage.setItem('Cart', JSON.stringify(updatedCartData));
  };

  const handlePlaceOrder = async (paymentId = null) => {
    try {
      const userIdObject = JSON.parse(localStorage.getItem('User'));
      const userId = userIdObject.userId;
      const cartItems = JSON.parse(localStorage.getItem('Cart')).map(item => ({
        item_name: item.item_name,
        item_price: item.item_price,
        quantity: item.quantity,
        item_description: item.item_description,
        item_ingredients: item.item_ingredients,
        food_itemImg: item.food_itemImg,
        restaurant_id: item.restaurant_id // Add restaurant_id here

      }));

      const restaurant_id = cartItems[0].restaurant_id;

      const friendDetailsData = hasFriendDetails
        ? {
          first_name: friendDetails.first_name,
          last_name: friendDetails.last_name,
          Email_Id: friendDetails.Email_Id,
          Mob_No: friendDetails.Mob_No,
        }
        : null;

      const orderData = {
        order_id: orderId,
        userId,
        restaurant_id: restaurant_id,
        user_address_id: selectedAddress,
        cartData: cartItems,
        payment_category: paymentMethod,
        paymentId: paymentId || undefined,
        friendDetails: friendDetailsData ? friendDetails : null, // Use friendDetails state directly
        hasFriendDetails: hasFriendDetails,

      };



      console.log('Order Data:', orderData); // Debugging line

      const response = await axios.post('http://localhost:5000/placeorder/addplaceorder', orderData);

      console.log('Orders placed:', response.data);
      alert('Orders Placed Successfully!');
      localStorage.removeItem('Cart');

    } catch (error) {
      console.error('Error placing orders:', error);
      alert('Error placing orders. Please try again.');
    }
  };

  const handlePayment = async () => {
    try {
      const amountInPaise = calculateTotal() * 100; // Convert to paise (Razorpay expects amount in paise)

      const response = await axios.post('http://localhost:5000/payment/createorderpayment', {
        amount: amountInPaise,
      });

      console.log('Payment response:', response.data);

      const options = {
        key_id: "rzp_test_EqrXL3OgBTF9dW", // Replace with your actual Razorpay API Key ID
        amount: response.data.amount,
        currency: response.data.currency,
        order_id: response.data.id,
        name: "Your Business Name",
        description: "Order Payment",
        handler: function (response) {
          alert('Payment Successful!');
          handlePaymentSuccess(response);
        },
        prefill: {
          name: "Customer Name",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      }

    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again.');
    }
  };

  const handlePaymentSuccess = (response) => {
    console.log(response);
    handlePlaceOrder(response.razorpay_payment_id);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  // friendDetails
  const [friendList, setFriendList] = useState([]);
  const [hasFriendDetails, setHasFriendDetails] = useState(false);

  const [friendDetails, setFriendDetails] = useState({
    first_name: '',
    last_name: '',
    Email_Id: '',
    Mob_No: '',
  });



  const handleFriendDetailsChange = (e) => {
    const { name, value } = e.target;
    setFriendDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    console.log('Updated Friend Details:', { name, value }); // Debugging line
  };

  const handleAddFriend = () => {
    setFriendDetails((prevDetails) => ({
      first_name: prevDetails.first_name.trim(),
      last_name: prevDetails.last_name.trim(),
      Email_Id: prevDetails.Email_Id.trim(),
      Mob_No: prevDetails.Mob_No.trim(),
    }));

    console.log('Final Friend Details:', friendDetails); // Debugging line

    setHasFriendDetails(true);
    setShowModal(false);
  };


  return (
    <div className="mt-5" >

      <div className='mt-5' >
        <User_Navbar selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      </div>
      <div className="container mt-5" data-aos="fade-up" data-aos-duration="1000">
        <div className="card p-3 " style={{ marginTop: '100px' }}>
          <h1 className="text-center mb-4"><strong>Cart</strong></h1>

          <div className="table-responsive" data-aos="fade-up" data-aos-duration="1000">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr className='table-secondary text-center'>
                  <th scope="col">Item Image</th>
                  <th scope="col">Item Description</th>
                  <th scope="col">Item Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item, index) => (
                  <tr key={index}>
                    <td className="align-middle text-center">
                      <img
                        src={`http://localhost:5000/foodmenu/${item.food_itemImg}`}
                        alt={item.food_itemImg}
                        className="img-fluid"
                        style={{ maxWidth: "90px" }}
                      />
                    </td>
                    <td width={'60%'}>
                      <strong>{item.item_name}</strong>
                      <p>{item.item_description}</p>
                    </td>
                    <td className="align-middle text-center">₹{item.item_price}</td>

                    <td className="align-middle text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <button type="button" className="btn btn-secondary btn-sm mx-0.5" onClick={() => handleDecrement(item.id)}>-</button>
                        <span className="btn btn-light btn-sm mx-0.5">{item.quantity}</span>
                        <button type="button" className="btn btn-secondary btn-sm mx-0.5" onClick={() => handleIncrement(item.id)}>+</button>
                      </div>
                    </td>
                    <td className="align-middle text-center">₹{item.item_price * item.quantity}</td>
                    <td className="align-middle text-center">
                      <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(item.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3}></td>
                  <td className='text-center'>
                    <strong>Total:</strong>
                  </td>
                  <td className='text-center' colSpan={2}>
                    <strong>{calculateTotal().toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="form-group">

              <label htmlFor="addressSelect"><strong>Select Delivery Address:</strong></label>
              <select
                id="addressSelect"
                className="form-control"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                {addresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {address.user_address}, {address.landmark}, {address.pincode}
                  </option>
                ))}
              </select>
              <a href="/useraddress" className="btn btn-outline-secondary  mb-2 float-end mt-3 ml-3" >  Add New Address</a>

              <button className="btn btn-outline-secondary  mb-2 float-end mt-3 ml-3" onClick={() => setShowModal(true)}>
                Order For Others
              </button>

            </div>



            <div className="form-group">
              <label><strong>Select Payment Method:</strong></label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment_category"
                  id="Cash On Delivery"
                  value="Cash On Delivery"
                  checked={paymentMethod === "Cash On Delivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="Cash On Delivery">
                  Cash on Delivery
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment_category"
                  id="Online"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="Online">
                  Online Payment
                </label>
              </div>
            </div>

          </div>

          {cartData.length === 0 && (
            <p className="text-center" style={{ fontFamily: 'serif', fontSize: '20px', color: '#FF0000' }}>Your cart is empty.</p>
          )}

        </div>

        {paymentMethod === "Online" && (
          <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={handlePayment}>
              Pay now
            </button>
          </div>
        )}

        {paymentMethod === "Cash On Delivery" && (
          <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={() => handlePlaceOrder()}>
              Place Order (Cash on Delivery)
            </button>
          </div>
        )}

      </div>

      {/* Order For Friend Modal */}
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center"><strong>Add Friend Details</strong></h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="friendDetailsForm">
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name:</label>
                  <input type="text" className="form-control" name="first_name" placeholder="Enter First Name"
                    value={friendDetails.first_name}
                    onChange={handleFriendDetailsChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name:</label>
                  <input type="text" className="form-control" name="last_name" placeholder="Enter Last Name"
                    value={friendDetails.last_name}
                    onChange={handleFriendDetailsChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" className="form-control" name="Email_Id" placeholder="Enter Email"
                    value={friendDetails.Email_Id}
                    onChange={handleFriendDetailsChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                  <input type="text" className="form-control" name="Mob_No" placeholder="Enter Phone Number"
                    value={friendDetails.Mob_No}
                    onChange={handleFriendDetailsChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAddFriend}>Add</button>
            </div>
          </div>
        </div>
      </div>

      {hasFriendDetails && (
        <div style={{ marginTop: '20px' }}>
          <h3 className="text-center">Friends Details</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {friendList.map((friend, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '30px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '20px',
                }}
              >
                <strong style={{ marginRight: '5px' }}>Name:</strong>{' '}
                {friend.first_name} {friend.last_name} <br />
                <strong style={{ marginRight: '5px' }}>Email:</strong>{' '}
                {friend.Email_Id} <br />
                <strong style={{ marginRight: '5px' }}>Phone:</strong>{' '}
                {friend.Mob_No}
              </li>
            ))}
          </ul>
        </div>
      )}




    </div>
  );
}

export default Restaurant_Cart;
