import React, { useState } from 'react';
import axios from 'axios';
import GuestNavbar from './GuestNavbar'; // Make sure to import the GuestNavbar component

const BookingForm = () => {
  const [formData, setFormData] = useState({
    check_in_date: '',
    check_out_date: '',
  });
  const property_id = localStorage.getItem('propertyId');
  const currentDate = new Date().toISOString().split('T')[0];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.post(
        'http://localhost:4500/booking/bookings',
        {
          property_id: property_id,
          guest_id: JSON.parse(localStorage.getItem('guestId')),
          check_in_date: formData.check_in_date,
          check_out_date: formData.check_out_date,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response.data);
      alert('Booking successful');
      //   onBookingSuccess();
    } catch (error) {
      console.log('Error creating booking:', error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://example.com/background-image.jpg")', // Replace with your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          // backgroundColor: '#007BFF',
          padding: '10px 0',
          color: '#fff',
          textAlign: 'center',
        
        }}
      >
        {/* Include the content within the GuestNavbar */}
        <GuestNavbar />
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          width: '80%',
          maxWidth: '400px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          margin: '50px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Booking Form</h2>
        <label>
          Check-in Date:
          <input min={currentDate}
            type="date"
            name="check_in_date"
            value={formData.check_in_date}
            onChange={handleChange}
            style={{ marginBottom: '10px' }}
          />
        </label>
        <label>
          Check-out Date:
          <input
            type="date"
            name="check_out_date"
            value={formData.check_out_date}
            onChange={handleChange}
            style={{ marginBottom: '10px' }}
          />
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Book Property
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
