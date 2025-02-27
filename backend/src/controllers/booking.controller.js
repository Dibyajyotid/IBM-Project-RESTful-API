import Booking from "../models/Booking.model.js";
import Accommodation from "../models/Accomodation.model.js"; // Unified model

// Create new booking
export const createBooking = async (req, res) => {
  try {
    console.log("Received Booking Request:", req.body);

    const { accommodationId, userId, ...bookingData } = req.body;

    // Validate if required fields are present
    if (!accommodationId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check if accommodation exists
    const accommodationExists = await Accommodation.findById(accommodationId);
    if (!accommodationExists) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid accommodationId" });
    }

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId" });
    }

    // Create new booking
    const newBooking = new Booking({ userId, accommodationId, ...bookingData });
    const savedBooking = await newBooking.save();

    // Add booking reference to accommodation
    await Accommodation.findByIdAndUpdate(accommodationId, {
      $push: { bookings: savedBooking._id },
    });

    res.status(200).json({
      success: true,
      message: "Your booking is confirmed!",
      data: savedBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
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
