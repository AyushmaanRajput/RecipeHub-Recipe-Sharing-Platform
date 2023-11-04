const express = require("express");
const router = express.Router();

//* comment Controller
const auth = require("../middlewares/auth.middleware");

const commentController = require("../controllers/comment.controller");

router.get("/", commentController.getComments);

router.use(auth);

router.post("/add", commentController.addNewComment);

router.patch("/update/:id", commentController.updateComment);

router.delete("/delete/:id", commentController.deleteComment);

module.exports = router;
