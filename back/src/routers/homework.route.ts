import { Router } from "express";
import {
  getStudentIdByHomeWork,
  submitHomework,
} from "../controllers/homework";

const router = Router();

router.post("/", submitHomework);
router.get("/:studentId", getStudentIdByHomeWork);

export { router as homeworkRouter };
