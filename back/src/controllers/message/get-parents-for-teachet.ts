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
    const messages = await messageModel
      .find({
        $or: [{ sender: teacherId }, { receiver: teacherId }],
      })
      .populate<{ sender: UserRef; receiver: UserRef }>(
        "sender receiver",
        "_id firstName lastName role"
      );

    // use a Set for IDs to guarantee uniqueness
    const parentSet = new Set<string>();
    const parents: { _id: string; firstName: string; lastName: string }[] = [];

    messages.forEach((msg) => {
      let parent: UserRef | null = null;

      if (msg.sender.role === "parents" && msg.sender._id !== teacherId) {
        parent = msg.sender;
      } else if (
        msg.receiver.role === "parents" &&
        msg.receiver._id !== teacherId
      ) {
        parent = msg.receiver;
      }

      if (parent && !parentSet.has(parent._id.toString())) {
        parentSet.add(parent._id.toString());
        parents.push({
          _id: parent._id.toString(),
          firstName: parent.firstName,
          lastName: parent.lastName,
        });
      }
    });

    res.json({ parents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
