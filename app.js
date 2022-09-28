require("dotenv").config();
const express = require("express");

const connectDB = require("./db/mongodb.connect");
const todoRoutes = require("./routes/todo.routes");

const app = express();

app.use(express.json()); // middleware to parse the json
app.use(express.urlencoded({ extended: false }));

app.use("/todos", todoRoutes);

const mongoURI = `${process.env.MONGOURI}`;
connectDB(mongoURI);

app.get("/", (req, res) => {
  res.json("Hello World! With nodemon");
});

module.exports = app;
