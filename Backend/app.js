const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const userRouter = require("./routers/userRoutes");
const connectDB = require("./config/dbconfig");

app.use(express.json());
// user Routes
app.use("/", userRouter);

// Starting the server and database
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is listening at http://localhost:${port}`);
});
