import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Restaurant_View({ selectedCity,searchQuery  }) {
    const [restaurantData, setRestaurantData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRestaurants = async () => {
        try {
            setLoading(true);
            let apiUrl = 'http://localhost:5000/restaurant/viewrestaurant';
            if (selectedCity) {
                apiUrl += `?city=${selectedCity}`;
            }
            if (searchQuery) {
                apiUrl += selectedCity ? `&search=${searchQuery}` : `?search=${searchQuery}`;
            }

            const response = await axios.get(apiUrl);
            setRestaurantData(response.data);
        } catch (error) {
            console.error('Error viewing data:', error);
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        if (selectedCity) {
            getRestaurants();
        }
    }, [selectedCity ,searchQuery]);

  


    return (
        <div className="container">
            {!selectedCity ? (
                <p className='text-center'style={{ fontFamily: 'serif', fontSize: '20px', color: '#FF0000' }}>Please select a city to view restaurants.</p>
            ) : loading ? (
                <p className='text-center'>Loading...</p>
            ) : restaurantData.length === 0 ? (
                <p className='text-center' style={{ fontFamily: 'serif', fontSize: '20px', color: '#FF0000' }}>No Restaurants Found for the Specified City.</p>
            ) : (
                <div className="row">
                    {restaurantData.map((restaurant) => (
                        <div key={restaurant._id} className="col-md-3 mb-4">
                            <div className="card h-100"style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', borderRadius: '8px' }}>
                                <img
                                    src={restaurant.restaurantImg ? `http://localhost:5000/restaurantlogo/${restaurant.restaurantImg}` : '/restaurant.jpg'}
                                    className="card-img-top"
                                    alt={restaurant.restaurantname}
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.restaurantname} Restaurant</h5>

                                    <a href={`/Restaurantmenuuser/${restaurant._id}`} className="btn btn-secondary">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Restaurant_View;
