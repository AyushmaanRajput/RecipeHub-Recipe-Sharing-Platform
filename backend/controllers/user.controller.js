const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");
const Notification = require("../models/Notification.model");
const Comment = require("../models/Comment.model");

exports.getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Couldn't Fetch User" });
  }
};

exports.getLoggedInUser = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Couldn't Fetch User" });
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const type = req.header("X-Action-Type"); // Get the type from the request header

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (type === "like") {
      // Handle post liked
      // Create a notification for the post owner
      // Access the recipeId from the last element of likedRecipes
      const recipeId = req.body.likedRecipes[req.body.likedRecipes.length - 1];

      // Fetch the username of the user who liked the post
      const liker = await User.findById(id);

      // Fetch the recipe and its owner
      const recipe = await Recipe.findById(recipeId);
      if (recipe && recipe.userId) {
        const notification = new Notification({
          message: `${liker.name} liked your recipe`,
          time: new Date().toISOString(),
          type: "like",
          userId: recipe.userId,
          senderImage: liker.profileImage,
        });
        await notification.save();
      }
    }

    console.log("User Updated successfully");
    res.status(200).json({ status: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res, next) => {};

exports.getNotFriends = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId }).populate(
      "friends requests"
    );

    const userIdsToExclude = [
      userId,
      ...user.friends.map((friend) => friend._id),
      ...user.requests.map((request) => request._id),
    ];

    const notFriends = await User.find({
      _id: {
        $nin: userIdsToExclude,
      },
      friends: { $nin: [userId] },
      requests: { $nin: [userId] },
    });

    res.status(200).json({ message: "Not Friends List found", notFriends });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong" });
  }
};

exports.getRequests = async (req, res, next) => {
  try {
    const userId = req.userId; // Assuming you have the user's ID in the request

    // Find the logged-in user to access their requests array
    const user = await User.findOne({ _id: userId }).populate("requests");

    // Get the list of users in the logged-in user's requests array
    const requestUsers = user.requests;

    res.status(200).json({ message: "Requests List found", requestUsers });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong" });
  }
};

exports.getFriends = async (req, res, next) => {
  try {
    const userId = req.userId; // Assuming you have the user's ID in the request

    // Find the logged-in user to access their requests array
    const user = await User.findOne({ _id: userId }).populate("friends");

    // Get the list of users in the logged-in user's requests array
    const friends = user.friends;

    res.status(200).json({ message: "Requests List found", friends });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong" });
  }
};
exports.addFriendToUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (user) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { friends: [...user.friends, req.userId] },
        {
          new: true,
        }
      );
      console.log("Added id to user's friends List");
      res
        .status(200)
        .json({ status: "User updated successfully", updatedUser });
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ message: "User Doesn't exist" });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find().populate("friends").populate("recipes");
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong" });
  }
};