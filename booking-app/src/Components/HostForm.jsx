import React, { useState } from 'react';
import axios from 'axios';
import HostNavbar from './HostNavbar';

const HostForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    hostStatus: '',
    location: '',
    propertyType: '',
    about: '',
    hostingSince: "",
  });

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
      const response = await axios.post('https://zany-plum-bonobo-shoe.cyclic.app/host/register', formData);
      console.log(response.data.msg); // Host registered Successfully
      alert(response.data.msg);
      // You can redirect or show a success message here.
    } catch (error) {
      console.log(error.response.data.msg); // Display the error message from the backend
    }
  };

  const styles = {
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // Align content vertically in the center
      minHeight: '100vh', // Set minimum height to cover the viewport
      padding: '20px',
      background: 'url("https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpbGxhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '400px',
      width: '100%',
    },
    input: {
      margin: '5px',
      padding: '10px',
      fontSize: '16px',
      width: '100%',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      margin: '5px',
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#4CAF50',
      color: 'yellow',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    heading: {
      marginBottom: '2rem',
      fontSize: '28px',
      fontWeight: 'bolder',
      color: '#333',
    },
    h2:{
      color:'red'
    }
  };

  return (
    <>
      <HostNavbar />
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={{ ...styles.heading, color: 'yellow' }}>Host Register</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="hostStatus"
            placeholder="Status"
            value={formData.hostStatus}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="propertyType"
            placeholder="Property Type"
            value={formData.propertyType}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="about"
            placeholder="About"
            value={formData.about}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="number"
            name="hostingSince"
            placeholder="Hosting Since (Year)"
            value={formData.hostingSince}
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Register Host
          </button>
        </form>
      </div>
    </>
  );
};

export default HostForm;
