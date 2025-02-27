import express from "express";
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

router.get("/", getAllAccommodations);
router.post("/", createAccommodation);
router.get("/:id", getSingleAccommodation);
router.put("/:id", updateAccommodation);
router.delete("/:id", verifyAdmin, deleteAccommodation);

router.get("/search/getAccomodationBySearch", getAccommodationBySearch);
router.get("/search/getFeaturedAccomodation", getFeaturedAccommodations);
router.get("/search/getAccomodationCount", getAccommodationCount);

export default router;
