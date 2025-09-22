import { RequestHandler } from "express";
import { messageModel } from "../../models/message.models";

export const getMessagesBetweenUsers: RequestHandler = async (req, res) => {
  const { user1Id, user2Id } = req.query;

  if (!user1Id || !user2Id) {
    res.status(400).json({ message: "user1Id and user2Id are required" });
    return;
  }

  try {
    const messages = await messageModel
      .find({
        $or: [
          { sender: user1Id, receiver: user2Id },
          { sender: user2Id, receiver: user1Id },
        ],
      })
      .populate("sender", "firstName lastName role")
      .populate("receiver", "firstName lastName role")
      .sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};
