const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: Number,
  userName: String,
  email: String,
  password: String,
  information: Object,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
