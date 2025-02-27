import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./css/Hotspots.css";

const Hotspots = () => {
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    // Simulating an API call
    const fetchHotspots = async () => {
      const data = [
        {
          id: 1,
          title: "Majuli",
          image: "hotspot1.jpg",
          description: "A beautiful river island",
        },
        {
          id: 2,
          title: "Kohora",
          image: "hotspot2.jpg",
          description: "Home of the one-horned rhino",
        },
        {
          id: 3,
          title: "Shiva Dol Sivsager",
          image: "hotspot3.jpg",
          description:
            "A historic temple dedicated to Lord Shiva, known for its grand architecture and cultural significance in Assam.",
        },
        {
          id: 4,
          title: "Cherrapunji",
          image: "hotspot4.jpg",
          description: "Land of waterfalls",
        },
      ];
      setHotspots(data);
    };
    fetchHotspots();
  }, []);

  return (
    <section className="hotspots">
      <h2 className="hotspots-title">Hotspots</h2>
      <p className="hotspots-description">
        Explore National Green Box in the Bird Outdoor & Heritage
      </p>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="swiper-container"
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {hotspots.map((hotspot) => (
          <SwiperSlide key={hotspot.id} className="swiper-slide">
            <div className="hotspot-card">
              <img
                src={`/images/${hotspot.image}`}
                alt={hotspot.title}
                className="hotspot-image"
              />
              <div className="hotspot-overlay">
                <h3 className="hotspot-title">
                  <Link to={`/hotspot/${hotspot.id}`} className="hotspot-link">
                    {hotspot.title}
                  </Link>
                </h3>
                <p className="hotspot-text">{hotspot.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hotspots;
