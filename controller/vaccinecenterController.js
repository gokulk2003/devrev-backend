const vaccinecenterModel = require("../models/vaccinationcenter");
const bookingModel = require("../models/booking");
const moment = require("moment");

const { bookvaccinecenter } = require("./bookingcontroller");

exports.addvaccinecenterdetails = async (req, res) => {
  try {
    const newvaccinecenter = await vaccinecenterModel.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        newvaccinecenter,
      },
    });
  } catch (error) {
    res.send(error);
  }
};

exports.deletevaccinecenter = async (req, res) => {
  try {
    const newvaccinecenter = await vaccinecenterModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        newvaccinecenter,
      },
    });
  } catch (error) {
    res.send(error);
  }
};

exports.getbycenter = async (req, res) => {
  console.log(req.query.centername)
  try {
  const vaccinecenter = await vaccinecenterModel.find({centername:req.query.centername},{dosage:1});
    res.status(200).json({
      status: "success",
      data: {
        vaccinecenter,
      },
    });
  } catch (error) {
    res.send(error);
  }
};


// exports.getAllBooking = async (req, res) => {
//   try {
//     const allvaccinecenter = await bookingModel.find();
//     res.status(200).json({
//       status: "success",
//       data: {
//         allvaccinecenter,
//       },
//     });
//   } catch (error) {
//     res.send(error);
//   }
// };
// exports.getByDate = async (req, res) => {
//   const date = new Date(req.query.date).toISOString();
//   try {
//     const startDate = moment(date).startOf("day").toDate();
//     const endDate = moment(date).add(1, "day").startOf("day").toDate();
//     const filteredvaccinecenter = await bookingModel.find({
//       createdAt: { $gte: startDate, $lt: endDate },
//     });

//     res.status(200).json({
//       status: "success",
//       data: {
//         filteredvaccinecenter,
//       },
//     });
//   } catch (error) {
//     res.send(error);
//   }
// };

// exports.getById = async (req, res) => {
//   try {
//     const filteredvaccinecenter = await bookingModel.findById(req.params.id);
//     res.status(200).json({
//       status: "success",
//       data: {
//         filteredvaccinecenter,
//       },
//     });
//   } catch (error) {
//     res.send(error);
//   }
// };
