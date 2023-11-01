const express = require('express');
const router= express.Router();

const auth= require('../middlewares/auth.middleware');

//* User Controller
const userController = require("../controllers/user.controller");

router.use(auth);

router.get("/:id", userController.getSingleUser);

router.get("/", userController.getLoggedInUser);

router.patch("/update/:id", userController.updateUser);

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;