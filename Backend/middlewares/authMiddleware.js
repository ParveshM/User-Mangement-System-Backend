const jwt = require("jsonwebtoken");

function verifyUser(req, res, next) {
  const authHeader = req.headers.authorization;
  // if authHeader is not presnt in the head it means user dont have an access token
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.AccessTokenSecret, (err, user) => {
      if (err) {
        return res.json({ success: false, message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } else {
    res.json({ success: false, message: "You are not Authenticated" });
  }
}

// check for is the admin accessing the admin routes
const isAdminAuth = (req, res, next) => {
  const { accessToken } = req.cookies;
  // if token is pressent in cookies validate the token for user details
  if (accessToken) {
    jwt.verify(accessToken, process.env.AccessTokenSecret, (err, user) => {
      if (err) {
        return res.json({ success: false, message: "Token is not valid" });
      }
      if (user && user.role === "Admin") {
        next();
      } else {
        return res.json({
          success: false,
          message: "You are not allowed to access this router",
        });
      }
    });
  } else {
    res.json({ success: false, message: "You are not Authenticated" });
  }
};

module.exports = { verifyUser, isAdminAuth };
