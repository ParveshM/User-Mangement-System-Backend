const express = require("express");
const Router = express();
const userController = require("../controllers/userController");
const { verifyUser } = require("../middlewares/authMiddleware");

Router.post("/signup", userController.signupUser);
Router.post("/login", userController.login);

// const user = {
//   id: 1,
//   email: "john@gmail.com",
//   password: "john123",
// };

// let refreshTokens = [];

// Router.post("/refresh", (req, res) => {
//   const refreshToken = req.body.token;
//   if (!refreshToken) {
//     return res.status(401).json("you are not authenticated");
//   }
//   if (!refreshTokens.includes(refreshToken)) {
//     return res.status(401).json("Refresh Token is not valid");
//   }

//   jwt.verify(refreshToken, process.env.RefreshTokenSecret, (err, user) => {
//     err && console.log("Error", err);

//     refreshTokens = refreshTokens.filter((token) => {
//       return token !== refreshToken;
//     });

//     const newAccessToken = generateAccessToken(user);
//     const newRefreshToken = generateRefreshToken(user);
//     refreshTokens.push(newRefreshToken);

//     res.status(200).json({
//       accesToken: newAccessToken,
//       refreshToken: newRefreshToken,
//     });
//   });
// });

// Router.post("/login", (req, res) => {
//   console.log("recieved login");
//   const { email, password } = req.body;
//   if (email === user.email && password === user.password) {
//     const accesToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);
//     refreshTokens.push(refreshToken);
//     return res
//       .status(200)
//       .json({ status: "User LoggedIn", accesToken, refreshToken });
//   }
//   return res.json({ message: "Invalid credentials" });
// });

// Router.post("/verifyToken", verifyUser, (req, res) => {
//   if (req.user) {
//     res.json({ user: req.user });
//   }
// });

// Router.post("/logout", verifyUser, (req, res) => {
//   const refreshToken = req.body.token;
//   refreshTokens = refreshTokens.filter((token) => {
//     return token !== refreshToken;
//   });
//   res.status(200).json("logout succesfull");
// });

// module.exports = Router;
