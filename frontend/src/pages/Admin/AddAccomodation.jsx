import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddAccomodations.css";
import Navbar from "../../components/Navbar";

const AddAccommodation = () => {
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState({
    name: "",
    type: "",
    city: "",
    price: "",
    maxSize: "",
    phone: "",
    address: "",
    desc: "",
    photo: null, // Store file instead of URL
  });

  const handleInputChange = (e) => {
    setAccommodation({ ...accommodation, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAccommodation({ ...accommodation, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(accommodation).forEach((key) => {
      formData.append(key, accommodation[key]);
    });

    try {
      await axios.post("http://localhost:5090/api/accomodations/", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Accommodation added successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error adding accommodation:", error);
      alert("Failed to add accommodation.");
    }
  };

  return (
    <>
    <Navbar />
      <div className="add-accommodation-container">
        <h1>Add New Accommodation</h1>
        <form onSubmit={handleSubmit} className="add-form">
          <input
            type="text"
            name="name"
            placeholder="Accommodation Name"
            value={accommodation.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Type (hotel/guesthouse) with lowercase"
            value={accommodation.type}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={accommodation.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price per Night"
            value={accommodation.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="maxSize"
            placeholder="Max Guests"
            value={accommodation.maxSize}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Contact Number"
            value={accommodation.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Full Address"
            value={accommodation.address}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="desc"
            placeholder="Description"
            value={accommodation.desc}
            onChange={handleInputChange}
            required
          />

          {/* File Input for Image Upload */}
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <button type="submit" className="save-btn">
            Add Accommodation
          </button>
        </form>
      </div>
    </>
  );
};

export default AddAccommodation;
