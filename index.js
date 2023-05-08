const mongoose = require("mongoose"); 
const express = require("express"); 
const auth = require("./routes/autentication.js");
const user = require("./routes/booking.js");
const admin = require("./routes/center.js");
const app = express();
const cors=require('cors');
app.use(express.json());
require("dotenv").config();


mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Mongo db connected successfull");
  })
  .catch((err) => {
    console.log(err);
  });
  const corsOpts = {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
  };
  app.use(cors(corsOpts));
app.use("/api/auth", auth);
app.use("/api/admin", admin);
app.use("/api/user", user);

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log(`server created on the port ${process.env.PORT} `);
});
