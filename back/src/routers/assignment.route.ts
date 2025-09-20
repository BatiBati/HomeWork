import { Router } from "express";
import {
  createAssignment,
  getAssignments,
  updateAssignment,
} from "../controllers/assignment";

export const assignmentRouter = Router()
  .post("/", createAssignment)
  .get("/", getAssignments)
  .patch("/:id", updateAssignment);
