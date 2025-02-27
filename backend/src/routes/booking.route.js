import express from "express";
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware.js";
import {
  createBooking,
  getAllBookings,
  getBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/",  createBooking);
router.get("/", verifyAdmin, getAllBookings);
router.get("/:id", verifyUser, getBooking);

export default router;
