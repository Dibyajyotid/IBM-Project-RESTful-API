import React from "react";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HotspotDetails from "./pages/HotspotPage/HotspotDetails";
import AccommodationDetails from "./components/AccomodationDetails";
import Auth from "./pages/Auth/Auth";
import AuthProvider from "./hooks/useAuth"; 
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
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
