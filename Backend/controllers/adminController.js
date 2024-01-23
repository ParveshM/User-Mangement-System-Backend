const User = require("../models/userModel");
const path = require("path");
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
 * Get : Get the user by id
 */
const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const getUser = await User.findById(userId);
    if (getUser) {
      return res
        .status(200)
        .json({ success: true, message: `User found`, user: getUser });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json("Something went wrong");
  }
};
/*
 * Put : Update the user by id
 */
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
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
  getUser,
  updateUser,
  deleteUser,
};
