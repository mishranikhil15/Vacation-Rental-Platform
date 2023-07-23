import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicUsage from "./editmodal";
import HostNavbar from "./HostNavbar";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const userId = JSON.parse(localStorage.getItem("userId"));

  const fetchProperties = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        `http://localhost:4500/property/own_property/${userId}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.msg);
      setProperties(response.data.msg);
    } catch (error) {
      console.log("Error fetching properties:", error);
    }
  };

  const handleUpdate = async (propertyId) => {
    try {
      // Replace the URL with your backend server endpoint for updating a property
      const response = await axios.put(
        `http://localhost:4500/property/edit_property/${propertyId}`,
        selectedProperty
      );
      console.log(response.data);
      // Optionally, show a success message or update the properties state with the updated property
      // You may also want to reset the selectedProperty state to null after the update is successful
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleDel = async (propertyId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      // Replace the URL with your backend server endpoint for updating a property
      const response = await axios.delete(
        `http://localhost:4500/property/del_property/${propertyId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.statusText === "OK") {
        alert(response.data.msg);
        fetchProperties();
      }
      console.log(response);
    } catch (error) {
      console.error("Error Deleting the property:", error);
    }
  };

  const cardStyle = {
    width: "calc(50% - 20px)", // Show two cards per row with a gap of 20px
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px 8px 0 0", // Rounded top corners
  };

  const editCardStyle = {
    border: "2px solid #4caf50",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "20px 0",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedProperty({
      ...selectedProperty,
      [name]: value,
    });
  };

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <>
      <HostNavbar />
      <div>
        <h2 style={headingStyle}>Properties List</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "space-between",
            margin: "20px auto",
          }}
        >
          {properties?.map((property) => (
            <div key={property._id} style={cardStyle}>
              <img src={property.imageUrl} alt="" style={imageStyle} />
              <div style={{ padding: "10px" }}>
                <p>
                  <strong>Name:</strong> {property.name}
                </p>
                <p>
                  <strong>Location:</strong> {property.location}
                </p>
                <p>
                  <strong>Property Type:</strong> {property.property_type}
                </p>
                <p>
                  <strong>Description:</strong> {property.description}
                </p>
                <p>
                  <strong>Price:</strong> {property.price}
                </p>
                <p>
                  <strong>Rating:</strong> {property.rating}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <button onClick={() => handleDel(property._id)}>
                    Delete
                  </button>
                  <BasicUsage
                    src={property.imageUrl}
                    name={property.name}
                    location={property.location}
                    Property={property.property_type}
                    Description={property.description}
                    Price={property.price}
                    Rating={property.rating}
                    id={property._id}
                    fetchProperties={fetchProperties}
                  />
                </div>
              </div>
            </div>
          ))}
          {selectedProperty && (
            <div style={{ ...cardStyle, ...editCardStyle }}>
              <h2>Edit Property</h2>
              {/* ... (rest of the form code) */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyList;
