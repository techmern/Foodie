import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../CommonLayouts/Navbar/Navbar';

function View_Restaurant_Rating() {
  const style = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: 'auto',
      marginTop: '15px',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '5px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    username: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
    },
    rating: {
      fontSize: '16px',
      color: '#ff9900',
    },
    review: {
      fontSize: '16px',
      color: '#555',
    },
    p: {
      position: 'absolute',
      top: '100px',
      right: '70px',
      padding: '10px',
      fontFamily: 'Arial, sans-serif',
    },
    counts: {
      position: 'absolute',
      top: '150px',
      right: '50px',
      padding: '10px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f1f1f1',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    countsItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '5px',
    },
    starIcon: {
      marginRight: '5px',
      fontSize: '24px',
    }
  };

  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const loggedInRestaurant = JSON.parse(localStorage.getItem('restaurants'));

  useEffect(() => {
    axios.get('http://localhost:5000/restaurantreview/viewrestaurantreview')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching the rating data:', error);
        setError(error.message);
      });
  }, []);

  const getStars = (rating, color = '#ff9900') => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    const starIcons = [];

    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<span key={`full-${i}`} style={{ ...style.starIcon, color }}>&#9733;</span>);
    }
    for (let i = 0; i < emptyStars; i++) {
      starIcons.push(<span key={`empty-${i}`} style={{ ...style.starIcon, color: '#ccc' }}>&#9734;</span>);
    }
    return starIcons;
  };

  const getEmptyStars = () => {
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      starIcons.push(<span key={`empty-${i}`} style={{ ...style.starIcon, color: '#ccc' }}>&#9734;</span>);
    }
    return starIcons;
  };

  const countStars = (reviews) => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
      counts[review.rating] += 1;
    });
    return counts;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!reviews.length) {
    return <div>Loading...</div>;
  }

  const filteredReviews = reviews.filter(review => review.restaurantId._id === loggedInRestaurant._id);
  const starCounts = countStars(filteredReviews);

  return (
    <div>
      <Navbar />
      <p style={style.p}>All Reviews</p>
      <div style={style.counts}>
        {Object.keys(starCounts).map(star => (
          <div key={star} style={style.countsItem}>
            <span>{starCounts[star] === 0 ? getEmptyStars() : getStars(parseInt(star))}</span> <span>: {starCounts[star]}</span>
          </div>
        ))}
      </div>
      {filteredReviews.map(review => (
        <div key={review._id} style={style.container}>
          <div style={style.header}>
            <span style={style.username}>{review.userId.Username}</span>
            <span style={style.rating}>{getStars(review.rating)}</span>
          </div>
          <p style={style.review}>Review: {review.review}</p>
          <p style={style.review}>Review On: {new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default View_Restaurant_Rating;
