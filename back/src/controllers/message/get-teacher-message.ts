// controllers/message.ts
import { RequestHandler } from "express";
import { messageModel } from "../../models/message.models";

export const getMessagesForTeacher: RequestHandler = async (req, res) => {
  const { teacherId } = req.query;

  if (!teacherId) {
    res.status(400).json({ message: "teacherId is required" });
    return;
  }

  try {
    const messages = await messageModel
      .find({
        $or: [{ sender: teacherId }, { receiver: teacherId }],
      })
      .sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
