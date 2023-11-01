const express = require('express');
const router= express.Router();
const upload = require("../middlewares/upload.middleware"); 

//* Auth Controller
const authController = require("../controllers/auth.controller");

//* POST-> '/auth/signup' to create a new user
router.post('/signup',upload.single('profileImage'), authController.addNewUser);

//* POST-> '/auth/signup' to login a user
router.post('/login', authController.loginUser);

//* GET-> '/auth/logout' to log a user out
router.get('/logout', authController.logoutUser);


module.exports = router;