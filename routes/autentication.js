const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  register,
  login,
  protectuser,
  protectadmin,
  getUser,
} = require("../controller/authenticationController");

router.get("/",protectadmin, getAllUsers);
router.get("/:id",protectuser, getUser)
router.post("/register", register);
router.post("/login", login);
module.exports = router;
