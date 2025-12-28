const express = require("express");
const { signup, login, fetchProfile } = require("../controller/authController.js");
const  authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();
router.post("/login",login);
router.post("/signup", signup);
router.get("/user/profile", authMiddleware,fetchProfile);

module.exports = router;

