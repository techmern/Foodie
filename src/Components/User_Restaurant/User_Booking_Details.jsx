import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import User_Navbar from '../CommonLayouts/User_Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
function User_Booking_Details() {

  const [bookings, setBookings] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');


  // fetch User , Order , bookings
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userIdObject = JSON.parse(localStorage.getItem('User'));
        const userId = userIdObject._id;
        // console.log('Fetching orders for user ID:', userId);


        const bookingsResponse = await axios.get('http://localhost:5000/tablebooking/bookingdetails', { params: { userId } });
        // console.log('Bookings fetched:', bookingsResponse.data);
        setBookings(bookingsResponse.data);


      } catch (error) {
        console.error('Error fetching orders:', error);
        // Handle error, e.g., show error message to user
        alert('Error fetching orders. Please try again later.');
      }
    };

    fetchOrderDetails();
    AOS.init();
  }, []);
  // Download Pdf
  const bookingPdfRef = useRef([]);

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
  return (
    <div>
      <User_Navbar selectedCity={selectedCity} setSelectedCity={setSelectedCity} />

      <div className="container mt-4" >
        <div className="row" data-aos="fade-up" data-aos-duration="1000">
          <div className="col" style={{ minHeight: '100px', padding: '30px', marginTop: '20px' }}>

            <h2 className="text-center mt-4 mb-4" data-aos="fade-up" data-aos-duration="1000">Booking Details</h2>
            {bookings.map((booking, index) => (
              <div key={booking._id} style={{ marginBottom: '20px' }} ref={(el) => (bookingPdfRef.current[index] = el)}>
                <div className="card mb-4" data-aos="fade-up" data-aos-duration="1000">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Booking ID: </strong>{booking._id}
                    </div>
                    <img src="logo.jpg" alt="profile" style={{ width: '80px', borderRadius: '50%' }} className="rounded-circle" />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title ms-2">Booking Information</h5>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Restaurant Name</th>
                          <th>Location</th>
                          <th>Number of People</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                          <td>{booking.restaurant_id.restaurantname}</td>
                          <td>{booking.restaurant_id.address}</td>
                          <td>{booking.number_of_people}</td>
                          <td>{booking.booking_status}</td>
                        </tr>
                      </tbody>
                    </table>
                    {booking.booking_status === 'confirmed' ? (
                      <p className="text-success">Your booking is <strong>Confirmed!</strong> </p>
                    ) : (
                      <p className="text-warning">Your booking is <strong>Pending</strong></p>
                    )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title ms-2">Contact Details</h5>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Email</th>
                          <th>Mobile Number</th>
                          <th>Additional Request</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{booking.first_name} {booking.last_name}</td>
                          <td>{booking.Email_Id}</td>
                          <td>{booking.Mob_No}</td>
                          <td>{booking.additional_request || 'None'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="text-right mb-4">
                  <button className="btn btn-primary" onClick={() => handleDownloadPDF({ current: bookingPdfRef.current[index] }, `booking-details-${booking._id}`)}>Download Booking Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default User_Booking_Details