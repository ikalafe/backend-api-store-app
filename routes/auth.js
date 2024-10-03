const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//sign up api endpoint
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ msg: "user with same email already exist" });
    } else {
      //Generate a salt with a cost factor of 10
      const salt = await bcrypt.genSalt(10);
      //Hash the password using the generated salt
      const hashedPassword = await bcrypt.hash(password, salt);
      let user = new User({ fullName, email, password: hashedPassword });
      user = await user.save();
      res.json({ user });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//sign in api endpoint
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ msg: "User Not Found with this email" });
    } else {
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) {
        res.status(400).json({ msg: "Incorrect password" });
      } else {
        const token = jwt.sign({ id: findUser._id }, "passwordKey");
        //remove sensitive information
        const { password, ...userWithoutPassword } = findUser._doc;
        //send the response
        res.json({ token, user: userWithoutPassword });
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Put route for updating users state, city, locality
authRouter.put("/api/users/:id", async (req, res) => {
  try {
    // Extract the 'id' parameter from the request URL
    const { id } = req.params;
    // Extract the "state", "city", "locality" fields from the request body
    const { state, city, locality } = req.body;
    // Find the user by their ID and update the state, city, locality fields
    // the (new: true) option ensures the updated document is returned
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { state, city, locality },
      { new: true }
    );
    // If no user is found, return 404 page not found status with an error message
    if (!updatedUser) {
      return res.status(404).json({ error: "کاربر پیدا نشد" });
    }
    return res.status(200).json(updatedUser);
  } catch (e) {}
});

module.exports = authRouter;
