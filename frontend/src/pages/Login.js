import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Login() {
  // State to manage input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() !== '' && password.trim() !== '') {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        
        const responseData = await response.json();

        if (response.ok) {
          // Login successful, redirect to home page
          window.location.href = '/home'; // Change to the route of your home page
        } else {
          // Handle login error
          alert(responseData.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again later.');
      }
    } else {
      alert('Please enter email and password');
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      style={{
        backgroundImage: "url(/background.png)",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundColor: "#8288A6",
          padding: "80px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          margin: "20px",
        }}
      >
        <h1 style={{ fontFamily: "'cmmi10', serif", margin: "4", fontSize: "48px", fontWeight: "bold" }}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <input 
              type="email" 
              placeholder="Email" 
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", height: "40px" }} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon 
              icon={showPassword ? faEyeSlash : faEye}
              style={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
              onClick={togglePasswordVisibility}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Login</button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ color: "#555", fontSize: "14px" }}>If you are not a member, <Link to="/signup" style={{ color: "#007bff", textDecoration: "none" }}>signup</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

