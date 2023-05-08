const express = require("express");
const router = express.Router();
const {
  addvaccinecenterdetails,
  deletevaccinecenter,
  getbycenter,
  getAllBooking,
  getByDate,
  getById
} = require("../controller/vaccinecenterController");
const { protectadmin } = require("../controller/authenticationController");

router.post("/addvaccinecenter", protectadmin, addvaccinecenterdetails);
router.get("/deletevaccinecenter/:id", protectadmin, deletevaccinecenter);
// router.get("/getallbookdetails", protectadmin, getAllBooking);
// router.get("/getbyDate", protectadmin, getByDate);
// router.get("/getbyid/:id", protectadmin, getById);
router.get("/getbycenter/", protectadmin, getbycenter);
module.exports = router;
