const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { compareHashedPassword } = require("../utils/hashing");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateAccessTokens");

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
        await User.findByIdAndUpdate({ _id: getUser._id }, { refreshToken });
        return res.status(200).json({
          success: true,
          message: "User loggedIn success",
          user: getUser,
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
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.json({ success: false, message: "you are not authenticated" });
    }
    jwt.verify(refreshToken, process.env.RefreshTokenSecret, (err, user) => {
      err && console.log("Error", err);

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      return res.status(200).json({
        success: true,
        message: "Refresh token stored successfully",
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
  const userId = req.params.id;
  try {
    const isUserHaveProfile = await User.findById(userId);
    if (isUserHaveProfile) {
      return res
        .status(200)
        .json({ success: true, user: isUserHaveProfile.user });
    } else {
      res.json({ success: false, message: "No user profile found" });
    }
  } catch (error) {
    res.status(404).json({ error: "server error" });
  }
};

module.exports = {
  signupUser,
  login,
  logout,
  createRefreshToken,
  getUserProfile,
};
