const express = require("express");
const router = express();
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const { verifyUser, isAdminAuth } = require("../middlewares/authMiddleware");

// User signup
router.post("/signup", userController.signupUser);
// user login
router.post("/login", userController.login);
// user Logout
router.post("/logout", verifyUser, userController.logout);

// Refresh token
router.get("/refresh_token", verifyUser, userController.refreshToken);

/*
 * admin user management routes
 */
router.get("/get_users", verifyUser, isAdminAuth, adminController.getAllUsers);
// admin addin new user
router.post("/add_user", verifyUser, isAdminAuth, adminController.addNewUser);

router.put(
  "/update_user/:id",
  verifyUser,
  isAdminAuth,
  adminController.updateUser
);

router.delete(
  "/delete_user/:id",
  verifyUser,
  isAdminAuth,
  adminController.deleteUser
);

module.exports = router;
