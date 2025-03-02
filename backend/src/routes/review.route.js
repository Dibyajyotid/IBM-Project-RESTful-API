import express from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { addReview } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/:accomodationId", addReview);

export default router;
