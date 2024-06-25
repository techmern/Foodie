import React, { useState, useEffect } from 'react';
import Navbar from '../CommonLayouts/Navbar/Navbar';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  totalsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  maintitle: {
    fontSize: "45px",
    fontWeight: 400,
    textAlign: "center",
    letterSpacing: "9px",
    wordSpacing: "4px",
    margin: "40px 0",
    color: "black",
    fontFamily: "'Lobster', cursive",
  },
  amount: {
    fontSize: '32px',
    fontWeight: 'bold',
  },
  dateInput: {
    margin: '10px',
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    marginLeft: '10px',
  },
};

function ViewEarningRestaurant() {
  const [totals, setTotals] = useState({ totalCOD: 0, totalOnline: 0 });
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const loggedInRestaurant = JSON.parse(localStorage.getItem('restaurants'));

  useEffect(() => {
    fetchTotals();
  }, []);

  const fetchTotals = async (fromDate = '', toDate = '') => {
    try {
      const response = await fetch(`http://localhost:5000/restaurantorder/countAmount?fromDate=${fromDate}&toDate=${toDate}&restaurantId=${loggedInRestaurant._id}`);
      const data = await response.json();
      setTotals({
        totalCOD: data.totalCOD,
        totalOnline: data.totalOnline,
      });
    } catch (error) {
      console.error('Error fetching totals:', error);
    }
  };

  const handleFetch = () => {
    if (fromDate && toDate) {
      fetchTotals(fromDate, toDate);
    } else {
      alert('Please select both from and to dates');
    }
  };

 

  return (
    <div>
      <Navbar />
      <div style={style.container}>
        <div style={style.maintitle}>View One Week Earning</div>
        <div style={style.inputContainer}>
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} style={style.dateInput} title='Select a date to see the amount for that date'/>
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} style={style.dateInput} title='Select a date to see the amount for that date'/>
          <button onClick={handleFetch} style={style.button} title='Select a date to see the amount for that date'>
            Fetch Totals
          </button>
        </div>
        <div style={style.totalsContainer}>
          <div style={style.box}>
            <div style={style.title}>Total Cash On Delivery</div>
            <div style={style.amount}>{totals.totalCOD} Rs.</div>
          </div>
          <div style={style.box}>
            <div style={style.title}>Total Online Payment</div>
            <div style={style.amount}>{totals.totalOnline} Rs.</div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default ViewEarningRestaurant;
