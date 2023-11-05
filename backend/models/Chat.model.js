const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = mongoose.Schema(
  {
    sender : {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
      },
    receiver : {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
      },
    message : {
      type  : String,
      required: true
    },
    time : String
  },
  {
    versionKey: false,
  }
);

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = {
  ChatModel,
};
