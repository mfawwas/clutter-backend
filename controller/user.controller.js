const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create a new user
const signup = async (req, res) => {
  const { fullname, username, email, password } = req.body;
  // Check for missing fields
  try {
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This user already exists" });
    }

    // Hash User Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // OTP Engine
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    // Create new user
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully, please verify your email.",
      otp,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error during signup" });
  }
};

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};

// OTP Verification
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid OTP" });
    }
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({ message: "Account verified successfully" });
  } catch (err) {
    console.error("Error during OTP verification:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Reset OTP
const resetOtp = async (req, res) => {
  const { email } = req.body;
  // Check for missing email
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }
    if (user.otpExpiry && Date.now() < user.otpExpiry) {
        return res.status(429).json({ message: "Please wait before requesting a new OTP" });
    }
    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;


    await user.save();

    return res.status(200).json({ message: "OTP has been reset successfully", otp });
  } catch (err) {
    console.error("Error during OTP reset:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  verifyOtp,
  login,
  resetOtp,
};
