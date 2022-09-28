const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("db connected @ `" + uri + "` !");
  } catch (err) {
    console.error(err.message);
    console.error("error connecting to mongodb");
    process.exit(1);
  }
};

module.exports = connectDB;
