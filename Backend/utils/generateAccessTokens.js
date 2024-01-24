const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const accesToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.AccessTokenSecret,
    { expiresIn: "10s" }
  );
  console.log(accesToken);
  return accesToken;
};
const generateRefreshToken = (user) => {
  const accesToken = jwt.sign(
    { id: user.id, name: user.name },
    process.env.RefreshTokenSecret
  );
  return accesToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
