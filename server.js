const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json("Hello World! With nodemon");
});

PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
