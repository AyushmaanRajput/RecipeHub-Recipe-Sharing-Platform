//* Server Entry File
require("dotenv").config();
const multer = require("multer");
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");

const connection = require("./connection");
const authRoutes = require("./routes/auth.routes");

// Multer Middleware & Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

app.use(cors());
app.use(express.json());

//* ROUTES
app.get('/upload',(req,res)=>{

})
app.post('/upload',upload.single('image'),(req,res)=>{
  res.end('Uploaded image successfully');
})
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
