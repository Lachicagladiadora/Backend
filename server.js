const express = require("express"); //libreria para crear servidores
const mongoose = require("mongoose"); //libreria para trabajar con mongodb
const User = require("./user");
const bodyParser = require("body-parser");

const USER_DB = "Lachicagladiadora";
const PASSWORD_DB = "wi4l7KHHdUaNwh1w";

const URI = `mongodb+srv://${USER_DB}:${PASSWORD_DB}@cluster0.7lzt3sn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(mongoose.version);

mongoose
  .connect(URI)
  .then(() => {
    console.log(">. DB connected 🦀");
  })
  .catch((err) => {
    console.log("⚠️", err);
  });

const app = express();
const port = 3000;

app.use(express.json()); //permite configurar el midleware(json-> se ejecuta antes de la funcion)
app.use(bodyParser.urlencoded({ extended: false })); //permite configurar midleware(body parser ->objeto con props)

app.get("/", (req, res) => {
  res.send("Hello World");
});

// let USERS = [
//   {
//     userName: "Adela",
//     email: "aaaa@hotmail.com",
//     _id: "6626fd15ac9049fde956dd40",
//     __v: 0,
//   },

//   {
//     userName: "Alberto",
//     email: "alberto@hotmail.com",
//     _id: "6626fd46ac9049fde956dd42",
//     __v: 0,
//   },
// ];

//  #region CRUD user
app.post("/user/new", async (req, res) => {
  try {
    let newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    newUser = await newUser.save();

    res.send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send("User not found ...");
    }

    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.put("/user/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        userName: req.body.userName,
        information: {
          gender: req.body.information.gender,
          age: req.body.information.age,
          weight: req.body.information.weight,
          height: req.body.information.height,
          waistCircumference: req.information.waistCircumference,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).send("User not found... ");
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete("/user/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      res.status(404).send("User not found , try again...");
    }

    res.status(204).send("User delete successfully... :)");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
