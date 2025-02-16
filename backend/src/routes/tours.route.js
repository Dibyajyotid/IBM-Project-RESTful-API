import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../controllers/tour.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllTour);
router.post("/", verifyAdmin, createTour);
router.get("/:id", getSingleTour);
router.put("/:id", verifyAdmin, updateTour);
router.delete("/:id", verifyAdmin, deleteTour);

router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTour", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

export default router;
