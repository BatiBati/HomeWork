import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { studentModel } from "../../models/student.model";

export const refreshTokenController: RequestHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        message: "Access token required",
      });
      return;
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    const decoded = jwt.verify(token, JWT_SECRET) as {
      studentId: string;
      username: string;
    };

    // Find the student to ensure they still exist
    const student = await studentModel.findById(decoded.studentId);
    if (!student) {
      res.status(401).json({
        message: "Invalid token - student not found",
      });
      return;
    }

    // Generate new token
    const newToken = jwt.sign(
      {
        studentId: student._id,
        parentname: student.parentname,
        parentEmail: student.parentEmail,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Token refreshed successfully",
      token: newToken,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};
