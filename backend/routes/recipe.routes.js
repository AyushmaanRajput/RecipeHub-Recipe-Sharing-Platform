const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

//* Recipe Controller
const recipeController = require("../controllers/recipe.controller");

router.get("/getAllRecipe", recipeController.getAllRecipe);

router.use(auth);

router.post("/add", upload.array("images"), recipeController.addNewRecipe);

router.get("/feed", recipeController.getFeed);
// router.get("/getMyRecipe", recipeController.getMyRecipe);
router.get("/getMyRecipe", recipeController.getMyRecipe);

router.get("/getSingleRecipe/:id", recipeController.getSingleRecipe);

router.patch("/update/:id", recipeController.updateMyRecipe);

// router.delete("/deleteMyRecipe/:id", recipeController.deleteMyRecipe);

module.exports = router;
