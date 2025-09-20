import { RequestHandler } from "express";
import { messageModel } from "../../models/message.models";

export const sendMessage: RequestHandler = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    const newMessage = await messageModel.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    res.status(201).json({ message: "Message sent", newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
