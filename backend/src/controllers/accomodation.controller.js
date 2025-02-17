import Accommodation from '../models/Accomodation.model.js';

// Create new accommodation
export const createAccommodation = async (req, res) => {
  try {
    const newAccommodation = new Accommodation(req.body);
    const savedAccommodation = await newAccommodation.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedAccommodation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create" });
  }
};

// Update accommodation
export const updateAccommodation = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedAccommodation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

// Delete accommodation
export const deleteAccommodation = async (req, res) => {
  const { id } = req.params;
  try {
    await Accommodation.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

// Get single accommodation
export const getSingleAccommodation = async (req, res) => {
  const { id } = req.params;
  try {
    const accommodation = await Accommodation.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
      data: accommodation,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

// Get all accommodations with pagination
export const getAllAccommodations = async (req, res) => {
  const { type, page = 0 } = req.query;
  const filter = type ? { type } : {}; // Filter by type if provided

  try {
    const accommodations = await Accommodation.find(filter)
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: accommodations.length,
      message: "Successfully retrieved",
      data: accommodations,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

// Get accommodations by search
export const getAccommodationBySearch = async (req, res) => {
  const { city, price } = req.query;
  const filter = { city: new RegExp(city, "i") };
  if (price) filter.price = { $gte: parseInt(price) };

  try {
    const accommodations = await Accommodation.find(filter).populate("reviews");
    res.status(200).json({ success: true, data: accommodations });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

// Get featured accommodations
export const getFeaturedAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find({ featured: true })
      .populate("reviews")
      .limit(8);
    res.status(200).json({ success: true, data: accommodations });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

// Get accommodation count
export const getAccommodationCount = async (req, res) => {
  try {
    const count = await Accommodation.estimatedDocumentCount();
    res.status(200).json({ success: true, data: count });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch count" });
  }
};
