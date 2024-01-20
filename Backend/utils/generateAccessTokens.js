const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const accesToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.AccessTokenSecret,
    { expiresIn: "15m" }
  );
  return accesToken;
};
const generateRefreshToken = (user) => {
  const accesToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.RefreshTokenSecret
  );
  return accesToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
