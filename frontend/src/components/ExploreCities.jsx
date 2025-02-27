
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./css/ExploreCities.css"; // Import the CSS file

const cities = [
  {
    id: 1,
    image: "city1.jpg",
    name: "New York",
    description: "The city that never sleeps.",
  },
  {
    id: 2,
    image: "city2.jpg",
    name: "Paris",
    description: "The capital of romance.",
  },
  {
    id: 3,
    image: "city3.jpg",
    name: "Tokyo",
    description: "A perfect blend of tradition and technology.",
  },
  {
    id: 4,
    image: "city4.jpg",
    name: "London",
    description: "A city rich in history and culture.",
  },
  {
    id: 5,
    image: "city5.jpg",
    name: "Sydney",
    description: "Home to the iconic Opera House.",
  },
];

const ExploreCities = () => {
  return (
    <section className="explore-section">
      <h2 className="explore-title">Explore Cities</h2>
      <p className="explore-subtitle">
        Browse accommodations in the most visited cities.
      </p>

      <Swiper
        spaceBetween={0}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="swiper-container"
      >
        {cities.map((city) => (
          <SwiperSlide key={city.id} className="swiper-slide">
            <div className="city-card">
              <img src={`/images/${city.image}`} alt={city.name} className="city-image" />
              <div className="city-overlay">
                <h3 className="city-name">{city.name}</h3>
                <p className="city-description">{city.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ExploreCities;
