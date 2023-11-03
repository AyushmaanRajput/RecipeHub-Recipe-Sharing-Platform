const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: "true",
  },
  title: String,
  images: [String],
  description: String,
  ingredients: [String],
  instructions: [String],
  caption: String,
  veg: Boolean,
  time: String,
  tags: [String],
  cuisine: [String],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  rating: {
    value:Number,
    no_of_votes:Number
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
