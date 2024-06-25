import React, { useEffect, useState } from 'react';
import Sidebar from '../CommonLayouts/Navbar/Sidebar_Admin';
import TotalRestaurantCount from './TotalRestaurantCount';
import TotalDriverCount from './TotalDriverCount';
import TotalCityCount from './TotalCityCount';
import axios from 'axios';

const styles = {
  container: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: '20px',
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
};

export default function WelcomePage_Admin() {
  const [restaurantCount, setRestaurantCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [cityCount, setCityCount] = useState(0);

  useEffect(() => {
    const fetchRestaurantCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/restaurant/countRestaurant');
        setRestaurantCount(response.data.count);
      } catch (error) {
        console.error('Error fetching restaurant count:', error);
      }
    };
    const fetchDriverCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/driver/countDriver');
        setDriverCount(response.data.count);
      } catch (error) {
        console.error('Error fetching restaurant count:', error);
      }
    };
    const fetchCityCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/City/countCity');
        setCityCount(response.data.count);
      } catch (error) {
        console.error('Error fetching restaurant count:', error);
      }
    };

    fetchRestaurantCount();
    fetchDriverCount();
    fetchCityCount();

  }, []);

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <TotalRestaurantCount count={restaurantCount} />
        <TotalDriverCount count={driverCount} />
        <TotalCityCount count={cityCount} />
        {/* Add more content here */}
      </div>
    </div>
  );
}
