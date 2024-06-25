import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Restaurant_Table from './Restaurant_Table';
import User_Navbar from '../CommonLayouts/User_Navbar';


function Restaurant_Menu() {

  const [selectedCity, setSelectedCity] = useState('');


  const { rid } = useParams();
  // console.log('Restaurant ID:', rid);

  const [activeTab, setActiveTab] = useState('menu1');

  const [restaurantdata, setRestaurantdata] = useState({
    restaurantname: '',
    address: '',
    city: '',
    mobno: '',
    restaurantStatus: '',
    restaurantImg: '',
  });

  const [menuItems, setMenuItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedItemDetails, setSelectedItemDetails] = useState({});

  //fetch Restaurant
  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/restaurant/singlerestaurant/${rid}`);
        setRestaurantdata(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };
    getRestaurant();
  }, [rid]);

  useEffect(() => {
    setActiveTab('menu1');
  }, []);

  //fetch menu item
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/restaurantmenu/getMenuitem/${rid}`);
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    fetchMenuItems();
  }, [rid]);


  // Add to cart

  const handleAddToCart = (menuItem) => {
    if (restaurantdata.restaurantStatus.toLowerCase() === 'Close') {
      alert('The restaurant is closed. You cannot add items to the cart.');
      return;
    }

    if (!menuItem.food_availability || menuItem.food_availability.toLowerCase() !== 'available') {
      alert('This item is not available.');
      return;
    }
    const userId = localStorage.getItem('User');
    if (!userId) {
      console.error('User is not logged in or userId is not available in local storage');
      return;
    } else {
      console.log('Retrieved userId:', userId);
    }

    const newCartItem = {
      id: menuItem._id,
      restaurant_id: menuItem.restaurant_id,
      item_name: menuItem.item_name,
      item_price: menuItem.item_price,
      item_description: menuItem.item_description,
      item_ingredients: menuItem.item_ingredients,
      food_itemImg: menuItem.food_itemImg,
      quantity: 1,
      userId,
    };

    try {
      const localStorageCartData = localStorage.getItem('Cart');
      let existingCart;

      if (localStorageCartData === null) {
        existingCart = [];
      } else {
        existingCart = JSON.parse(localStorageCartData);
      }

      const existingItemIndex = existingCart.findIndex(item => item.id === menuItem._id && item.userId === userId);
      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += 1;
        alert('Item added to cart successfully!');

      } else {
        existingCart.push(newCartItem);

        alert('Item added to cart successfully!');

      }

      localStorage.setItem('Cart', JSON.stringify(existingCart));
    } catch (error) {
      console.error(error);
    }
    console.log(newCartItem);
  };

  // Image Mode
  const handleImageClick = (imageUrl, itemDetails) => {
    setSelectedImage(imageUrl);
    setSelectedItemDetails(itemDetails);
    const modal = new window.bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  };


  // search menu
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenuItems = menuItems.filter((menuItem) =>
    menuItem.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // rating

  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [hover, setHover] = useState(0);


  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    const userIdObject = JSON.parse(localStorage.getItem('User'));
    const userId = userIdObject ? userIdObject.userId : null;
    console.log('User Object:', userIdObject);

    if (!userId) {
      console.error('User is not logged in or userId is not available in local storage');
      return;
    }

    const restaurantId = rid;
    if (!restaurantId) {
      console.error('Restaurant ID is not available');
      return;
    }
    console.log('Restaurant ID:', restaurantId);

    try {
      const response = await axios.post('http://localhost:5000/restaurantreview/addrestaurantreview', {
        userId,
        restaurantId,
        rating: rating,
        review: review,
      });

      console.log(response.data);
      if (response.status === 200 && response.data.msg === 'Review added successfully') {
        alert('Rating Submitted Successfully!');
      } else {
        alert('Failed to Add. Please try again.');
      }
    } catch (error) {
      console.error('Error inserting data:', error); // Log any errors that occur during the process
      alert('An error occurred while saving the review.');
    }
  };

  // rating
  const [fetchedRating, setFetchedRating] = useState(null); // State for fetched rating

  const [showPopover, setShowPopover] = useState(false);


  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/restaurantreview/viewrestaurantreview?restaurantId=${rid}`);
        const { rating } = response.data;
        setFetchedRating(rating); // Set fetched rating in state
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };
    fetchRatings();
  }, [rid]);


  // StarRating component with inline style for yellow stars
  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className="fa fa-star"
          style={{ color: i <= rating ? '#ffc107' : 'grey', fontSize: '1.5em' }}
        />
      );
    }
    return <div>{stars}</div>;
  };


  return (

    <>

      <User_Navbar selectedCity={selectedCity} setSelectedCity={setSelectedCity} />


      <div style={{ overflow: 'hidden', marginTop: '55px' }}>
        <div className='container mt-4' >
          <div className='row'>
            <div className='col-md-12 d-flex justify-content-center align-items-center flex-column'>

              <img
                src={restaurantdata.restaurantImg ? `http://localhost:5000/restaurantlogo/${restaurantdata.restaurantImg}` : '/restaurant.jpg'}
                alt="food"
                style={{ height: '400px', width: '70%', cursor: 'pointer' }}
                onClick={() => handleImageClick(
                  restaurantdata.restaurantImg
                    ? `http://localhost:5000/restaurantlogo/${restaurantdata.restaurantImg}`
                    : '/restaurant.jpg',
                  {
                    name: restaurantdata.restaurantname,
                    address: restaurantdata.address,
                    city: restaurantdata.city,
                    mobno: restaurantdata.mobno,
                    status: restaurantdata.restaurantStatus,
                  }
                )}

              />
              <h2 style={{ margin: '15px' }}>{restaurantdata.restaurantname} Restaurant</h2>
              <p style={{ marginBottom: '5px' }}>{restaurantdata.address}</p>
              <p style={{ marginBottom: '5px' }}>{restaurantdata.city}</p>
              <p style={{ marginBottom: '5px' }}>{restaurantdata.mobno}</p>
              <p style={{ marginBottom: '10px' }}> Restaurant is <strong> {restaurantdata.restaurantStatus}</strong></p>
              <p style={{ marginBottom: '5px' }}><StarRating rating={fetchedRating} /></p>


            </div>

            <div className='col-md-12 d-flex justify-content-center align-items-center flex-column'>
              <ul className="nav nav-pills mt-3">
                <li className="nav-item">
                  <a className="nav-link active" data-bs-toggle="tab" href="#menu1">Menu</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#menu2">Table</a>
                </li>
                <div className="w-100">
                  <hr style={{ width: '100%' }} />
                </div>

              </ul>

              <div>
                <input
                  type="text"
                  placeholder="Search Item"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control mb-3 text-center"
                  style={{ width: '400px' }}
                />
              </div>

              <div className="tab-content">
                <div className={`tab-pane container fade ${activeTab === 'menu1' ? 'show active' : ''}`} id="menu1">
                  <h4 className="text-center mb-4">Menu Items</h4>
                  {filteredMenuItems.length > 0 ? (

                    <ul className='list-unstyled nav nav-pills flex-column' style={{ paddingLeft: 0 }}>
                      {filteredMenuItems.map((menuItem) => (
                        <li key={menuItem._id} className="nav-item" style={{ marginBottom: '15px', marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                          <img
                            src={`http://localhost:5000/foodmenu/${menuItem.food_itemImg}`}
                            alt="food"
                            style={{ height: '130px', width: '130px', marginRight: '15px', cursor: 'pointer' }}
                            onClick={() => handleImageClick(`http://localhost:5000/foodmenu/${menuItem.food_itemImg}`, {
                              name: menuItem.item_name,
                              price: menuItem.item_price,
                              description: menuItem.item_description,
                              ingredients: menuItem.item_ingredients,
                              availability: menuItem.food_availability,
                            })}
                          />
                          <div>
                            <h5 style={{ marginBottom: '5px' }}>{menuItem.item_name}</h5>
                            <p style={{ marginBottom: '5px' }}>Price:  ₹{menuItem.item_price}</p>
                            <p style={{ marginBottom: '5px' }}>Ingredients: {menuItem.item_ingredients}</p>
                            {/* <p style={{ marginBottom: '5px' }}>Availability: {menuItem.food_availability}</p> */}
                            <button
                              className="btn btn-primary"
                              onClick={() => handleAddToCart(menuItem)}
                              disabled={restaurantdata.restaurantStatus.toLowerCase() === 'close' || !menuItem.food_availability || menuItem.food_availability.toLowerCase() !== 'available'}
                            >
                              {restaurantdata.restaurantStatus.toLowerCase() === 'close' ? 'Restaurant Closed' : 'Add to Cart'}
                            </button>

                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No Items Found.</p>
                  )}
                </div>
                <div className={`tab-pane container fade ${activeTab === 'menu2' ? 'show active' : ''}`} id="menu2">
                  <Restaurant_Table tid={rid} />
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Modal */}
        <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="imageModalLabel">{selectedItemDetails.name || 'Image'}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body row">
                <div className="col-md-6">
                  <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />
                </div>
                <div className="col-md-6">
                  {selectedItemDetails.price && <p><strong>Price:</strong> {selectedItemDetails.price}</p>}
                  {selectedItemDetails.description && <p><strong>Description:</strong> {selectedItemDetails.description}</p>}
                  {selectedItemDetails.ingredients && <p> <strong>Ingredients:</strong> {selectedItemDetails.ingredients}</p>}
                  {selectedItemDetails.availability && <p><strong>Availability:</strong> {selectedItemDetails.availability}</p>}
                  {selectedItemDetails.address && <p><strong>Address:</strong> {selectedItemDetails.address}</p>}
                  {selectedItemDetails.city && <p><strong>City:</strong> {selectedItemDetails.city}</p>}
                  {selectedItemDetails.mobno && <p><strong>Mobile:</strong> {selectedItemDetails.mobno}</p>}
                  {selectedItemDetails.status && <p><strong>Status:</strong> {selectedItemDetails.status}</p>}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Rating */}
      <div>
        <h1 className='container mt-4 text-center mb-4'>Rating</h1>
        <div className='col-md-12 d-flex justify-content-center align-items-center flex-column'>
          <h4 className='text-center'>Give Review To Restaurant</h4>
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
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(rating)}
              />
            ))}
          </div>

          <div className='review mt-4 mb-4'>
            <textarea className="form-control"
              style={{ height: '100px', width: '400px', textAlign: 'center' }}

              placeholder="Enter Your Review"
              name='review'
              value={review} onChange={(e) => setReview(e.target.value)}
            ></textarea>

          </div>
          <button className="btn btn-primary mt-2 mb-4" onClick={handleRatingSubmit}>Submit Rating</button>
        </div>
      </div>

      <footer className="footer text-white py-3 text-center" style={{ backgroundColor: '#CFD8DC', marginTop: '40px' }}>
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="1000">
            <div className="col-md-3 mt-4" data-aos="fade-up" data-aos-duration="1000">
              <h5 style={{ color: 'black', marginBottom: '20px' }}>About Foodie</h5>
              <ul className="list-unstyled">
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Who We Are</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Blog</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Work With Us</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Investor Relations</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Report Fraud</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Press Kit</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Contact Us</a></li>
              </ul>
            </div>
            <div className="col-md-3 mt-4" data-aos="fade-up" data-aos-duration="1000">
              <h5 style={{ color: 'black', marginBottom: '20px' }}>ZOMAVERSE</h5>
              <ul className="list-unstyled">
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Foodie</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Blinkit</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Feeding India</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Hyperpure</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Foodieland</a></li>
              </ul>
            </div>
            <div className="col-md-3 mt-4" data-aos="fade-up" data-aos-duration="1000">
              <h5 style={{ color: 'black', marginBottom: '20px' }}>FOR RESTAURANTS</h5>
              <ul className="list-unstyled">
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Partner With Us</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Apps For You</a></li>
              </ul>
            </div>
            <div className="col-md-3 mt-4" data-aos="fade-up" data-aos-duration="1000">
              <h5 style={{ color: 'black', marginBottom: '20px' }}>LEARN MORE</h5>
              <ul className="list-unstyled">
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Privacy</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Security</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Terms</a></li>
                <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Sitemap</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mt-2">
          <div className="row justify-content-center">
            <div className="col-auto">
              <a href="#"><img src="/path/to/image1" alt="Social Link 1" className="img-fluid" /></a>
            </div>
            <div className="col-auto">
              <a href="#"><img src="/path/to/image2" alt="Social Link 2" className="img-fluid" /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <p style={{ color: 'black' }}> &copy; {new Date().getFullYear()} Your Food Delivery App</p>
        </div>
      </footer>



    </>


  );
}

export default Restaurant_Menu;
