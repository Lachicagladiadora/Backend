const express = require("express"); //libreria para crear servidores
const mongoose = require("mongoose"); //libreria para trabajar con mongodb
const User = require("./user");
const bodyParser = require("body-parser");
const cors = require("cors"); // midleware que permite conectar con url externa

const USER_DB = "quintanillaroseny";
const PASSWORD_DB = "oQzXXD7P5RZsPDXT";

const URI = `mongodb+srv://${USER_DB}:${PASSWORD_DB}@cluster0.lm3xdo2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
app.use(cors()); // por defecto permite conectar solo con url que venga del mismo lugar y no externa, al usasarla damos acceso al exterior

app.get("/", (req, res) => {
  res.send("Hello World");
});

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

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
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
      { userName: req.body.userName },
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
