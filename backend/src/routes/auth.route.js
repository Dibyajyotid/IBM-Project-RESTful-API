import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { logout, updateProfile } from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.put("/update-profile", verifyUser, updateProfile);
router.post("/logout", logout);

export default router;
