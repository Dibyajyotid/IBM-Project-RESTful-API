// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// const cities = [
//   {
//     id: 1,
//     image: "city1.jpg",
//     name: "New York",
//     description: "The city that never sleeps.",
//   },
//   {
//     id: 2,
//     image: "city2.jpg",
//     name: "Paris",
//     description: "The capital of romance.",
//   },
//   {
//     id: 3,
//     image: "city3.jpg",
//     name: "Tokyo",
//     description: "A perfect blend of tradition and technology.",
//   },
//   {
//     id: 4,
//     image: "city4.jpg",
//     name: "London",
//     description: "A city rich in history and culture.",
//   },
//   {
//     id: 5,
//     image: "city5.jpg",
//     name: "Sydney",
//     description: "Home to the iconic Opera House.",
//   },
// ];

// const ExploreCities = () => {
//   return (
//     <section className="py-10 w-screen mx-auto overflow-hidden">
//       <h2 className="text-2xl font-bold text-center mb-2">Explore Cities</h2>
//       <p className="text-gray-600 text-center mb-6">
//         Browse accommodations in the most visited cities.
//       </p>

//       <Swiper
//         spaceBetween={0} // Less gap between slides
//         slidesPerView={3}
//         navigation
//         pagination={{ clickable: true }}
//         loop={true}
//         autoplay={{ delay: 2500, disableOnInteraction: false }}
//         modules={[Navigation, Pagination, Autoplay]}
//         breakpoints={{
//           0: { slidesPerView: 1 }, // 1 slide on mobile
//           768: { slidesPerView: 2 }, // 2 slides on tablets
//           1024: { slidesPerView: 3 }, // 3 slides on desktop
//         }}
//         className="w-full"
//       >
//         {cities.map((city) => (
//           <SwiperSlide key={city.id} className="flex justify-center">
//             <div className="relative w-[95%] h-[350px] bg-white rounded-lg shadow-lg overflow-hidden transform scale-95 transition-transform duration-500 hover:scale-100 hover:shadow-2xl">
//               <img
//                 src={`/images/${city.image}`}
//                 alt={city.name}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white opacity-0 transition-opacity duration-500 hover:opacity-100">
//                 <h3 className="text-xl font-semibold">{city.name}</h3>
//                 <p className="text-sm">{city.description}</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// };

// export default ExploreCities;


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
