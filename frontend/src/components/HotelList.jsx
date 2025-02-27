import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const renderStars = (rating) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-500">⭐</span>
      ))}
      {hasHalfStar && <span className="text-yellow-500">⭐</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">⭐</span>
      ))}
      <span className="text-gray-600 text-sm ml-1">({rating})</span>
    </div>
  );
};

const HotelList = ({ title, hotels }) => {
  const navigate = useNavigate(); // Get navigate function

  const handleCardClick = (id) => {
    // Navigate to the accommodation details page with the specific ID
    navigate(`/accommodation/${id}`);
  };

  return (
    <div className="browse-hotels p-5 bg-[#FEFFF0]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-3">{title}</h2>
        <p className="text-gray-800 text-lg mb-5">
          Explore the best hotels at amazing locations.
        </p>
      </div>

      <div className="hotel-cards grid grid-cols-6 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="hotel-card bg-white rounded-xl overflow-hidden shadow-xl drop-shadow-lg min-h-[380px] transition-all duration-300 ease-in-out hover:shadow-2xl hover:drop-shadow-2xl hover:-translate-y-2 relative group"
            onClick={() => handleCardClick(hotel._id)} // On card click, navigate to details page
          >
            {/* Image Section */}
            <div className="overflow-hidden relative">
              <img
                src={hotel.photo}
                alt={hotel.name}
                className="hotel-image w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 flex items-center justify-center text-white text-lg transition-opacity duration-500 group-hover:opacity-100">
                View Details
              </div>
            </div>

            {/* Info Section */}
            <div className="hotel-info p-5 transition-transform duration-500">
              <h3 className="text-xl font-medium mb-2">{hotel.name}</h3>
              <p className="text-gray-600 text-sm">{hotel.desc}</p>
              <p>
                City: <span className="font-medium">{hotel.city}</span>
              </p>

              {/* Price & Rating Section */}
              <div className="absolute bottom-3 right-3 flex flex-col items-end space-y-2">
                {/* Price Tag (Fade-in from bottom) */}
                <div className="bg-black bg-opacity-80 text-white py-1 px-3 rounded-md text-sm font-semibold opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  ${hotel.price}/night
                </div>
                {/* Star Rating (Using renderStars) */}
                <div className="opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {renderStars(hotel.rating || 0)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
