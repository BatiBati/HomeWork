// controllers/messageController.ts
import { RequestHandler } from "express";
import { messageModel } from "../../models/message.models";

interface UserRef {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const getParentsForTeacher: RequestHandler = async (req, res) => {
  const { teacherId } = req.query;

  if (!teacherId || typeof teacherId !== "string") {
    res.status(400).json({ message: "teacherId is required" });
    return;
  }
  try {
    // find all messages where teacher is sender or receiver
    const messages = await messageModel
      .find({
        $or: [{ sender: teacherId }, { receiver: teacherId }],
      })
      .populate<{ sender: UserRef; receiver: UserRef }>(
        "sender receiver",
        "_id firstName lastName role"
      );

    const parentMap = new Map<
      string,
      { _id: string; firstName: string; lastName: string }
    >();

    messages.forEach((msg) => {
      // pick only the parent (not teacher)
      const parent =
        msg.sender.role === "parents"
          ? msg.sender
          : msg.receiver.role === "parents"
          ? msg.receiver
          : null;

      if (parent && parent._id !== teacherId) {
        parentMap.set(parent._id, {
          _id: parent._id,
          firstName: parent.firstName,
          lastName: parent.lastName,
        });
      }
    });

    res.json({ parents: Array.from(parentMap.values()) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
