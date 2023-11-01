const Recipe = require('../models/Recipe.model');

exports.addNewRecipe = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(201).json({ message: "Please login first to add new recipe" });
  }
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res
      .status(201)
      .json({ message: `${req.body.title} posted successfully to the feed` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to post recipe", error: error });
  }
};

exports.getMyRecipe = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(201).json({ message: "Please login first to get your recipe" });
  }
  const { userId } = req.body;
  try {
    const recipe = await Recipe.find({ _id: userId });
    res.status(201).json(recipe);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get your poster recipe", error });
  }
};

exports.updateMyRecipe = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res
      .status(201)
      .json({ message: "Please login first to update your recipe" });
  }
  const { userId } = req.body;
  const { id } = req.params;
  try {
    const post = await Recipe.findOne({ _id: id });
    if (post.userId != userId) {
      return res
        .status(400)
        .json({ message: "You are not authorized to update this recipe" });
    }
    await Recipe.findOneAndUpdate({ _id: id }, req.body, { new: true });
    res.status(201).json({ message: "Recipe updated successfully" });
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
