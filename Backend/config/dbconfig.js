const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.log("Error connecting", err);
    });
};

module.exports = connectDB;
