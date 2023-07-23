import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import HostNavbar from './HostNavbar';

const HostUpdate = () => {
  const [hostData, setHostData] = useState(null);
  const hostId = JSON.parse(localStorage.getItem('userId'));
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the host ID from local storage
    console.log(hostId);
    if (hostId && isValidObjectId(hostId)) {
      fetchHostData(hostId);
    }
  }, []);

  const isValidObjectId = (id) => {
    const validObjectIdRegex = /^[0-9a-fA-F]{24}$/;
    return validObjectIdRegex.test(id);
  };

  const fetchHostData = async (hostId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.get(`https://zany-plum-bonobo-shoe.cyclic.app/host/get_hosts/${hostId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setHostData(response.data);
    } catch (error) {
      console.log('Error fetching host data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    let Val = type === 'number' ? Number(value) : value;
    setHostData({
      ...hostData,
      [name]: Val,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      let res = await axios.put(`https://zany-plum-bonobo-shoe.cyclic.app/host/update_hosts/${hostId}`, hostData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res.statusText === 'OK') {
        alert('Host data updated successfully');
        console.log(res);
      }
      // Optionally, redirect to another page or show a success message
    } catch (error) {
      console.log('Error updating host data:', error);
    }
  };

  const handleDel = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      let res = await axios.delete(`https://zany-plum-bonobo-shoe.cyclic.app/host/del_hosts/${hostId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res.statusText === 'OK') {
        fetchHostData();
        localStorage.clear();
        alert('Host data deleted successfully');
        navigate('/register');
        console.log(res);
      }
      // Optionally, redirect to another page or show a success message
    } catch (error) {
      console.log('Error deleted host data:', error);
    }
  };

 // ... (previous code)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundImage: 'url("https://media.istockphoto.com/id/1302442919/photo/luxury-beach-villa-at-night.jpg?s=612x612&w=0&k=20&c=oP0fE8SOcrejuCnbBmFAPB8pH47gbCM6m_dvtLihisI=")',
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
  deleteButton: {
    margin: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#FF0000',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
// ... (remaining code)

  return (
    <>
      <HostNavbar />
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.formContainer}>
          <h2 style={{ ...styles.label, marginBottom: '20px' }}>Host Details</h2>
          {hostData ? (
            <>
              <label style={styles.label}>
                <strong>Name:</strong>
                <input type="text" name="name" value={hostData.name} onChange={handleInputChange} style={styles.input} />
              </label>
              <label style={styles.label}>
                <strong>Email:</strong>
                <input type="email" name="email" value={hostData.email} onChange={handleInputChange} style={styles.input} />
              </label>
              <label style={styles.label}>
                <strong>Host Status:</strong>
                <input type="text" name="hostStatus" value={hostData.hostStatus} onChange={handleInputChange} style={styles.input} />
              </label>
              <label style={styles.label}>
                <strong>Location:</strong>
                <input type="text" name="location" value={hostData.location} onChange={handleInputChange} style={styles.input} />
              </label>
              <label style={styles.label}>
                <strong>Property Type:</strong>
                <input type="text" name="propertyType" value={hostData.propertyType} onChange={handleInputChange} style={styles.input} />
              </label>
              <label style={styles.label}>
                <strong>About:</strong>
                <input type="text" name="about" value={hostData.about} onChange={handleInputChange} style={styles.input} />
              </label>
              <label style={styles.label}>
                <strong>Hosting Since:</strong>
                <input type="number" name="hostingSince" value={hostData.hostingSince} onChange={handleInputChange} style={styles.input} />
              </label>
              <button type="submit" style={styles.button}>
                Update Host
              </button>
            </>
          ) : (
            <p>Loading host data...</p>
          )}
        </form>
        <button onClick={handleDel} style={styles.deleteButton}>
          Delete Host
        </button>
      </div>
    </>
  );
};

export default HostUpdate;
