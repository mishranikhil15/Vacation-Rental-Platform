import React, { useState } from 'react';
import axios from 'axios';
import GuestNavbar from './GuestNavbar';

const GuestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    date_of_birth: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://zany-plum-bonobo-shoe.cyclic.app/guest/register', formData);
      console.log(response.data.msg); // Guest registered Successfully
      alert(response.data.msg);
      // You can redirect or show a success message here.
    } catch (error) {
      console.log(error.response.data.msg); // Display the error message from the backend
    }
  };

  const formContainerStyle = {
    background: 'url("https://plus.unsplash.com/premium_photo-1682285211680-8fbd6b44aaef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHZpbGxhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60") center/cover no-repeat fixed',
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

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  };

  return (
    <>
      <GuestNavbar />
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={headingStyle}>Guest Register</h2>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="gender"
            placeholder="gender"
            value={formData.gender}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="date"
            name="date_of_birth"
            placeholder="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="bio"
            placeholder="bio"
            value={formData.bio}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle} onMouseOver={(e) => e.target.style = {...buttonStyle, ...buttonHoverStyle}}>
            Register Guest
          </button>
        </form>
      </div>
    </>
  );
};

export default GuestForm;
