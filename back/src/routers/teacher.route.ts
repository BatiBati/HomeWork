import { Router } from "express";
import { createTeacher } from "../controllers/teacher/create-teacher";
import { loginTeacher } from "../controllers/teacher/login-teacher";
import { authMiddleware } from "../middleware/auth.techer.middlware";
import { getMe } from "../controllers/teacher/getMe-teacher";
import { getTeacherById } from "../controllers/teacher";
import { updateTeacher } from "../controllers/teacher/update-techer";

const router = Router();

router.post("/create", createTeacher);
router.post("/login", loginTeacher);
router.get("/me", authMiddleware, getMe);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
export { router as teacherRouter };
