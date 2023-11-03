const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  text: String,
  likes: Number,
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
    required: "true",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
