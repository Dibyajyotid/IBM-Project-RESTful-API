import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import "./MyBookings.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5090/api/booking/user/${user._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setBookings(response.data.data || []);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings");
      });
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await axios.delete(`http://localhost:5090/api/booking/${bookingId}`, {
        withCredentials: true,
      });

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
      alert("Booking cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  if (!user) return <h2>Please log in to view your bookings.</h2>;

  return (
    <>
      <Navbar />
      <div className="my-bookings-container">
        <h1 className="heading">My Bookings</h1>
        {error && <p>{error}</p>}
        {bookings.length > 0 ? (
          <ul className="booking-list">
            {bookings.map((booking) => (
              <li key={booking._id} className="booking-card">
                <img className="image" src={booking.accommodationId.photo} />
                <div className="details">
                  <h2>{booking.accommodationId.name}</h2>

                  <p>Guests: {booking.guestSize}</p>
                  <p>Phone: {booking.phone}</p>
                  <p>Check In Date: {booking.checkInDate}</p>
                  <p>Check out Date: {booking.checkOutDate}</p>

                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="cancel-button"
                  >
                    Cancel Booking
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default MyBookings;
