import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["hotel", "guesthouse"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    maxSize: {
      type: Number,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],

    avgRatings: { type: Number, default: null },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

accommodationSchema.methods.calculateAverageRating = async function () {
  await this.populate("reviews"); // Populate the reviews

  if (this.reviews.length > 0) {
    const totalRatings = this.reviews.reduce((sum, review) => {
      return (
        sum +
        (review.roomQuality +
          review.cleanliness +
          review.food +
          review.parking +
          review.staffBehaviour) /
          5
      );
    }, 0);

    this.avgRatings = (totalRatings / this.reviews.length).toFixed(1);
  } else {
    this.avgRatings = null;
  }

  await this.save(); // Save the updated avgRatings
};

const Accommodation = mongoose.model("Accommodation", accommodationSchema);
export default Accommodation;
