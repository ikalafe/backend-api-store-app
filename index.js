//import the express module
const express = require("express");

//Defind the port number the server will listen on
const PORT = 3000;

//create an instance of an express application
//because it give us the starting point

const app = express();

//start the server and listen on the specified port
app.listen(PORT, "0.0.0.0", function () {
  //LOG THE NuMBER
  console.log(`server is running on port ${PORT}`);
});
