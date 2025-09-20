import { RequestHandler } from "express";
import { messageModel } from "../../models/message.models";

export const getMessagesBetweenUsers: RequestHandler = async (req, res) => {
  const { user1Id, user2Id } = req.query;

  try {
    const messages = await messageModel
      .find({
        $or: [
          { sender: user1Id, receiver: user2Id },
          { sender: user2Id, receiver: user1Id },
        ],
      })
      .sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
