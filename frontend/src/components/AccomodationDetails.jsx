import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/AccommodationDetails.css";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import StarRating from "./StarRating";

const AccommodationDetails = () => {
  const { id } = useParams();
  const { user, authTokens } = useAuth(); // Get logged-in user data
  const [accommodation, setAccommodation] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false); // Toggle booking form
  const [bookingData, setBookingData] = useState({
    fullName: "",
    guestSize: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5090/api/accomodations/${id}`)
      .then((response) => {
        setAccommodation(response.data.data || { reviews: [] });
      })
      .catch((error) => {
        console.error("Error fetching accommodation details:", error);
      });
  }, [id]);

  const handleBookNowClick = () => {
    if (!user) {
      alert("You need to log in first!");
      return;
    }
    setShowBookingForm(true);
  };

  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5090/api/booking/${id}`,
        {
          fullName: bookingData.fullName,
          guestSize: bookingData.guestSize,
          phone: bookingData.phone,
        },
        {
          withCredentials: true,
        }
      );

      alert("Booking Successful!");
      setShowBookingForm(false);
    } catch (error) {
      console.error("Error submitting booking:", error.response?.data || error);
      alert("Booking failed! " + (error.response?.data?.message || ""));
    }
  };

  if (!accommodation) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="accommodation-container">
        <h1>{accommodation.name}</h1>
        <p>{accommodation.desc}</p>
        <img
          className="accommodation-image"
          src={accommodation.photo}
          alt={accommodation.name}
        />
        <p className="accommodation-price">Price: ₹{accommodation.price}</p>

        <button className="book-button" onClick={handleBookNowClick}>
          Book Now
        </button>

        {/* Booking Form */}
        {showBookingForm && (
          <div className="booking-form-container">
            <h2>Book Your Stay</h2>
            <form onSubmit={handleSubmitBooking}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={bookingData.fullName}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="guestSize"
                placeholder="Number of Guests"
                value={bookingData.guestSize}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={bookingData.phone}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Confirm Booking</button>
            </form>
          </div>
        )}

        {/* Review Section */}
        <div className="reviews-container">
          <h2>Guest Reviews</h2>
          {accommodation.reviews && accommodation.reviews.length > 0 ? (
            <ul className="review-list">
              {accommodation.reviews.map((review, index) => (
                <li key={index} className="review-card">
                  <h3>{review.username}</h3>
                  <p className="review-text">"{review.reviewText}"</p>
                  <div className="ratings">
                    <p>
                      Room Quality: <StarRating rating={review.roomQuality} />
                    </p>
                    <p>
                      Cleanliness: <StarRating rating={review.cleanliness} />
                    </p>
                    <p>
                      Food: <StarRating rating={review.food} />
                    </p>
                    <p>
                      Parking: <StarRating rating={review.parking} />
                    </p>
                    <p>
                      Staff Behavior:{" "}
                      <StarRating rating={review.staffBehaviour} />
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available for this accommodation.</p>
          )}
        </div>
      </div>
      
    </>
  );
};

export default AccommodationDetails;
