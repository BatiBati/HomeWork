import { Router } from "express";
import {
  createAssignment,
  getAssignmentById,
  getAssignments,
  updateAssignment,
} from "../controllers/assignment";
import { getAssignmentsByTeacher } from "../controllers/assignment/get-assingments-by-id";

export const assignmentRouter = Router()
  .post("/", createAssignment)
  .get("/", getAssignments)
  .patch("/:id", updateAssignment)
  .get("/get/:id", getAssignmentsByTeacher)
  .get("/byId/:id", getAssignmentById);
