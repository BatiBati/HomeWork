import { Router } from "express";
import {
  createAssignment,
  getAssignments,
  updateAssignment,
} from "../controllers/assignment";
import { authMiddleware } from "../middleware/auth.middleware";
import { getAssignmentsByTeacher } from "../controllers/assignment/get-assingments-by-id";

export const assignmentRouter = Router()
  .post("/", createAssignment)
  .get("/", getAssignments)
  .patch("/:id", updateAssignment)
  .get("/get/:teacherId", getAssignmentsByTeacher);
