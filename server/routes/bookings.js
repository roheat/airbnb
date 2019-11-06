const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth");
const { createBooking } = require("../controllers/booking");

router.post("", authMiddleware, createBooking);

module.exports = router;
