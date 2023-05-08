const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccinationPersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  dossageno:{
    type: Number,
    required: true,
  },  
  aadharId: {
    type: String,
    required: [true, "Please enter aadhar number"]
  },
});
const bookingSchema = new Schema(
  {
    centername: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    vaccinationdate:{
      type:String,
      required:[true,"please enter the date for vaccination"]
    },
    vaccinationcount:{
      type:Number,
      required:[true,"please enter no of vaccination you are registering"]
    },
    vaccinationPerson: [vaccinationPersonSchema],
  },
  { timestamps: true }
);

const booking = mongoose.model("bookings", bookingSchema);
module.exports = booking;
