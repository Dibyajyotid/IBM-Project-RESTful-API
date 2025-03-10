import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
    },

    accommodationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation", 
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    guestSize: {
      type: Number,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
