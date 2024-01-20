const User = require("../models/userModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateAccessTokens");
const { compareHashedPassword } = require("../utils/hashing");

/*
 * Post: admin Login
 */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getAdminUser = await User.findOne({ email: email });
    if (getAdminUser) {
      const isPasswordMatching = compareHashedPassword(password, getAdminUser);
      if (isPasswordMatching && getAdminUser.role === "Admin") {
        const accesToken = generateAccessToken(getAdminUser);
        const refreshToken = generateRefreshToken(getAdminUser);

        await User.findByIdAndUpdate(
          { _id: getAdminUser._id },
          { refreshToken }
        );
        res.cookie("accessToken", accesToken, { httpOnly: true });
        return res.status(200).json({
          message: "Admin logged in successfully",
          accesToken,
          refreshToken,
        });
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};
/*
 * Get : admin Logout
 */
const adminLogout = async (req, res) => {};

/*
 * Get : All users list from db
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "User" });
    if (users) {
      res.json(users);
    }
  } catch (error) {
    console.log("error", err);
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
      return res.status(403).json("User already exists in this email address");
    }
    const createdUser = await User.create(req.body);
    if (createdUser) {
      return res.status(200).json("User registration success");
    }
  } catch (error) {
    return res.status(500).json("Something went wrong");
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
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.log("error", error);
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
      return res.status(200).json("User Deleted successfully");
    } else {
      res.status(404).json("Delete user failed");
    }
  } catch (error) {
    console.log("error", err);
  }
};
module.exports = {
  adminLogin,
  adminLogout,
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
};
