import Booking from "../models/Booking.model.js";
import Accommodation from "../models/Accomodation.model.js"; // Unified model
//import User from "../models/User.model.js";

// Create new booking
export const createBooking = async (req, res) => {
  try {
    // Ensure user is authenticated (Token verification is done in middleware)
    const userId = req.user.userId; // ✅ Extract user ID from token
    const userEmail = req.user.email; // ✅ Extract user email from token

    const { accommodationId } = req.params; // ✅ Get accommodation ID from params
    const { fullName, guestSize, phone } = req.body;

    // Validate required fields
    if (!fullName || !guestSize || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check if accommodation exists
    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) {
      return res
        .status(404)
        .json({ success: false, message: "Accommodation not found" });
    }

    if (!userEmail) {
      return res
        .status(400)
        .json({ success: false, message: "User email is missing from token" });
    }

    // Create new booking
    const newBooking = new Booking({
      userId,
      userEmail,
      accommodationId,
      fullName,
      guestSize,
      phone,
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Your booking is confirmed!",
      data: savedBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await Booking.findById(id).populate("accommodationId");

    res
      .status(200)
      .json({ success: true, message: "Successful!", data: booking });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found!" });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("accommodationId");

    res
      .status(200)
      .json({ success: true, message: "Successful!", data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
