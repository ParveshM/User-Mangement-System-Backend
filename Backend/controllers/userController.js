const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { compareHashedPassword } = require("../utils/hashing");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateAccessTokens");
const path = require("path");
/*
 * Post: User Signup
 */
const signupUser = async (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.json({
        success: false,
        message: "User already exists in this email address",
      });
    }
    const createdUser = await User.create(req.body);
    if (createdUser) {
      return res
        .status(200)
        .json({ success: true, message: "User registration success" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" + error });
  }
};

/*
 * Post: User Login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    const getUser = await User.findOne({ email });
    if (getUser) {
      const isPasswordMatching = await compareHashedPassword(password, getUser);
      if (isPasswordMatching) {
        const accessToken = generateAccessToken(getUser);
        const refreshToken = generateRefreshToken(getUser);
        return res.status(200).json({
          success: true,
          message: "User loggedIn ",
          accessToken,
          refreshToken,
        });
      } else {
        return res.json({ success: false, message: "Invalid credentials" });
      }
    }
    res.json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
/*
 * Get: User Logout
 */
const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json("User logged out successfully");
};
/*
 * Post: create refresh token
 */
const createRefreshToken = (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.json({ success: false, message: "No refresh token recieved" });
    }
    jwt.verify(refreshToken, process.env.RefreshTokenSecret, (err, user) => {
      err && console.log("Error", err);

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      return res.status(200).json({
        success: true,
        message: "Refresh token created successfully",
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const isUserHaveProfile = await User.findByIdAndUpdate(userId);
    if (isUserHaveProfile) {
      return res.status(200).json({
        success: true,
        message: " user profile found",
        user: isUserHaveProfile,
      });
    } else {
      res.json({
        success: false,
        user: isUserHaveProfile,
        message: "No user profile found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const name = req.body.name;
    const imageUrl = req.file
      ? path.join("/uploads", req.file?.filename)
      : null;

    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (imageUrl) {
      updateData.profileImgUrl = imageUrl;
    }
    const updateProfile = await User.findByIdAndUpdate(id, updateData, {
      upsert: true,
      new: true,
    });
    if (updateProfile) {
      return res.status(200).json({
        success: true,
        message: "Profile  updated successfully",
        user: updateProfile,
        imageUrl: imageUrl ? imageUrl : updateProfile.profileImgUrl,
      });
    } else {
      res.json({ success: false, message: "Profile update failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "server error" });
  }
};

module.exports = {
  signupUser,
  login,
  logout,
  createRefreshToken,
  getUserProfile,
  updateUserProfile,
};
