const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Lachicagladiadora:<wi4l7KHHdUaNwh1w>@cluster0.7lzt3sn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { userNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((error) => console.error("Could not connect to MongoDB ...", error));

const app = express();
const port = 3000;

app.use(express.json());

const User = require("./user");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

const users = [];

//  #region Create user (POST)
app.post("/user/new", async (req, res) => {
  const { userName, email } = req.body;
  if (!userName || !email) {
    return res.status(400).send("Missing user name or email");
  }
  const newUser = new User({
    userId: users.length + 1,
    userName,
    email,
    password,
    // information: {},
  });
  newUser = await newUser.save();
  // users.push(newUser);
  res.send();
  // .status(200)
  // .send(`Welcome ${userName}, your account was created successfully`);
});

//  #region Read user (GET)
app.get("/user/:userId", (req, res) => {
  const user = users.find((cur) => cur.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
});

//  #region Update user (PUT)
app.put("/user/:userId", (req, res) => {
  const user = users.find((cur) => cur.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  const { userName, email, information } = req.body;
  user.userName = userName || user.userName;
  user.email = email || user.email;
  user.information = information || user.information;

  res.send(user);
});

//  #region Delete user (DELETE)
app.delete("/user/:userId", () => {
  const userId = users.find((cur) => cur.id === parseInt(req.params.id));
  if (!userId) {
    res.status(404).send("User not found");
  }
  users.splice(userId, 1);
  res.status(204).send("user delete successfully");
});
