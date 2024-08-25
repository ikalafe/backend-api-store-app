const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => {
        const result =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return result.test(value);
      },
      message: "Please Enter a Valid Email Address",
    },
  },

  state: {
    type: String,
    default: "",
  },

  city: {
    type: String,
    default: "",
  },

  locality: {
    type: String,
    default: "",
  },

  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => {
        //check if password is at least 8 characters long
        return value.length >= 8;
      },
      message: "Password must be at least 8 characters long",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
