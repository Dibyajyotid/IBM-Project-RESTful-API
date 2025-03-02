import React from "react";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HotspotDetails from "./pages/HotspotPage/HotspotDetails";
import AccommodationDetails from "./components/AccomodationDetails";
import Auth from "./pages/Auth/Auth";
import AuthProvider from "./hooks/useAuth"; 
import MyBookings from "./pages/MyBookings/MyBookings";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AllBookings from "./pages/Admin/AllBookings";
import AllUsers from "./pages/Admin/AllUsers";
const App = () => {
  return (
    <AuthProvider>
      {" "}
      {/* <Navbar /> */}
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotspot/:id" element={<HotspotDetails />} />
          <Route path="/accommodation/:id" element={<AccommodationDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/bookings" element={<AllBookings />} />
          <Route path="/users" element={<AllUsers />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
