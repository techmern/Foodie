import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function TotalDriverCount({ count }) {
  
  const styles = {
    panel: {
      backgroundColor: '#4CAF50',
      color: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width:'300px',
      margin: '20px',
    },
    count: {
      fontSize: '36px',
      fontWeight: 'bold',
    },
    label: {
      fontSize: '18px',
      marginTop: '10px',
    },
  };

  const navigate = useNavigate();

  const handleView = (e) =>{
    navigate('/')
  }

  return (
    <div style={styles.panel}>
      <div style={styles.label}>Total Cities</div>
      <div style={styles.count}>{count}</div>
      {/* <a href='' onClick={handleView} style={styles.label}>View Driver</a> */}
    </div>
  );
}
