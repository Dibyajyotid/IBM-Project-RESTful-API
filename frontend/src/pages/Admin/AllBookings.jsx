import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../../components/BookingCard";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./AllBookings.css";
import Footer from "../../components/Footer";

const AllBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Access Denied! Only admins can access this page.");
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch all bookings with user details
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5090/api/booking", {
          withCredentials: true,
        });
        setBookings(response.data.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  // Cancel a booking
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await axios.delete(`http://localhost:5090/api/booking/${bookingId}`, {
        withCredentials: true,
      });

      setBookings((prevBookings) =>
        prevBookings.filter((b) => b._id !== bookingId)
      );
      alert("Booking canceled successfully.");
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="all-bookings-container">
        <h1 className="heading">All Bookings</h1>
        {bookings.length > 0 ? (
          <div className="booking-list">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancelBooking}
              />
            ))}
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllBookings;
