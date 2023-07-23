import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    
  const navigate = useNavigate();
  const handleHost = async () => {
    navigate("/register");
  };

  const handleGuest = async () => {
    navigate("/guestRegister");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681922761181-ee59fa91edc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#ffffff",
        fontSize: "24px",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Home Page</h1>
      <div>
        <button style={{ margin: "5px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={handleHost}>
          HOST
        </button>
        <button style={{ margin: "5px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#008CBA", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={handleGuest}>
          GUEST
        </button>
      </div>
    </div>
  );
};

export default Home;
