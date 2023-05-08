
const vaccinecenterModel = require("../models/vaccinationcenter");
const bookingModel = require("../models/booking")

exports.getbytime=async (req,res)=>{
  try {
    const vaccinecenters = await vaccinecenterModel.find({
      "workinghour.opentime": { $lte: req.query.time },
      "workinghour.closetime": { $gte: req.query.time }
    });
    if(vaccinecenters.length==0){
      return res.status(200).json({
        status: "success",
        data: `No centers available on the time:${req.query.time}:00`
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        vaccinecenters,
      },
    });
  } catch (error) {
    res.send(error);
  }
}

exports.bookvacccination=async (req,res)=>{
  try {
    const centers = await bookingModel.find({
      vaccinationdate: req.body.vaccinationdate,
      vaccinationcenter: req.body.vaccinationcenter
    }, { vaccinationcount: 1 });

    let booking;
    let count=0;
    centers.forEach(center => {
      count+=center.vaccinationcount;
    });

    console.log(count);

    if(count + req.body.vaccinationcount <= 10){
      booking = await bookingModel.create(req.body);
    }
    else{
      if(10-count>0){
        return res.status(400).json({
          status: "failure",
          data: `You can book only ${10-count} vaccination on ${req.body.vaccinationdate}`
        });
      }
      if(count + req.body.vaccinationcount>10)
      return res.status(400).json({
        status: "failure",
        data: `You Can't book vaccination on ${req.body.vaccinationdate} booking slot is filled`
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        booking
      },
    });
  } catch (error) {
    res.send(error);
  }
}


