const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDb = require("./config/db");
const User = require("./models/userModel");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
connectDb();

const data = [{ name: "teha" }, { age: 10 }];
var email = "teja9849@gmail.com";
var password = "teja1234";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

app.get("/", (req, res) => {
  res.send(data);
});

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      name,
      email,
    });
  }
});

app.post("/login", async (request, response) => {
  const { email, password } = request.body;

  console.log(email, password);

  const user = await User.findOne({ email });

  if (user && user.password === password) {
    response.json({
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    response.status(400);
    response.send({
      error_msg: "Invalid Email or Password",
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log("server started"));
