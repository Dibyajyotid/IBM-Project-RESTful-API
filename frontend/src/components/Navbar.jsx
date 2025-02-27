import React from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import "./css/Navbar.css";
import { useAuth } from "../hooks/useAuth.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">LetsGo</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/">About Us</Link>
        <Link to="/footer">Contact</Link>

        {user ? (
          <>
            <span className="user-info">Welcome, {user.fullName}</span>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth">Login/Signup</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
