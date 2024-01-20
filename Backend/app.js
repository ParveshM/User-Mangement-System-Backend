const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;
const router = require("./routers/routes");
const connectDB = require("./config/dbconfig");

var corsOptions = {
  origin: `http://localhost:${port}`,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
// user Routes
app.use("/", router);

// Starting the server and database
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is listening at http://localhost:${port}`);
});
