const express = require("express");
const mongoose = require("mongoose");

const USER_DB = "Lachicagladiadora";
const PASSWORD_DB = "wi4l7KHHdUaNwh1w";

const URI = `mongodb+srv://${USER_DB}:${PASSWORD_DB}@cluster0.7lzt3sn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(mongoose.version);

mongoose
  .connect(
    URI
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   // useCreateIndex: true,
    //   useFindAndModify: false,
    // }
  )
  .then(() => {
    console.log(">. DB connected 🦀");
  })
  .catch((err) => {
    console.log("⚠️", err);
  });

const app = express();
const port = 3000;

app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const User = require("./user");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

//  MAKE CONNECTION WITH ROUTE FOR NEW USER AND SEND DATA , TEST API

// const users = [
//   {
//     userId: 1,
//     userName: "Pepito",
//     email: "pepito@gmail.com",
//     password: "String",
//     information: {
//       gender: "male",
//       age: 15,
//       weight: "40",
//       height: "1.40",
//       waistCircumference: "60",
//     },
//   },
//   {
//     userId: 2,
//     userName: "Juancito",
//     email: "juan@gmail.com",
//     password: "String",
//     information: {
//       gender: "female",
//       age: 23,
//       weight: "45",
//       height: "1.50",
//       waistCircumference: "68",
//     },
//   },
// ];

//  #region CRUD user (POST, GET, PUT, DELETE)
app.post("/user/new", async (req, res) => {
  // const { userName, email, password } = req.body;
  // if (!userName || !email || !password) {
  // return res.status(400).send("Missing user name or email");
  // }
  let newUser = new User({
    // userId: 12,

    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    // information: {},
  });
  console.log("--------------->--------->");
  // console.log(res);
  newUser = await newUser.save();
  res.send(newUser);
  console.log({ newUser });
  // users.push(newUser);
  // .status(200)
  // .send(`Welcome ${userName}, your account was created successfully`);
});

app.get("/user/:userId", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
});

app.put("/user/:userId", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      userName: req.body.userName,
      information: {
        gender: req.body.information.gender,
        age: req.body.information.age,
        weight: req.body.information.weight,
        height: req.body.information.height,
        waistCircumference: req.body.information.waistCircumference,
      },
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).send("User not found");
  }
  res.send(user);
  // const { userName, email, information } = req.body;
  // user.userName = userName || user.userName;
  // user.email = email || user.email;
  // user.information = information || user.information;
});

app.delete("/user/:userId", async (req, res) => {
  const userId = await User.findByIdAndDelete(req.params.id);
  if (!userId) {
    res.status(404).send("User not found");
  }
  users.splice(userId, 1);
  res.status(204).send("user delete successfully");
});

//  #region CRUD information IMC
// app.post("/user/:userId", async (req, res) => {
//   const { weight, height } = req.body;
//   if (!weight || !height) {
//     return res.status(400).send("Missing put weight or height");
//   }
//   const newInformation = new information({
//     weight,
//     height,
//   });
//   newInformation = await newInformation.save();
// });

// how send password and access account
//  #region Update user (PUT)
//  #region Delete user (DELETE)
