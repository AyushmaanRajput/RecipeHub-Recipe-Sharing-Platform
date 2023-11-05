//* Server Entry File
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();

const connection = require("./connection");
const authRoutes = require("./routes/auth.routes");
const recipeRoutes = require("./routes/recipe.routes");
const userRoutes = require("./routes/user.routes");
const commentRoutes = require("./routes/comment.routes");

// // Middlewares
const upload = require("./middlewares/upload.middleware");
const chatRouter = require("./routes/chat.routes");

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

//* ROUTES
app.post("/upload", upload.array("file", 5), (req, res) => {
  // Send an appropriate response to the client
  console.log(req.files);
  res.status(200).json({ message: "File upload successful" });
});

app.use("/auth", authRoutes);
app.use("/recipe", recipeRoutes);
app.use("/users", userRoutes);
app.use("/comment", commentRoutes);
app.use("/chat", chatRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Successfully connected To Database");
    console.log("Server running at port :", process.env.PORT);
  } catch (err) {
    console.log(err);
  }
});
