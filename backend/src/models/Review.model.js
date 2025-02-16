import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
    },

    username: {
      type: String,
      required: true,
    },

    reviewText: {
      type: String,
      required: true,
    },

    rating: {
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
