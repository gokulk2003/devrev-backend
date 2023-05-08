const mongoose = require("mongoose");
const validator = require("validator");
const centerSchema = new mongoose.Schema({
  centername: {
    type: String,
    required: [true, "Please enter CenterName"],
    unique:true,
  },
  centerid: {
    type: String,
    required: [true, "Please enter FlightId"],
    unique: true,
  },  

  address:{
    type:String,
    required: [true, "Please enter Address"],
  },

  workinghour:[
    {
      opentime: {
        type:String, 
        required: [true, "Please Enter open time of vaccination center"],
      },
      closetime:{
        type:String,
        required: [true, "Please Enter close time of vaccination center"],
      }
    },
  ],
  staff:[
    {
      name: {
        type: String,
        required: [true, "Please enter Name"],
      },
      age:{
        type: String,
        required: [true, "Please enter age"],
      },
      gender:{
        type: String,
        required: [true, "Please enter gender"],
      },

    },
  ],
  dosage:[
    {
      vaccinename: {
        type:String, 
        required: [true, "Please Enter vaccination name"],
      },
      vaccinecount:{
        type:Number,
        required: [true, "Please enter vaccination count"],
      }
    },
  ],
});
const center = mongoose.model("centers", centerSchema);
module.exports = center;
