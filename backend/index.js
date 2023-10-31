//* Server Entry File
require("dotenv").config();
const express = require("express");
const app = express();

const connection = require("./connection");

//* ROUTES



app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Successfully connected To Database");
    console.log("Server running at port :", process.env.PORT);
  } catch (err) {
    console.log(err);
  }
});
