import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth.js"; // Import useAuth
import "./Auth.css";
import { useAuth } from "../../hooks/useAuth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Use the login function from AuthContext
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setFormData({ fullName: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const { data } = await axios.post(
        `http://localhost:5090${endpoint}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        login(data.token, data.user);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isLogin ? "login" : "signup"}`}>
        <div className="image-container">
          <img
            className="desktop-image"
            src="images/tea-garden.jpg"
            alt="Travel"
          />
          <img
            className="mobile-image"
            src="/images/tea-garden-mobile.jpg"
            alt="Travel"
          />
          <div className="overlay-text">
            <h1>Explore Purbanchal With</h1>
            <p>LetsGo</p>
          </div>
        </div>
        <div className="form-container">
          <div className="form-box">
            <h2>{isLogin ? "Login" : "Create Account"}</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            </form>
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span onClick={toggleForm}>
                {isLogin ? "Create Account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
