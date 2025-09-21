import { Router } from "express";
import {
  createAssignment,
  getAssignments,
  updateAssignment,
} from "../controllers/assignment";
import { authMiddleware } from "../middleware/auth.middleware";
import { getAssignmentsByTeacher } from "../controllers/assignment/get-assingments-by-id";

export const assignmentRouter = Router()
  .post("/", authMiddleware, createAssignment)
  .get("/", authMiddleware, getAssignments)
  .patch("/:id", authMiddleware, updateAssignment)
  .get("/get/:teacherId", getAssignmentsByTeacher);
