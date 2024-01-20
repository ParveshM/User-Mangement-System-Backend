const User = require("../models/userModel");

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
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
};