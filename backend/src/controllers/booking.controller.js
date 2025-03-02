import Booking from "../models/Booking.model.js";
import Accommodation from "../models/Accomodation.model.js";
//import User from "../models/User.model.js";

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const userEmail = req.user.email;

    const { accommodationId } = req.params;
    const { fullName, guestSize, phone, checkInDate, checkOutDate } = req.body;

    // Validate required fields
    if (!fullName || !guestSize || !phone || !checkInDate || !checkOutDate) {
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
      checkInDate,
      checkOutDate,
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
    const bookings = await Booking.find()
      .populate("accommodationId")
      .populate("userId", "fullName email");

    res
      .status(200)
      .json({ success: true, message: "Successful!", data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId;

    const bookings = await Booking.find({ userId }).populate({
      path: "accommodationId",
      model: "Accommodation", // ✅ Ensure the model name is correct
    });

    if (!bookings.length) {
      return res
        .status(404)
        .json({ success: false, message: "No bookings found" });
    }

    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to cancel booking" });
  }
};

//update booking controller
// export const updateBooking = async (req, res) => {
//   const {bookingId} = req.params
//   const {}
//   try {

//   } catch (error) {

//   }
// }
