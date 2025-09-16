import { Router } from "express";
import { createTaskController } from "../controllers/task/create-task";
const router = Router();
router.post("/create", createTaskController);
export { router as taskRouter };
