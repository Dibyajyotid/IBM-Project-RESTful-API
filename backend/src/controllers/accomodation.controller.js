import Accommodation from "../models/Accomodation.model.js"; // ✅ Ensure correct model import

// Create new accommodation
export const createAccommodation = async (req, res) => {
  try {
    const newAccommodation = new Accommodation(req.body);
    const savedAccommodation = await newAccommodation.save();
    res.status(201).json({
      success: true,
      message: "Accommodation created successfully",
      data: savedAccommodation,
    });
  } catch (error) {
    console.error("Error creating accommodation:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create accommodation" });
  }
};

// Update accommodation
export const updateAccommodation = async (req, res) => {
  try {
    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedAccommodation) {
      return res
        .status(404)
        .json({ success: false, message: "Accommodation not found" });
    }

    res.status(200).json({
      success: true,
      message: "Accommodation updated successfully",
      data: updatedAccommodation,
    });
  } catch (error) {
    console.error("Error updating accommodation:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update accommodation" });
  }
};

// Delete accommodation
export const deleteAccommodation = async (req, res) => {
  try {
    const deletedAccommodation = await Accommodation.findByIdAndDelete(
      req.params.id
    );

    if (!deletedAccommodation) {
      return res
        .status(404)
        .json({ success: false, message: "Accommodation not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Accommodation deleted successfully" });
  } catch (error) {
    console.error("Error deleting accommodation:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete accommodation" });
  }
};

// Get single accommodation
export const getSingleAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id)
      .populate({
        path: "reviews",
        model: "Review",
      })
      .lean();

    if (!accommodation) {
      return res
        .status(404)
        .json({ success: false, message: "Accommodation not found" });
    }

    // Calculate average ratings
    accommodation.avgRatings = calculateAverageRatings(accommodation.reviews);

    res.status(200).json({
      success: true,
      message: "Accommodation retrieved successfully",
      data: accommodation,
    });
  } catch (error) {
    console.error("Error retrieving accommodation:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve accommodation" });
  }
};

// Get all accommodations
export const getAllAccommodations = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};

    const accommodations = await Accommodation.find(filter).populate("reviews");

    // Calculate ratings for each accommodation
    const accommodationsWithRatings = accommodations.map((accommodation) => ({
      ...accommodation.toObject(),
      avgRatings: calculateAverageRatings(accommodation.reviews),
    }));

    res.status(200).json({
      success: true,
      count: accommodations.length,
      message: "Accommodations retrieved successfully",
      data: accommodationsWithRatings,
    });
  } catch (error) {
    console.error("Error retrieving accommodations:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve accommodations" });
  }
};

// Get accommodations by search
export const getAccommodationBySearch = async (req, res) => {
  try {
    const { city, price } = req.query;
    const filter = { city: new RegExp(city, "i") };
    if (price) filter.price = { $gte: parseInt(price) };

    const accommodations = await Accommodation.find(filter).populate("reviews");

    const accommodationsWithRatings = accommodations.map((accommodation) => ({
      ...accommodation.toObject(),
      avgRatings: calculateAverageRatings(accommodation.reviews),
    }));

    res.status(200).json({
      success: true,
      message: "Accommodations retrieved successfully",
      data: accommodationsWithRatings,
    });
  } catch (error) {
    console.error("Error searching accommodations:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to search accommodations" });
  }
};

// Get featured accommodations
export const getFeaturedAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find({ featured: true })
      .populate("reviews")
      .limit(8);

    const accommodationsWithRatings = accommodations.map((accommodation) => ({
      ...accommodation.toObject(),
      avgRatings: calculateAverageRatings(accommodation.reviews),
    }));

    res.status(200).json({
      success: true,
      message: "Featured accommodations retrieved successfully",
      data: accommodationsWithRatings,
    });
  } catch (error) {
    console.error("Error retrieving featured accommodations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve featured accommodations",
    });
  }
};

// Get accommodation count
export const getAccommodationCount = async (req, res) => {
  try {
    const count = await Accommodation.estimatedDocumentCount();
    res.status(200).json({ success: true, data: count });
  } catch (error) {
    console.error("Error retrieving accommodation count:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch accommodation count" });
  }
};

// Helper function to calculate average ratings
const calculateAverageRatings = (reviews) => {
  if (!reviews || reviews.length === 0) return null;

  const totalReviews = reviews.length;
  const avgOverall = (
    reviews.reduce(
      (sum, r) =>
        sum +
        r.roomQuality +
        r.cleanliness +
        r.food +
        r.parking +
        r.staffBehaviour,
      0
    ) /
    (totalReviews * 5)
  ).toFixed(1);

  return { overall: avgOverall };
};
