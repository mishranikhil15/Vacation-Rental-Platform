import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import GuestNavbar from './GuestNavbar';

const GuestLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //   const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4500/guest/login', formData);
      console.log(response.data);
      alert(response.data.msg);

      // Save the token to local storage or a global state management library (e.g., Redux) for authentication
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("guestId", JSON.stringify(response.data.guestID));

      // Redirect to the guest list page or other protected pages
      //   history.push('/guests');
    } catch (error) {
      console.log('Error logging in:', error);
    }
  };

  const formContainerStyle = {
    background: 'url("https://images.unsplash.com/photo-1575517111478-7f6afd0973db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHZpbGxhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60") center/cover no-repeat fixed',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const linkStyle = {
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
    marginTop: '10px',
  };

  return (
    <>
      <GuestNavbar />
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={headingStyle}>Guest Login</h2>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
          <Link to="/guestUpdate" style={linkStyle}>
            Update Guest Credentials
          </Link>
        </form>
      </div>
    </>
  );
};

export default GuestLogin;
