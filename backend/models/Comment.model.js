const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  text: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  replies:[
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }
  ]
  ,
  recipeId: String,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
