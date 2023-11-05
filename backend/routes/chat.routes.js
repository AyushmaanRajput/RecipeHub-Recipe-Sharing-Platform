const express = require("express");
const { ChatModel } = require("../models/Chat.model");
const chatRouter = express.Router();

// Router to create chat between
chatRouter.post("/addmessage", async (req, res) => {
  console.log(req.body);
  try {
    const newChat = new ChatModel(req.body);
    await newChat.save();
    res.status(200).send({ message: "Chat created" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

chatRouter.get("/getmessage/:firstId/:secondId", async (req, res) => {
  const firstId = req.params.firstId;
  const secondId = req.params.secondId;

  try {
    const chat = await ChatModel.find({
        $or: [
          { sender: firstId, receiver: secondId },
          { sender: secondId, receiver: firstId },
        ],
      });

    res.status(200).send(chat);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = chatRouter;
