import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { teacherModel } from "../models/teacher.model";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const teacher = await teacherModel.findById(decoded._id);
    if (!teacher) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    (req as any).teacher = teacher;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
