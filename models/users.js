const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter UserName"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide  valid email"],
  },
  newpassword: {
    type: String,
    required: [true, "Please enter password"],
    select: false,
  },
  conformpassword: {
    type: String,
    required: [true, "Please enter password"],
    validate: {
      validator: function (el) {
        return el == this.newpassword;
      },
      message: "passwords are not same!",
    },
    select: false,
  },
  contact: {
    type: Number,
    required: true,    
  },
  passwordChangedAt: Date,
  isadmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.passwordchangedrecently = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedtime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedtime;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
