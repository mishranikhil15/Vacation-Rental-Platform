import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HostNavbar from './HostNavbar';

const HostLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4500/host/login', formData);
      console.log(response.data);
      alert(response.data.msg);
      localStorage.setItem("token",JSON.stringify(response.data.token))
      localStorage.setItem("userId",JSON.stringify(response.data.userID))
      // Save the token to local storage or a global state management library (e.g., Redux) for authentication
      // Redirect to the host list page or other protected pages
      // history.push('/hosts');
    } catch (error) {
      console.log('Error logging in:', error);
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
      marginBottom: '5px',
      fontSize: '18px',
    },
    input: {
      margin: '5px',
      padding: '10px',
      fontSize: '16px',
      width: '100%',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: 'transparent', // Make the input background transparent
      color: '#ffffff', // Set input text color to white
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
    link: {
      marginTop: '10px',
      fontSize: '16px',
      color: '#ffffff',
      textDecoration: 'none',
      fontWeight: 'bold', // Highlight the link by increasing font weight
      backgroundColor: '#008CBA', // Add a background color to make it more prominent
      padding: '10px 20px', // Add some padding to the link
      borderRadius: '4px', // Add rounded corners
      cursor: 'pointer',
    },
  };

  return (
    <>
      <HostNavbar />
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.formContainer}>
          <h2 style={{ ...styles.label, marginBottom: '20px' }}>Host Login</h2>
          <label style={styles.label}>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} required />

          <label style={styles.label}>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} required />

          <button type="submit" style={styles.button}>
            Login
          </button>

          <Link to={"/hostUpdate"} style={styles.link}>
            Update Host Credentials
          </Link>
        </form>
      </div>
    </>
  );
};

export default HostLogin;
