//import the express module
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const bannerRouter = require("./routes/banner");
const categoryRouter = require("./routes/category");
const dotenv = require('dotenv').config();
//Defind the port number the server will listen on
const PORT = 3000;

//create an instance of an express application
//because it give us the starting point
const app = express();
//mongodb String
const DB = process.env.DB;
//middleware - to register routes or to mount routes
app.use(express.json());
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);

mongoose.connect(DB).then(() => {
  console.log("mongodb connected");
});

//start the server and listen on the specified port
app.listen(PORT, "0.0.0.0", function () {
  //LOG THE NuMBER
  console.log(`server is running on port ${PORT}`);
});
