import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HostNavbar from './HostNavbar';

const PropertyForm = () => {
  const initialState = {
    imageUrl: '',
    name: '',
    location: '',
    property_type: '',
    description: '',
    price: '',
    rating: '',
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      // Replace the URL with your backend server endpoint for creating/updating properties
      const response = await axios.post('http://localhost:4500/property/properties', formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response);
      if (response.statusText === 'Created') {
        alert('Property added successfully');
        setFormData(initialState); // Reset form fields after successful submission
      }
      // Optionally, show a success message or redirect to another page
    } catch (error) {
      console.error('Error creating/updating property:', error);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1681922761181-ee59fa91edc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpbGxhfGVufDB8fDB8fHww&auto=format&fit=crop&w=1170&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: '#ffffff',
      fontSize: '24px',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '400px',
      width: '100%',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    label: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '10px',
      fontSize: '18px',
      width: '100%',
    },
    input: {
      margin: '5px',
      padding: '10px',
      fontSize: '16px',
      width: '100%',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: 'transparent',
      color: '#ffffff',
    },
    button: {
      margin: '5px',
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    updateLink: {
      display: 'inline-block',
      padding: '10px 20px',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#4CAF50',
      border: 'none',
      borderRadius: '4px',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
      cursor: 'pointer',
    },

    updateLinkHover: {
      backgroundColor: '#45A049', // Darker shade when hovered
    },
  };

  return (
    <>
      <HostNavbar />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2>Property Form</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
              Image URL:
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              Location:
              <input type="text" name="location" value={formData.location} onChange={handleChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              Property Type:
              <input type="text" name="property_type" value={formData.property_type} onChange={handleChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              Description:
              <input type="text" name="description" value={formData.description} onChange={handleChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              Price:
              <input type="number" name="price" value={formData.price} onChange={handleChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              Rating:
              <input type="number" name="rating" value={formData.rating} onChange={handleChange} style={styles.input} />
            </label>
            <button type="submit" style={styles.button}>
              Submit
            </button>
          </form>
          <Link to="/updateProperty" style={{
          ...styles.updateLink,
          ':hover': styles.updateLinkHover, // Use this property to apply styles on hover
        }}>
            Update Property Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default PropertyForm;
