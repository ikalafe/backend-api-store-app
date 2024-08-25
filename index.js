//import the express module
const express = require("express");

const mongoose = require("mongoose");
//Defind the port number the server will listen on
const PORT = 3000;

//create an instance of an express application
//because it give us the starting point
const app = express();
//mongodb String
const DB = "mongodb+srv://danikalafe:danikalafe@cluster0.u7q5q.mongodb.net/";
//middleware - to register routes or to mount routes

mongoose.connect(DB).then(() => {
  console.log("mongodb connected");
});

//start the server and listen on the specified port
app.listen(PORT, "0.0.0.0", function () {
  //LOG THE NuMBER
  console.log(`server is running on port ${PORT}`);
});
