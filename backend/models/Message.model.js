const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    chatId : String,
    sender : String,
    receiver : String,
    message : String,
    time : String
}, {
    timestamps : true,
    versionKey : false
})

const MessageModel = mongoose.model("message", messageSchema);

module.exports = {
    MessageModel
}