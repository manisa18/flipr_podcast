const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  googleAuth,
} = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.post("/google", googleAuth);
module.exports = router;
