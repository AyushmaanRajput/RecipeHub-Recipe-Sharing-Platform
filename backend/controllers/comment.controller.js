const Comment = require("../models/Comment.model");
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const Notification = require("../models/Notification.model");

exports.addNewComment = async (req, res, next) => {
  try {
    const { text, userId, recipeId } = req.body;

    // Create a new comment
    const comment = new Comment({ text, userId, recipeId });

    // Save the comment to the database
    await comment.save();

    // Update the associated recipe with the comment ID
    await Recipe.findByIdAndUpdate(recipeId, {
      $push: { comments: comment._id },
    });

    // Fetch the username of the user who commented
    const commenter = await User.findById(userId);

    // Create a notification for the owner of the recipe
    const recipe = await Recipe.findById(recipeId);
    if (recipe && recipe.userId) {
      const notification = new Notification({
        message: `${commenter.name} commented on your recipe`,
        time: new Date().toISOString(),
        type: "comment",
        userId: recipe.userId,
        senderImage: commenter.profileImage,
      });
      await notification.save();
    }

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    next(error);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    // You can add pagination here if needed
    const comments = await Comment.find();

    res
      .status(200)
      .json({ message: "Comments retrieved successfully", comments });
  } catch (error) {
    next(error);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const commentId = req.params.id;

    // You should perform some validation on the input data here

    // Update the comment
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;

    // Delete the comment
    const comment = await Comment.findByIdAndRemove(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment reference from the associated recipe
    await Recipe.findByIdAndUpdate(comment.recipeId, {
      $pull: { comments: commentId },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
