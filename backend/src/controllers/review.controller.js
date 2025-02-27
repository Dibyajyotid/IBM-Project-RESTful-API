import Accommodation from "../models/Accomodation.model.js";
import Review from "../models/Review.model.js";

export const addReview = async (req, res) => {
  const { accommodationId, accommodationType, username, reviewText, roomQuality, cleanliness, food, parking, staffBehaviour } = req.body;

  try {
    const newReview = new Review({
      accommodationId,
      accommodationType,
      username,
      reviewText,
      roomQuality,
      cleanliness,
      food,
      parking,
      staffBehaviour,
    });

    const savedReview = await newReview.save();

    // Push review into the accommodation model
    const accommodation = await Accommodation.findByIdAndUpdate(accommodationId, {
      $push: { reviews: savedReview._id },
    }, { new: true });

    if (accommodation) {
      await accommodation.calculateAverageRating(); // Update avgRatings
    }

    res.status(200).json({ success: true, message: "Review added", data: savedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add review", error });
  }
};
