import { Router } from "express";
import { createTeacher } from "../controllers/teacher/create-teacher";
import { loginTeacher } from "../controllers/teacher/login-teacher";
import { authMiddleware } from "../middleware/auth.techer.middlware";
import { getMe } from "../controllers/teacher/getMe-teacher";
import { getTeacherById } from "../controllers/teacher";

const router = Router();

router.post("/create", createTeacher);
router.post("/login", loginTeacher);
router.get("/getme", authMiddleware, getMe);
router.get("/:id", getTeacherById);
export { router as teacherRouter };
