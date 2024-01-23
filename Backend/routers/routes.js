const express = require("express");
const router = express();
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const { verifyUser, isAdminAuth } = require("../middlewares/authMiddleware");
const { upload } = require("../config/multer");
// User signup
router.post("/signup", userController.signupUser);
// user login
router.post("/login", userController.login);
// user Logout
router.post("/logout", verifyUser, userController.logout);
// get user profile details
router.get("/user_profile", verifyUser, userController.getUserProfile);

router.post(
  "/update_profile",
  verifyUser,
  upload.single("image"),
  userController.updateUserProfile
);

/*
 * Refresh token
 */
router.get("/refresh_token", verifyUser, userController.createRefreshToken);

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
