const mongoose = require("mongoose");

// const informationSchema );

const userSchema = new mongoose.Schema({
  userId: Number,
  userName: String,
  email: String,
  password: String,
  information: new mongoose.Schema({
    gender: String,
    age: Number,
    weight: String,
    height: String,
    waistCircumference: String,
  }),
});

const User = mongoose.model("User", userSchema);

module.exports = User;
