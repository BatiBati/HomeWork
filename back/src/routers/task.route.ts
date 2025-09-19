import { Router } from "express";
import { createTaskController } from "../controllers/task/create-task";
import { getTaskById } from "../controllers/task/get-task-by-id";
import { getTasksByTeacher } from "../controllers/task/getTaksbyTeacherId";
const router = Router();
router.post("/create", createTaskController);
router.get("/:id", getTaskById);
router.get("/teacher/:teacherId", getTasksByTeacher);
export { router as taskRouter };
