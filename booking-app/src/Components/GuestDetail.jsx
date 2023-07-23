import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GuestNavbar from './GuestNavbar';

const GuestDetails = () => {
  const [guestData, setGuestData] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const guestId = JSON.parse(localStorage.getItem('guestId'));
    if (guestId) {
      fetchGuestData(guestId);
      fetchGuestBookings(guestId);
    }
  }, []);

  const fetchGuestData = async (guestId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.get(`https://zany-plum-bonobo-shoe.cyclic.app/guest/get_guests/${guestId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setGuestData(response.data);
    } catch (error) {
      console.log('Error fetching guest data:', error);
    }
  };

  const fetchGuestBookings = async (guestId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.get(`https://zany-plum-bonobo-shoe.cyclic.app/booking/bookings/guest/${guestId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      console.log('Error fetching guest bookings:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  };

  const guestDetailsStyle = {
    flex: '1',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  };

  const guestBookingsStyle = {
    flex: '1',
    padding: '20px',
    marginLeft: '20px', // Add a bit of margin to separate guest details and bookings sections
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333',
  };

  const bookingCardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
  };

  const imageStyle = {
    maxWidth: '200px',
    maxHeight: '200px',
    marginRight: '20px',
    borderRadius: '8px',
  };

  return (
    <>
      <GuestNavbar />

      <div style={containerStyle}>
        <div style={guestDetailsStyle}>
          {guestData ? (
            <div>
              <h2 style={headingStyle}>Guest Details</h2>
              <p><strong>Name:</strong> {guestData.name}</p>
              <p><strong>Email:</strong> {guestData.email}</p>
              <p><strong>Gender:</strong> {guestData.gender}</p>
              <p><strong>Date of Birth:</strong> {guestData.date_of_birth}</p>
              <p><strong>Bio:</strong> {guestData.bio}</p>
            </div>
          ) : (
            <p>Loading guest details...</p>
          )}
        </div>

        <div style={guestBookingsStyle}>
          <h2 style={headingStyle}>Guest Bookings</h2>
          {bookings.length > 0 ? (
            <ul>
              {bookings.map((booking) => (
                <li key={booking._id} style={bookingCardStyle}>
                  {booking.property_id.imageUrl && (
                    <img src={booking.property_id.imageUrl} alt={`Property - ${booking.property_id.name}`} style={imageStyle} />
                  )}
                  <div>
                    <p><strong>Check-in Date:</strong> {booking.check_in_date}</p>
                    <p><strong>Check-out Date:</strong> {booking.check_out_date}</p>
                    <p><strong>Property Name:</strong> {booking.property_id.name}</p>
                    <p><strong>Property Location:</strong> {booking.property_id.location}</p>
                    <p><strong>Property Type:</strong> {booking.property_id.property_type}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GuestDetails;
