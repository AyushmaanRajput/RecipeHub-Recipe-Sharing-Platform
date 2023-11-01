const express = require('express');
const router= express.Router();

//* Auth Controller
const authController = require("../controllers/auth.controller");

//* POST-> '/auth/signup' to create a new user
router.post('/signup', authController.addNewUser);

//* POST-> '/auth/signup' to create a new user
router.post('/login', authController.loginUser);

router.post("/addRecipe", authController.addNewRecipe);

router.get("/getMyRecipe", authController.getMyRecipe);

router.put("/updateMyRecipe/:id", authController.updateMyRecipe);

router.delete("/deleteMyRecipe/:id", authController.deleteMyRecipe);

module.exports = router;