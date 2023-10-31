//* Server Entry File
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const connection = require("./connection");
const authRoutes = require("./routes/auth.routes");

app.use(cors());
app.use(express.json());

//* ROUTES
app.use("/auth", authRoutes);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Successfully connected To Database");
    console.log("Server running at port :", process.env.PORT);
  } catch (err) {
    console.log(err);
  }
});
