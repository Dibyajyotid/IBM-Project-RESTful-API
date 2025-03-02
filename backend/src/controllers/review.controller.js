import Accommodation from "../models/Accomodation.model.js";
import Review from "../models/Review.model.js";

export const addReview = async (req, res) => {
  try {
    const { accomodationId } = req.params;
    const {
      username,
      reviewText,
      roomQuality,
      cleanliness,
      food,
      parking,
      staffBehaviour,
    } = req.body;

    if (!accomodationId) {
      return res
        .status(400)
        .json({ success: false, message: "Accommodation ID is required." });
    }

    const newReview = new Review({
      accommodationId: accomodationId,
      username,
      reviewText,
      roomQuality,
      cleanliness,
      food,
      parking,
      staffBehaviour,
    });

    const savedReview = await newReview.save();

    await Accommodation.findByIdAndUpdate(accomodationId, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Review submitted successfully!",
        data: savedReview,
      });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
