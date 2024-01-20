const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const userRouter = require("./router");

app.use(express.json());
app.use("/", userRouter);

// Starting the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
