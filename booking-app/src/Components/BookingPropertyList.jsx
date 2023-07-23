import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import { useNavigate } from "react-router-dom";
import GuestNavbar from "./GuestNavbar";

const BookingPropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    handlePagination(page, 2);
  }, [page]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:4500/property/");
      console.log(response.data.msg);
      setProperties(response.data.msg);
    } catch (error) {
      console.log("Error fetching properties:", error);
    }
  };

  const handleSort = async (option) => {
    try {
      const response = await axios.get(
        `http://localhost:4500/property/sort?value=${option}`
      );
      setProperties(response.data.msg);
    } catch (error) {
      console.log("Error sorting properties:", error);
    }
  };

  const handleFilter = async (location) => {
    try {
      const response = await axios.get(
        `http://localhost:4500/property/filter?value=${location}`
      );
      setProperties(response.data.msg);
    } catch (error) {
      console.log("Error filtering properties:", error);
    }
  };

  const handlePagination = async (page, limit = 10) => {
    try {
      const response = await axios.get(
        `http://localhost:4500/property/pagination?page=${page}&limit=${limit}`
      );
      setProperties(response.data);
    } catch (error) {
      console.log("Error fetching properties with pagination:", error);
    }
  };

  const onPropertySelect = (id) => {
    console.log(id);
    localStorage.setItem("propertyId", id);
    navigate("/bookingform");
  };

  return (
    <>
      <GuestNavbar style={{ width: "100%" }} />

      <div
        style={{
          backgroundImage: 'url("https://example.com/background-image.jpg")', // Replace with your background image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "20px", width: "100%" }}>
          <h2 style={{ textAlign: "center", color: "#007BFF",fontSize:"26px" }}>
            Property List
          </h2>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <button
              onClick={() => handleSort("asc")}
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Sort Ascending
            </button>
            <button
              onClick={() => handleSort("desc")}
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Sort Descending
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Enter location to filter"
              onChange={(e) => handleFilter(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => {
                setPage((prevPage) => prevPage - 1);
              }}
              disabled={page === 1}
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Prev
            </button>
            <span style={{ color: "#007BFF" }}>{page}</span>
            <button
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
              }}
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            padding: "20px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            alignItems: "center",
          }}
        >
          {properties?.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onSelect={onPropertySelect}
              style={{ width: "100%" }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingPropertyList;
