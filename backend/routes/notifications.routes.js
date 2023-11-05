const express = require("express");
const router = express.Router();

//* comment Controller
const auth = require("../middlewares/auth.middleware");

const notificationController = require("../controllers/notifications.controller");

router.use(auth);

router.get("/", notificationController.getNotifications);

router.post("/add", notificationController.addNewNotification);

// router.patch("/update/:id", notificationController.updateNotification);

// router.delete("/delete/:id", notificationController.deleteNotification);

module.exports = router;
