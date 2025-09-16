import { Router } from "express";
import { createTaskController } from "../controllers/task/create-task";
import { getTaskById } from "../controllers/task/get-task-by-id";
const router = Router();
router.post("/create", createTaskController);
router.get("/:id", getTaskById);
export { router as taskRouter };
