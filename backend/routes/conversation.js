import express from "express";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const router = express.Router();

//new conversation
router.post("/", async (req, res) => {
  try {
    const user = await Conversation.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });
    if (!user) {
      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    }
    else{
      res.status(500).send("user exists")
    }
  } catch (error) {
    res.status(500).json(err);
  }
});

//get conversation of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: {
        $in: [req.params.userId],
      },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(err);
  }
});

export default router;
