const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const notificationSchema = new mongoose.Schema({
  message: String,
  time: String,
  type: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "true",
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
