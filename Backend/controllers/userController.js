const User = require("../models/userModel");
const { compareHashedPassword } = require("../utils/hashing");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateAccessTokens");

// User registration
const signupUser = async (req, res) => {
  try {
    const { email } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(403).json("User already exists in this email address");
    }
    const createdUser = await User.create(req.body);
    if (createdUser) {
      return res.status(200).json("User registertion success");
    }
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json("All fields are required");
  }
  const getUser = await User.findOne({ email });

  const isPasswordMatching = await compareHashedPassword(password, getUser);
  if (isPasswordMatching) {
    const accesToken = generateAccessToken(getUser);
    const refreshToken = generateRefreshToken(getUser);
    await User.findByIdAndUpdate({ _id: getUser._id }, { refreshToken });
    return res
      .status(200)
      .json({ message: "User loggedIn success", accesToken, refreshToken });
  } else {
    return res.status(401).json("Invalid credentials");
  }
};

const logout = (req, res) => {};

module.exports = { signupUser, login, logout };
