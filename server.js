require("dotenv").config();

const app = require("./app");
const connectDB = require("./db/mongodb.connect");

const mongoURI = `${process.env.MONGOURI}`;
connectDB(mongoURI);

PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
