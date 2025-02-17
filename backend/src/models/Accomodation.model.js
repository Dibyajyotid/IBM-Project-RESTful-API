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

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Accommodation = mongoose.model("Accommodation", accommodationSchema);
export default Accommodation;
