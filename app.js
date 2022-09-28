const express = require("express");

const todoRoutes = require("./routes/todo.routes");

const app = express();

app.use(express.json()); // middleware to parse the json
app.use(express.urlencoded({ extended: false }));

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.json("Hello World! With nodemon");
});

module.exports = app;
