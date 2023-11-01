//* Server Entry File
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();

const connection = require("./connection");
const authRoutes = require("./routes/auth.routes");
const recipeRoutes = require("./routes/recipe.routes");
const userRoutes = require("./routes/user.routes");

// // Middlewares
// const upload = require("./middlewares/upload.middleware");

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

//* ROUTES
// app.post('/upload',upload.single('image'),(req,res)=>{
//   res.end('Uploaded image successfully');
// })
app.use("/auth", authRoutes);
app.use("/recipe", recipeRoutes);
app.use("/users", userRoutes);


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Successfully connected To Database");
    console.log("Server running at port :", process.env.PORT);
  } catch (err) {
    console.log(err);
  }
});
