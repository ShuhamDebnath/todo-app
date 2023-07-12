require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.DB_SERVER || process.env.DB_LOCAL;

// mongoose
//   .connect(url)
//   .then(() => {
//     console.log("Server is connected ...".cyan.bold.underline);
//   })
//   .catch((err) => {
//     console.log(err).red;
//   });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log("Server is connected ...");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
