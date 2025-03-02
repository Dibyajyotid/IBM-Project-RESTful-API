import express from "express";
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware.js";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", verifyAdmin, getAllUser);
router.get("/:id", verifyUser, getSingleUser);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyAdmin, deleteUser);

export default router;
