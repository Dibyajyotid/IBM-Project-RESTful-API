import Accommodation from "../models/Accomodation.model.js"; // Unified model
import Review from "../models/Review.model.js";

export const createReview = async (req, res) => {
  const { accommodationType, accommodationId } = req.params;
  const newReview = new Review({ ...req.body });

  try {
    const savedReview = await newReview.save();

    // Since there's only one model, we don't need to check for "Hotel" or "GuestHouse"
    const accommodationModel = Accommodation;

    // Update the reviews array for the respective accommodation
    await accommodationModel.findByIdAndUpdate(accommodationId, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({
      success: true,
      message: "Review submitted",
      data: savedReview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to submit" });
  }
};
