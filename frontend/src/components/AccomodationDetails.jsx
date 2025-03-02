import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/AccommodationDetails.css";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import StarRating from "./StarRating";

const AccommodationDetails = () => {
  const { id } = useParams();
  const { user, authTokens } = useAuth();
  const [accommodation, setAccommodation] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    fullName: "",
    guestSize: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const [reviewData, setReviewData] = useState({
    username: "",
    reviewText: "",
    roomQuality: 5,
    cleanliness: 5,
    food: 5,
    parking: 5,
    staffBehaviour: 5,
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

  const handleShareReviewClick = () => {
    if (!user) {
      alert("You need to log in first!");
      return;
    }
    setShowReviewForm(true);
  };

  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleReviewChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:5090/api/booking/${id}`,
        {
          fullName: bookingData.fullName,
          guestSize: bookingData.guestSize,
          phone: bookingData.phone,
          checkInDate: bookingData.checkInDate,
          checkOutDate: bookingData.checkOutDate,
        },
        { withCredentials: true }
      );

      alert("Booking Successful!");
      setShowBookingForm(false);
    } catch (error) {
      console.error("Error submitting booking:", error.response?.data || error);
      alert("Booking failed! " + (error.response?.data?.message || ""));
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You need to log in first!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5090/api/reviews/${id}`, 
        {
          username: reviewData.username,
          reviewText: reviewData.reviewText,
          roomQuality: reviewData.roomQuality,
          cleanliness: reviewData.cleanliness,
          food: reviewData.food,
          parking: reviewData.parking,
          staffBehaviour: reviewData.staffBehaviour,
        },
        {
          withCredentials: true, 
        }
      );

      alert("Review submitted successfully!");
      setShowReviewForm(false);
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error);
      alert("Failed to submit review. Please try again.");
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
        <button className="review-button" onClick={handleShareReviewClick}>
          Share a Review
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
              <label>Check-in Date:</label>
              <input
                type="date"
                name="checkInDate"
                value={bookingData.checkInDate}
                onChange={handleInputChange}
                required
              />
              <label>Check-out Date:</label>
              <input
                type="date"
                name="checkOutDate"
                value={bookingData.checkOutDate}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Confirm Booking</button>
            </form>
          </div>
        )}

        {/* Review Form */}
        {showReviewForm && (
          <div className="review-form-container">
            <h2>Share Your Review</h2>
            <form onSubmit={handleSubmitReview}>
              <input
                type="text"
                name="username"
                placeholder="Your Name"
                value={reviewData.username}
                onChange={handleReviewChange}
                required
              />
              <textarea
                name="reviewText"
                placeholder="Your review..."
                value={reviewData.reviewText}
                onChange={handleReviewChange}
                required
              />
              <label>Room Quality:</label>
              <input
                type="number"
                name="roomQuality"
                min="1"
                max="5"
                value={reviewData.roomQuality}
                onChange={handleReviewChange}
                required
              />
              <label>Cleanliness:</label>
              <input
                type="number"
                name="cleanliness"
                min="1"
                max="5"
                value={reviewData.cleanliness}
                onChange={handleReviewChange}
                required
              />
              <label>Food:</label>
              <input
                type="number"
                name="food"
                min="1"
                max="5"
                value={reviewData.food}
                onChange={handleReviewChange}
                required
              />
              <label>Parking:</label>
              <input
                type="number"
                name="parking"
                min="1"
                max="5"
                value={reviewData.parking}
                onChange={handleReviewChange}
                required
              />
              <label>Staff Behaviour:</label>
              <input
                type="number"
                name="staffBehaviour"
                min="1"
                max="5"
                value={reviewData.staffBehaviour}
                onChange={handleReviewChange}
                required
              />
              <button type="submit">Submit Review</button>
            </form>
          </div>
        )}

        {/* Reviews Section */}
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
                      Staff Behaviour:{" "}
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
