import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { studentModel } from "../models/student.model";

// Extend Request interface to include user data
declare global {
  namespace Express {
    interface Request {
      student?: {
        _id: string;
     parentname: string;
        childname: string;
      };
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ 
        message: "Access token required" 
      });
      return;
    }

    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
    
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as { studentId: string; username: string };
    
    // Find the student to ensure they still exist
    const student = await studentModel.findById(decoded.studentId);
    if (!student) {
      res.status(401).json({ 
        message: "Invalid token - student not found" 
      });
      return;
    }

    // Add student info to request object
    req.student = {
      _id: student._id.toString(),
      parentname: student.parentname,
      childname: student.childname
    };

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ 
      message: "Invalid or expired token" 
    });
  }
};

// Middleware to verify token but make it optional
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
      const decoded = jwt.verify(token, JWT_SECRET) as { studentId: string; username: string };
      
      const student = await studentModel.findById(decoded.studentId);
      if (student) {
        req.student = {
          _id: student._id.toString(),
          username: student.username,
          childname: student.childname
        };
      }
    }
    
    next();
  } catch (error) {
    next();
  }
};