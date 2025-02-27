import express from "express";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../middlewares/auth.middleware.js";
import {
  createBooking,
  getAllBookings,
  getBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/:accommodationId", verifyToken, createBooking);
router.get("/", verifyAdmin, getAllBookings);
router.get("/:id", verifyUser, getBooking);

export default router;
