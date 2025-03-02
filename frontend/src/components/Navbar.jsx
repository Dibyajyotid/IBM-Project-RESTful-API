import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import { useAuth } from "../hooks/useAuth.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">LetsGo</Link>

        {user?.role === "admin" && (
          <>
            <Link to={"/bookings"} className="admin-button">
              All Bookings
            </Link>
            <Link to={"/users"} className="admin-button">
              Users
            </Link>
          </>
        )}
      </div>

      {/* Hamburger Menu Button */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Navbar Links */}
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/">About Us</Link>
        <Link to="/footer">Contact</Link>

        {user ? (
          <>
            <span className="user-info">Welcome, {user.fullName}</span>
            {user.role === "admin" && (
              <Link to="/admin-dashboard" className="admin-button">
                Admin Dashboard
              </Link>
            )}
            <Link to="/my-bookings" className="my-bookings-button">
              My Bookings
            </Link>
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
