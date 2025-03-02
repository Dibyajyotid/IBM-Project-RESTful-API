import React from "react";
import "./css/BookingCard.css"; 

const BookingCard = ({ booking, onCancel }) => {
  return (
    <div className="booking-card">
      {/* Left Side - Image */}
      <div className="booking-image">
        <img
          src={booking.accommodationId.photo}
          alt={booking.accommodationId.name}
        />
      </div>

      {/* Right Side - Booking Details */}
      <div className="booking-details">
        <div className="booking-info">
          <h2>{booking.accommodationId.name}</h2>
          <p>Guests: {booking.guestSize}</p>
          <p>Contact: {booking.phone}</p>
          <p>Check-in: {booking.checkInDate}</p>
          <p>Check-out: {booking.checkOutDate}</p>
        </div>

        {/* Booked By */}
        <div className="booked-by">
          <p>
            <strong>Booked by:</strong> {booking.userId.fullName} (
            {booking.userId.email})
          </p>
        </div>

        {/* Cancel Button */}
        <button className="cancel-button" onClick={() => onCancel(booking._id)}>
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
