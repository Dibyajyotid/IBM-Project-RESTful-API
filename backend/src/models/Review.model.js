import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    accommodationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation", // Dynamically reference either 'Hotel' or 'GuestHouse'
      required: true,
    },

    accommodationType: {
      type: String,
      enum: ["Hotel", "GuestHouse"],
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    reviewText: {
      type: String,
      required: true,
    },

    roomQuality: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },

    cleanliness: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },

    food: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },

    parking: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },

    staffBehaviour: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
