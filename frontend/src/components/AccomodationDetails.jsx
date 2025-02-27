import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/AccommodationDetails.css";
import Navbar from "./Navbar";

const AccommodationDetails = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5090/api/accomodations/${id}`)
      .then((response) => {
        setAccommodation(response.data.data || { reviews: [] }); // ✅ Ensure `reviews` is an array
      })
      .catch((error) => {
        console.error("Error fetching accommodation details:", error);
      });
  }, [id]);

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

        {/* Display Average Rating */}
        <p className="accommodation-rating">
          Average Rating:{" "}
          {accommodation.avgRatings !== null
            ? accommodation.avgRatings
            : "No ratings yet"}
        </p>

        {/* Ratings Section */}
        <div className="ratings-container">
          <h2>Ratings</h2>
          {accommodation.reviews && accommodation.reviews.length > 0 ? (
            <ul className="ratings-list">
              {accommodation.reviews.map((review, index) => (
                <li key={index}>
                  {review.reviewText} - {review.username}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available</p>
          )}
        </div>

        <a href="/booking" className="book-button">
          Book Now
        </a>
      </div>
    </>
  );
};

export default AccommodationDetails;
