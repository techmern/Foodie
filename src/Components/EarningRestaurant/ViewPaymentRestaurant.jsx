import React, { useEffect, useState } from 'react';
import Navbar from '../CommonLayouts/Navbar/Navbar';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa'; // Import FaDownload icon from FontAwesome

function ViewPaymentRestaurant() {
  const [payoutData, setPayoutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image for full view

  const style = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    table: {
      width: '80%',
      borderCollapse: 'collapse',
      margin: '20px 0',
      fontSize: '18px',
      textAlign: 'left',
    },
    th: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px',
      border: '1px solid #ddd',
    },
    td: {
      padding: '10px',
      border: '1px solid #ddd',
    },
    header: {
      fontSize: '24px',
      margin: '20px 0',
    },
    error: {
      color: 'red',
      marginTop: '20px',
    },
    imageModal: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    downloadIcon: {
      cursor: 'pointer',
      marginLeft: '5px',
      color: '#007bff',
    },
  };

  useEffect(() => {
    const fetchPayoutData = async () => {
      try {
        const loguser = localStorage.getItem('restaurants');
        const restaurantId = loguser ? JSON.parse(loguser)._id : null;

        const response = await axios.get('http://localhost:5000/payoutadmin/getPayouts');
        const filteredData = response.data.filter(payout => payout.restaurant_id._id === restaurantId);
        setPayoutData(filteredData);
      } catch (err) {
        setError('Error fetching payout data');
      } finally {
        setLoading(false);
      }
    };

    fetchPayoutData();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImageView = () => {
    setSelectedImage(null);
  };

  const handleDownloadImage = async (imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', imageName); // Set the filename here
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div>
      <Navbar />
      {selectedImage && (
        <div style={style.imageModal} onClick={handleCloseImageView}>
          <div style={style.modalContent}>
            <img src={selectedImage} alt="Full Size" style={{ width: '100%', height: '700px' }} />
          </div>
        </div>
      )}
      <div style={style.container}>
        <div style={style.header}>Payout Data</div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={style.error}>{error}</div>
        ) : payoutData.length === 0 ? (
          <div>No Payout available</div>
        ) : (
          <table style={style.table}>
            <thead>
              <tr>
                <th style={style.th}>Transaction ID</th>
                <th style={style.th}>Payment</th>
                <th style={style.th}>Date Of Payout</th>
                <th style={style.th}>Payment Image</th>
              </tr>
            </thead>
            <tbody>
              {payoutData.map((payout) => (
                <tr key={payout.transaction_id}>
                  <td style={style.td}>{payout.transaction_id}</td>
                  <td style={style.td}>{payout.payout_amt}</td>
                  <td style={style.td}>{payout.createdAt}</td>
                  <td style={style.td}>
                    <img
                      src={`http://localhost:5000/transactionImage/${payout.paymentImg}`}
                      alt="Payment"
                      style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                      title='View Image'
                      onClick={() => handleImageClick(`http://localhost:5000/transactionImage/${payout.paymentImg}`)}
                    />
                    <br />
                    <FaDownload
                      style={style.downloadIcon}
                      title='Download Image'
                      onClick={() => handleDownloadImage(`http://localhost:5000/transactionImage/${payout.paymentImg}`, `payment_${payout.transaction_id}_${new Date().toLocaleDateString()}.png`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ViewPaymentRestaurant;
