const express = require("express");
const router = require("./route");
const dotenv = require("dotenv");
const connectDB = require("./list-conn");

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(express.json());
app.use(
  express.json({
    extended: true,
  })
);

app.use("", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port} ...`);
});
