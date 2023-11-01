const express = require('express');
const router= express.Router();

//* Auth Controller
const recipeController = require("../controllers/recipe.controller");

router.post("/addRecipe", recipeController.addNewRecipe);

router.get("/getMyRecipe", recipeController.getMyRecipe);

router.put("/updateMyRecipe/:id", recipeController.updateMyRecipe);

router.delete("/deleteMyRecipe/:id", recipeController.deleteMyRecipe);

module.exports = router;