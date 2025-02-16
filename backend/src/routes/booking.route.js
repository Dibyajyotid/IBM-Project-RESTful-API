import express from "express";
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware.js";
import {
  createBooking,
  getAllBooking,
  getBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/", verifyUser, createBooking);
router.post("/", verifyAdmin, getAllBooking);
router.get("/:id", verifyUser, getBooking);

export default router;
