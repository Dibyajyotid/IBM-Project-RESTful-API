import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const fullName = `${firstName} ${lastName}`;

  try {
    // Validate input fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required " });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check if the email already exists
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists " });

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10); // Await the promise
    const hashedPassword = await bcrypt.hash(password, salt); // Use async hash function

    // Create the new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role: "user", // Default role
    });

    // Save the user and generate JWT token
    await newUser.save();
    generateToken(newUser._id, res);

    // Send the response
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      role: newUser.role,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { password: userPassword, role, ...rest } = user._doc;

    // Generate token
    generateToken(user._id, res);

    // Send response
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
