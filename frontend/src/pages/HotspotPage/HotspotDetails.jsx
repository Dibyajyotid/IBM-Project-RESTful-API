import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./HotspotDetails.css";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const hotspotsData = [
  {
    id: 1,
    title: "Majuli",
    image: "/images/majuli_main.jpg",
    description: "A beautiful river island known for its satras and culture.",
    places: [
      { name: "Sri Sri Auniati Satra", image: "/images/2021-07-27.jpg" },
      { name: "Dakhinpat Satra", image: "/images/2024-12-08.webp" },
      { name: "Kamalabari Satra", image: "/images/2020-03-13.webp" },
      { name: "Garmur Satra", image: "/images/2022-09-27.webp" },
      {
        name: "Samaguri Satra",
        image: "/images/6ac0fb51-4876-48d9-8de5-66ab449f7ab4.webp",
      },
    ],
  },
  {
    id: 2,
    title: "Kohora",
    image: "/images/kaziranga.jpg",
    description: "Kaziranga, Home of the one-horned rhinoceros.",
    places: [
      { name: "Central Range", image: "/images/kaziranga1.jpg" },
      { name: "Eastern Range", image: "/images/kaziranga2.jpg" },
      { name: "Western Range", image: "/images/kaziranga3.jpg" },
    ],
  },
];

const HotspotDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotspot, setHotspot] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [guestHouses, setGuestHouses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const selectedHotspot = hotspotsData.find(
      (spot) => spot.id === parseInt(id)
    );
    if (selectedHotspot) setHotspot(selectedHotspot);

    const fetchAccommodations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5090/api/accomodations"
        );

        const accommodations = response.data.data;
        console.log("Fetched Accommodations:", accommodations);

        // Filter accommodations to show only those in Majuli
        const filteredAccommodations = accommodations.filter(
          (item) => item.city === selectedHotspot?.title
        );
        console.log("Filtered Majuli Accommodations:", filteredAccommodations);

        setHotels(
          filteredAccommodations.filter((item) => item.type === "hotel")
        );
        setGuestHouses(
          filteredAccommodations.filter((item) => item.type === "guesthouse")
        );
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    fetchAccommodations();
  }, [id]);

  const handleCardClick = (id) => {
    navigate(`/accommodation/${id}`);
  };

  if (!hotspot) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />
      <div className="hotspot-details">
        <header>
          <h1>{hotspot.title}</h1>
          <div className="header-right-text">
            <b>More places to visit</b>
          </div>
        </header>

        <div className="main-container">
          <div
            className="hero-section"
            style={{
              backgroundImage: `url(${hotspot.places[currentIndex].image})`,
            }}
          >
            <h2>{hotspot.places[currentIndex].name}</h2>
          </div>

          <div className="places-section">
            <div className="places-list">
              {hotspot.places.map((place, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => setCurrentIndex(index)}
                >
                  <img src={place.image} alt={place.name} />
                  <span>{place.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="hotels-section">
            <h2>Explore Hotels in {hotspot.title}</h2>
            <div className="scroll-container">
              {hotels.length > 0 ? (
                hotels.map((hotel, index) => (
                  <div
                    key={index}
                    className="hotel-card"
                    onClick={() => handleCardClick(hotel._id)}
                  >
                    <img src={hotel.photo} alt={hotel.name} />
                    <div className="info">
                      <h3>{hotel.name}</h3>
                      <p>{hotel.address}</p>
                      <p>₹{hotel.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hotels available in {hotspot.title}.</p>
              )}
            </div>
          </div>

          <div className="guest-houses-section">
            <h2>Explore Guest Houses in {hotspot.title}</h2>
            <div className="scroll-container">
              {guestHouses.length > 0 ? (
                guestHouses.map((guestHouse, index) => (
                  <div key={index} className="guest-house-card">
                    <img src={guestHouse.photo} alt={guestHouse.name} />
                    <div className="info">
                      <h3>{guestHouse.name}</h3>
                      <p>{guestHouse.address}</p>
                      <p>₹{guestHouse.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No guest houses available in {hotspot.title}.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotspotDetails;
