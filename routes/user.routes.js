const express = require("express");
const { signup, verifyOtp, login, resetOtp } = require("../controller/user.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/reset-otp", resetOtp);
router.put("/verify", verifyOtp);


module.exports = router;