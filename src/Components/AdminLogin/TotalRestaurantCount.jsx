import React from 'react';

const styles = {
  panel: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    margin: '20px',
    width:'300px',
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

export default function TotalRestaurantCount({ count }) {
  return (
    <div style={styles.panel}>
      <div style={styles.label}>Total Restaurants</div>
      <div style={styles.count}>{count}</div>
    </div>
  );
}
