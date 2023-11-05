const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");

//* User Controller
const userController = require("../controllers/user.controller");

router.use(auth);

router.get("/requests", userController.getRequests);

router.get("/friends", userController.getFriends);

router.get("/notfriends", userController.getNotFriends);

router.get("/:id", userController.getSingleUser);

router.get("/getAllUsers/admin", userController.getAllUsers);

router.get("/", userController.getLoggedInUser);

router.patch("/update/:id", userController.updateUser);

router.patch("/addFriend/:id", userController.addFriendToUser);

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
