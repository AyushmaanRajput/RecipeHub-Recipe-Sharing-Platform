const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  likes: Number,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
