import express from "express";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../middlewares/auth.middleware.js";
import {
  cancelBooking,
  createBooking,
  getAllBookings,
  getBooking,
  getUserBookings,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/:accommodationId", verifyToken, createBooking);
router.get("/", verifyAdmin, getAllBookings);
router.get("/:id", verifyUser, getBooking);

router.get("/user/:userId", verifyToken, getUserBookings); 
router.delete("/:bookingId", verifyToken, cancelBooking); 


export default router;
