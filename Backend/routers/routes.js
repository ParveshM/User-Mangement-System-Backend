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

router.put(
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

router.post("/admin/login", adminController.adminLogin);
router.get(
  "/admin/get_all_users",
  verifyUser,
  isAdminAuth,
  adminController.getAllUsers
);
// admin create new user
router.post(
  "/admin/add_user",
  verifyUser,
  isAdminAuth,
  adminController.addNewUser
);
router.get(
  "/admin/get_user/:id",
  verifyUser,
  isAdminAuth,
  adminController.getUser
);
router.put(
  "/admin/update_user/:id",
  verifyUser,
  isAdminAuth,
  upload.single("image"),
  adminController.updateUser
);

router.delete(
  "/admin/delete_user/:id",
  verifyUser,
  isAdminAuth,
  adminController.deleteUser
);

module.exports = router;
