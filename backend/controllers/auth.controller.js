const bcrypt = require("bcrypt");
const Recipe = require("../models/Recipe.model");
// const multer = require("multer"); // for file uploads
// const path = require("path");

// Set up multer for file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads"); // Destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     const extname = path.extname(file.originalname);
//     const filename = `${Date.now()}${extname}`;
//     cb(null, filename);
//   },
// });

// const upload = multer({ storage });

exports.addNewUser = async (req, res, next) => {
  try {
    const { name, email, password, city, gender, bio } = req.body;
    console.log(name, email, password, city, gender);

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      city,
      gender,
      bio,
      recipes: [],
      savedRecipes: [],
      likedRecipes: [],
    });

    try {
      // Save the user to the database
      await newUser.save();
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (err) {
      return res.status(500).json({ message: "User registration failed", err });
    }
    // // Handle profile image upload
    // upload.single("profileImage")(req, res, async (err) => {
    //   if (err) {
    //     return res.status(400).json({ message: "File upload error" });
    //   }

    //   // Check if a file was uploaded
    //   if (req.file) {
    //     newUser.profileImage = req.file.filename;
    //   }

    //   try {
    //     // Save the user to the database
    //     await newUser.save();
    //     res
    //       .status(201)
    //       .json({ message: "User registered successfully", user: newUser });
    //   } catch (err) {
    //     return res.status(500).json({ message: "User registration failed" });
    //   }
    // });
  } catch (err) {
    return res.status(500).json({ message: "User registration failed" });
  }
};

exports.loginUser = (req, res, next) => {
  
};