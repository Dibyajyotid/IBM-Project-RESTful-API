import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css"; // Import normal CSS file
import HeroSection from "../../components/HeroSection";
import SearchBar from "../../components/SearchBar";
import Hotspots from "../../components/Hotspots";
import ExploreCities from "../../components/ExploreCities";
import HotelList from "../../components/HotelList";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [guestHouses, setGuestHouses] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5090/api/accomodations/"
        );

        console.log("API Response:", response.data); // Debugging log

        const accommodations = response.data.data;

        setHotels(accommodations.filter((item) => item.type === "hotel"));
        setGuestHouses(
          accommodations.filter((item) => item.type === "guesthouse")
        );
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    fetchAccommodations();
  }, []);

  return (
    <>
    <Navbar />
    <div className="home-container">
    
      <HeroSection />
      <SearchBar />
      <Hotspots />
      <ExploreCities />
      <HotelList title="Browse Hotels" hotels={hotels} />
      <HotelList title="Comfortable Guest Houses" hotels={guestHouses} />
      <Footer />
    </div>
    </>
  );
};

export default HomePage;
