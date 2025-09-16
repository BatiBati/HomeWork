import { Router } from "express";
import { createTeacher } from "../controllers/teacher/create-teacher";
import { loginTeacher } from "../controllers/teacher/login-teacher";

const router = Router();

router.post("/create", createTeacher);
router.post("/login", loginTeacher);
export { router as teacherRouter };
