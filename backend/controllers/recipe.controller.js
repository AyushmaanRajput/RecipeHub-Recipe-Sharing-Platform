const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

exports.addNewRecipe = async (req, res, next) => {
  // console.log(req.body, req.files, req.userId);
  const images = [];
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      images.push(file.path);
    });
  }
  try {
    const newRecipe = new Recipe({
      ...req.body,
      userId: req.userId,
      images: images,
    });
    await newRecipe.save();
    let user = await User.findOne({ _id: req.userId });
    let userRecipes = [...user.recipes, newRecipe._id];
    await User.findByIdAndUpdate(req.userId, { recipes: userRecipes });
    res.status(201).json({
      message: "Recipe created successfully",
      recipe: newRecipe,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Recipe creation failed" });
  }
};

exports.getAllRecipe = async (req, res, next) => {
  try {
    const { cuisine, impression, veg } = req.query;
    const filter = {};
    
    if (cuisine) {
      filter.cuisine = { $in: JSON.parse(cuisine) };
    }
    console.log(cuisine)
    
    if (veg === "veg" || veg === "non-veg") {
      filter.veg = veg === "veg";
    }

    const sort = {};

    if (impression) {
      if (impression === "asc") {
        sort["likes"] = 1; // Sort in ascending order of likes array length
      } else if (impression === "desc") {
        sort["likes"] = -1; // Sort in descending order of likes array length
      }
    }

    const recipes = await Recipe.find(filter)
      .sort(sort)
      .populate("userId")
      .populate("likes")
      .populate("comments");
    res.status(200).json(recipes);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get recipes", error });
  }
};

exports.getMyRecipe = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  let populate = req.query.populate;
  console.log("populate: ", populate)
  const { userId } = req;
  if (populate) {
    try {
      const recipe = await User.findOne({ _id: userId }).populate("recipes")
      .populate("likedRecipes")
      .populate("savedRecipes");;
      res.status(201).json(recipe);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to get your poster recipe", error });
    }
  } else {
    res.status(404).json({ message: "Pass a parameter" });
  }
};

exports.updateMyRecipe = async (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  console.log("in update recipe request", userId, id, req.body);
  try {
    let updated = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
    res
      .status(200)
      .json({ message: "Recipe updated successfully", updatedRecipe: updated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update your poster recipe", error });
  }
};

exports.deleteMyRecipe = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res
      .status(201)
      .json({ message: "Please login first to delete your recipe" });
  }
  const { userId } = req.body;
  const { id } = req.params;
  try {
    const post = await Recipe.findOne({ _id: id });
    if (post.userId != userId) {
      return res
        .status(400)
        .json({ message: "You are not authorized to delete this recipe" });
    }
    await Recipe.findOneAndDelete({ _id: id });
    res.status(201).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete your poster recipe", error });
  }
};

exports.getFeed = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find recipes that belong to the logged-in user and their friends
    const user = await User.findById(userId);
    const friendIds = user.friends.map((friend) => friend._id);

    const recipes = await Recipe.find({
      $or: [{ userId: userId }, { userId: { $in: friendIds } }],
    }).sort({ _id: -1 });

    // Populate the 'userId' field for each recipe
    await Recipe.populate(recipes, { path: "userId" });

    // Populate the 'comments' array for each recipe
    await Recipe.populate(recipes, { path: "comments" });

    // Populate the 'userId' field for each comment within the 'comments' array
    for (const recipe of recipes) {
      await Comment.populate(recipe.comments, { path: "userId" });
    }

    res.status(200).json({ message: "User Feed Found", feed: recipes });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Couldn't fetch user feed" });
  }
};

exports.getSingleRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id,"recipe id")
    const recipe = await Recipe.findOne({ _id: id }).populate("userId")
    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Couldn't fetch recipe" });
  }
}