const User = require("../models/userModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateAccessTokens");
const { compareHashedPassword } = require("../utils/hashing");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    const getUser = await User.findOne({ email });
    if (getUser.role !== "Admin") {
      return res.json({ success: false, message: "You are not admin" });
    }
    if (getUser) {
      const isPasswordMatching = await compareHashedPassword(password, getUser);
      if (isPasswordMatching) {
        const accessToken = generateAccessToken(getUser);
        const refreshToken = generateRefreshToken(getUser);
        return res.status(200).json({
          success: true,
          message: "Admin logged In",
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
 * Get : All users list from db
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "User" });
    if (users) {
      res
        .status(200)
        .json({ success: true, message: "Users fetched successfully", users });
    }
  } catch (error) {
    console.log("error", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/*
 * Post : create a new user by admin user
 */
const addNewUser = async (req, res) => {
  const { email } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.json("User already exists in this email address");
    }
    const createdUser = await User.create(req.body);
    if (createdUser) {
      return res.json("User registration success");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
/*
 * Put : Update the user by id
 */
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;
  try {
    const updateUserName = await User.findByIdAndUpdate(userId, { name });
    if (updateUserName) {
      return res.status(200).json(`User name updated successfully`);
    } else {
      res.json("User not found");
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json("Something went wrong");
  }
};
/*
 * Delete : Delete the user by id
 */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId);
    if (deleteUser) {
      return res.json("User Deleted successfully");
    } else {
      res.status(404).json("Delete user failed");
    }
  } catch (error) {
    console.log("error", err);
    return res.status(500).json("Something went wrong");
  }
};
module.exports = {
  adminLogin,
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
};
