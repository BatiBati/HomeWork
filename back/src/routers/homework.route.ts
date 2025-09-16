import { Router } from "express";
import { 
  createHomeworkController, 
  getHomeworksController, 
  getMyHomeworksController,
  updateHomeworkController, 
  getHomeworkByStudentIdController,
  deleteHomeworkController 
} from "../controllers/homework";
import { authenticateToken, optionalAuth } from "../middleware/auth.stud.middleware";

const router = Router();

// Protected routes (authentication required)
router.post("/", authenticateToken, createHomeworkController);
router.get("/my", authenticateToken, getMyHomeworksController);
router.get("/", optionalAuth, getHomeworksController);
router.put("/:id", authenticateToken, updateHomeworkController);
router.delete("/:id", authenticateToken, deleteHomeworkController);
router.get("/:studentId", authenticateToken, getHomeworkByStudentIdController);

export { router as homeworkRouter };

