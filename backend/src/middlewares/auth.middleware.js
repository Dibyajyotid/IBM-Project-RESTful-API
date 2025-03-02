import jwt from "jsonwebtoken";
import User from "../models/User.model.js"; // Import User model

// Verify Token Middleware
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Token is invalid" });
      }

      const user = await User.findById(decoded.userId).select("-password"); // Get user from DB
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      req.user = user; // Attach full user object
      next();
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Verify User Middleware
export const verifyUser = async (req, res, next) => {
  await verifyToken(req, res, async () => {
    if (
      req.user._id.toString() === req.params.id ||
      req.user.role === "admin"
    ) {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "You are not authorized!" });
    }
  });
};

// Verify Admin Middleware
export const verifyAdmin = async (req, res, next) => {
  await verifyToken(req, res, async () => {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          success: false,
          message: "Only admin can perform this action!",
        });
    }
    next();
  });
};
