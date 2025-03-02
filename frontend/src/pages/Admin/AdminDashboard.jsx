import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import "./AdminDashboard.css";
import Footer from "../../components/Footer";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState([]);
  const [editingAccommodation, setEditingAccommodation] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  // Redirect non-admins
  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Access Denied! Only admins can access this page.");
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch accommodations
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5090/api/accomodations/"
        );
        setAccommodations(response.data.data);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    fetchAccommodations();
  }, []);

  // Delete Accommodation and its Bookings
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this accommodation?"))
      return;

    try {
      await axios.delete(`http://localhost:5090/api/accomodations/${id}`, {
        withCredentials: true,
      });

      setAccommodations((prev) => prev.filter((acc) => acc._id !== id));

      alert("Accommodation and its bookings deleted successfully.");
    } catch (error) {
      console.error("Error deleting accommodation:", error);
      alert("Failed to delete accommodation.");
    }
  };

  // Handle Update Button Click
  const handleUpdateClick = (acc) => {
    setEditingAccommodation(acc._id);
    setUpdatedData({
      name: acc.name,
      type: acc.type,
      city: acc.city,
      price: acc.price,
      photo: acc.photo,
    });
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  

  // Submit Update Form
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5090/api/accomodations/${editingAccommodation}`,
        updatedData,
        { withCredentials: true }
      );

      setAccommodations((prev) =>
        prev.map((acc) =>
          acc._id === editingAccommodation ? { ...acc, ...updatedData } : acc
        )
      );

      alert("Accommodation updated successfully!");
      setEditingAccommodation(null);
    } catch (error) {
      console.error("Error updating accommodation:", error);
      alert("Failed to update accommodation.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <h1 className="heading">Admin Dashboard</h1>
        <p className="desc">
          Welcome, {user.fullName}! Here you can manage accommodations and
          bookings.
        </p>

        <button className="add-btn" onClick={() => navigate("/admin/add-accommodation")}>
          Add Accommodation
        </button>

        <div className="accommodations-list">
          {accommodations.length > 0 ? (
            accommodations.map((acc) => (
              <div key={acc._id} className="accommodation-card">
                <img
                  src={acc.photo}
                  alt={acc.name}
                  className="accommodation-image"
                />
                <div className="accommodation-details">
                  <h2>{acc.name}</h2>
                  <p>Type: {acc.type}</p>
                  <p>City: {acc.city}</p>
                  <p>Price: ₹{acc.price}/night</p>
                </div>

                <div className="actions">
                  <button
                    onClick={() => handleUpdateClick(acc)}
                    className="update-btn"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(acc._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>

                {/* Update Form (Only shows when Update button is clicked) */}
                {editingAccommodation === acc._id && (
                  <form onSubmit={handleUpdateSubmit} className="update-form">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={updatedData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="type"
                      placeholder="Type"
                      value={updatedData.type}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={updatedData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={updatedData.price}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="photo"
                      placeholder="Photo URL"
                      value={updatedData.photo}
                      onChange={handleInputChange}
                      required
                    />
                    <button type="submit" className="save-btn">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setEditingAccommodation(null)}
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            ))
          ) : (
            <p>No accommodations available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
