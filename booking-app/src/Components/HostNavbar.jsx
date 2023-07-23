import React from "react";
import { NavLink } from "react-router-dom";

const HostNavbar = () => {
  return (
    <nav style={{ backgroundColor: "#222", padding: "10px" }}>
      <ul style={{ display: "flex",justifyContent:"space-evenly", listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/" exact style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </NavLink>
        </li>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/register" style={{ color: "#fff", textDecoration: "none" }}>
            Host Form
          </NavLink>
        </li>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/login" style={{ color: "#fff", textDecoration: "none" }}>
            Host Login
          </NavLink>
        </li>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/HostUpdate" style={{ color: "#fff", textDecoration: "none" }}>
            Host Update
          </NavLink>
        </li>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/addProperty" style={{ color: "#fff", textDecoration: "none" }}>
            Add Property
          </NavLink>
        </li>
        <li style={{ margin: "0 10px" }}>
          <NavLink to="/updateProperty" style={{ color: "#fff", textDecoration: "none" }}>
            Update Property
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HostNavbar;
