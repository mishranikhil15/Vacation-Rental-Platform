import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import GuestNavbar from './GuestNavbar';

const GuestUpdate = () => {
  const [guestData, setGuestData] = useState(null);
  const guestId = JSON.parse(localStorage.getItem('guestId'));
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the guest ID from local storage
    console.log(guestId);
    if (guestId && isValidObjectId(guestId)) {
      fetchGuestData(guestId);
    }
  }, []);

  const isValidObjectId = (id) => {
    const validObjectIdRegex = /^[0-9a-fA-F]{24}$/;
    return validObjectIdRegex.test(id);
  };

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

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    let Val = type === "number" ? Number(value) : value;
    setGuestData({
      ...guestData,
      [name]: Val,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      let res = await axios.put(`https://zany-plum-bonobo-shoe.cyclic.app/guest/update_guests/${guestId}`, guestData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res.statusText === "OK") {
        alert('Guest data updated successfully');
        console.log(res);
      }
      // Optionally, redirect to another page or show a success message
    } catch (error) {
      console.log('Error updating guest data:', error);
    }
  };

  const handleDel = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      let res = await axios.delete(`https://zany-plum-bonobo-shoe.cyclic.app/guest/del_guests/${guestId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res.statusText === "OK") {
        fetchGuestData();
        localStorage.clear();
        alert('Guest data deleted successfully');
        navigate("/guestRegister");
        console.log(res);
      }
      // Optionally, redirect to another page or show a success message
    } catch (error) {
      console.log('Error deleting guest data:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1682285211680-8fbd6b44aaef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHZpbGxhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    padding: '20px',
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const updateButtonStyle = {
    flex: '1',
    padding: '10px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const deleteButtonStyle = {
    flex: '1',
    padding: '10px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <>
      <GuestNavbar />
      <div style={containerStyle}>
        <div style={formStyle}>
          <h2>Guest Details</h2>
          {guestData ? (
            <form onSubmit={handleSubmit}>
              <label style={labelStyle}>
                Name:
                <input type="text" name="name" value={guestData.name} onChange={handleInputChange} style={inputStyle} />
              </label>
              <label style={labelStyle}>
                Email:
                <input type="email" name="email" value={guestData.email} onChange={handleInputChange} style={inputStyle} />
              </label>
              <label style={labelStyle}>
                Gender:
                <input type="text" name="gender" value={guestData.gender} onChange={handleInputChange} style={inputStyle} />
              </label>
              <label style={labelStyle}>
                Date of Birth:
                <input type="date" name="date_of_birth" value={guestData.date_of_birth} onChange={handleInputChange} style={inputStyle} />
              </label>
              <label style={labelStyle}>
                Bio:
                <input type="text" name="bio" value={guestData.bio} onChange={handleInputChange} style={inputStyle} />
              </label>
              <div style={buttonContainerStyle}>
                <button type="submit" style={updateButtonStyle}>
                  Update Guest
                </button>
                <button onClick={handleDel} style={deleteButtonStyle}>
                  Delete Guest
                </button>
              </div>
            </form>
          ) : (
            <p>Loading guest data...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GuestUpdate;
