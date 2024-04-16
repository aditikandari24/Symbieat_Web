import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BiShow, BiHide } from "react-icons/bi";
import { imagetoBase64 } from "../utilities/imagetobase64";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, confirmPassword } = data;
    if (firstname && lastname && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const responseData = await response.json();
          if (response.ok) {
            toast.success(responseData.message);
            navigate("/login");
          } else {
            toast.error(responseData.error || "Signup failed");
          }
        } catch (error) {
          console.error("Signup error:", error);
          toast.error("Signup failed");
        }
      } else {
        toast.error("Passwords do not match");
      }
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(/background.png)", // Same background image as Login.js
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="w-full bg-white max-w-sm m-auto flex flex-col items-center p-4 rounded">
        <div className="w-20 h-20 overflow-hidden rounded-full shadow-md drop-shadow-md m-auto relative">
          <label htmlFor="profile">
            <div className="absolute w-full h-1/3 text-white bg-slate-500 bottom-0 text-center bg-opacity-50">
              <p className="text-white p-1 text-sm cursor-pointer">Upload</p>
            </div>
          </label>
        </div>

        <form className="w-full py-4" onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={data.firstname}
            onChange={handleChange}
            className="w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={data.lastname}
            onChange={handleChange}
            className="w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            className="w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="password">Password</label>
          <div className="flex items-center mt-1 mb-2 bg-slate-200 px-2 py-1 focus-within:outline rounded focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={data.password}
              onChange={handleChange}
              className="w-full bg-slate-200 border-none outline-none h-7"
            />
            <span className="flex text-xl cursor-pointer" onClick={handlePasswordVisibility}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex items-center mt-1 mb-2 bg-slate-200 px-2 py-1 focus-within:outline rounded focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              className="w-full bg-slate-200 border-none outline-none h-7"
            />
            <span className="flex text-xl cursor-pointer" onClick={handleConfirmPasswordVisibility}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button type="submit" className="w-full bg-blue-300 mt-4 py-1 rounded text-xl">
            Sign Up
          </button>
        </form>
        <p>
          Already Have an account ?{" "}
          <Link to="../login" className="text-red-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

