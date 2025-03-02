import express from "express";
import multer from 'multer';
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import {
  createAccommodation,
  deleteAccommodation,
  getAccommodationBySearch,
  getAccommodationCount,
  getAllAccommodations,
  getFeaturedAccommodations,
  getSingleAccommodation,
  updateAccommodation,
} from "../controllers/accomodation.controller.js";

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.get("/", getAllAccommodations);
router.post("/", verifyAdmin,upload.single("photo"), createAccommodation);
router.get("/:id", getSingleAccommodation);
router.put("/:id",verifyAdmin, updateAccommodation);
router.delete("/:id", verifyAdmin, deleteAccommodation);

router.get("/search/getAccomodationBySearch", getAccommodationBySearch);
router.get("/search/getFeaturedAccomodation", getFeaturedAccommodations);
router.get("/search/getAccomodationCount", getAccommodationCount);

export default router;
