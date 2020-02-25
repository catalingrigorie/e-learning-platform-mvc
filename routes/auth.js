const express = require("express");
const {
  register,
  login,
  getLoggedInUser,
  forgotPassword,
  resetPassword,
  editUser,
  changePassword
} = require("../controllers/auth");
const router = express.Router();
const { protect } = require("../middleware/auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/currentUser").get(protect, getLoggedInUser);
router.route("/edituser").put(protect, editUser);
router.route("/changepassword").put(protect, changePassword);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resettoken").put(resetPassword);

module.exports = router;
