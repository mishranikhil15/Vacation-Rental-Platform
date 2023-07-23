import React from "react";
import { NavLink } from "react-router-dom";

const GuestNavbar = () => {
  return (
    <nav style={{ backgroundColor: "#222", padding: "10px" }}>
      <ul style={{ display: "flex",justifyContent:"space-evenly", listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/" exact style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </NavLink>
        </li>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/guestRegister" style={{ color: "#fff", textDecoration: "none" }}>
            Guest Form
          </NavLink>
        </li>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/guestLogin" style={{ color: "#fff", textDecoration: "none" }}>
            Guest Login
          </NavLink>
        </li>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/guestUpdate" style={{ color: "#fff", textDecoration: "none" }}>
            Guest Update
          </NavLink>
        </li>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/allProperty" style={{ color: "#fff", textDecoration: "none" }}>
            All Properties
          </NavLink>
        </li>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/bookingform" style={{ color: "#fff", textDecoration: "none" }}>
            Booking Form
          </NavLink>
        </li>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/fetchbooking" style={{ color: "#fff", textDecoration: "none" }}>
            Guest Details
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default GuestNavbar;
