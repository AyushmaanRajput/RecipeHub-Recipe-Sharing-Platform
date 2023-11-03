const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

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
// const token = req.headers.authorization?.split(" ")[1];
// if (!token) {
//   res.status(201).json({ message: "Please login first to add new recipe" });
// }
// try {
//   const recipe = new Recipe(req.body);
//   await recipe.save();
//   res
//     .status(201)
//     .json({ message: `${req.body.title} posted successfully to the feed` });
// } catch (error) {
//   return res
//     .status(500)
//     .json({ message: "Unable to post recipe", error: error });
//}

exports.getMyRecipe = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  let populate=req.params.populate;
  const { userId } = req;
  if(populate) {
    try {
      const recipe = await User.findOne({ _id: userId }).populate(populate);
      res.status(201).json(recipe);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to get your poster recipe", error });
    }
  }else{
    res.status(404).json({ message: "Pass a parameter"});
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
