import express from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createReview } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/:tourId", verifyUser, createReview);

export default router;
