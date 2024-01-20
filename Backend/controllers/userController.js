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
      return res.status(200).json("User registration success");
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
    res
      .cookie("accessToken", accesToken, {
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
    return res
      .status(200)
      .json({ message: "User loggedIn success", accesToken, refreshToken });
  } else {
    return res.status(401).json("Invalid credentials");
  }
};

const logout = (req, res) => {};

const refreshToken = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json("you are not authenticated");
  }

  jwt.verify(refreshToken, process.env.RefreshTokenSecret, (err, user) => {
    err && console.log("Error", err);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accesToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

module.exports = { signupUser, login, logout, refreshToken };
