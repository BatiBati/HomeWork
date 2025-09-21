import { Router } from "express";
import {
  createAssignment,
  getAssignments,
  updateAssignment,
} from "../controllers/assignment";
import { authMiddleware } from "../middleware/auth.middleware";

export const assignmentRouter = Router()
  .post("/", authMiddleware, createAssignment)
  .get("/", authMiddleware, getAssignments)
  .patch("/:id", authMiddleware, updateAssignment);
