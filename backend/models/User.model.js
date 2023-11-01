// User Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String, 
  profileImage: String,
  city: String,
  gender: String,
  bio: String,
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  savedRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  likedRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  friends:[
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  requests:[
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
