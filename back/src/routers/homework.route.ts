import { Router } from "express";
import {
  submitHomework,
  getHomeworksController,
  getMyHomeworksController,
  updateHomeworkController,
  getHomeworkByStudentIdController,
  deleteHomeworkController,
} from "../controllers/homework";
import {
  authenticateToken,
  optionalAuth,
} from "../middleware/auth.stud.middleware";
import { updateHomeworkById } from "../controllers/homework/update-home-work";

const router = Router();

// Protected routes (authentication required)
router.post("/", submitHomework);
router.get("/my", authenticateToken, getMyHomeworksController);
router.get("/", optionalAuth, getHomeworksController);
router.put("/:id", authenticateToken, updateHomeworkController);
router.delete("/:id", authenticateToken, deleteHomeworkController);
router.get("/:studentId", authenticateToken, getHomeworkByStudentIdController);
router.put("/update/:id", updateHomeworkById);

export { router as homeworkRouter };
