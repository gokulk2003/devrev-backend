const express = require("express");
const router = express.Router();
const { getbytime ,bookvacccination} = require("../controller/bookingcontroller");
const {
  protectuser,
} = require("../controller/authenticationController");

router.get("/getvaccinecenter", getbytime);
router.post("/bookvaccination",bookvacccination);

module.exports = router;
