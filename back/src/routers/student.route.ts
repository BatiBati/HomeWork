import { Router } from "express";
import { 
  createStudentController,
  signupStudentController, 
  loginStudentController, 
  refreshTokenController, 
  logoutStudentController,
  getStudentProfileController,
  getStudentByIdController,
  getStudentsController 
} from "../controllers/student";
import { authenticateToken } from "../middleware/auth.stud.middleware";

const router = Router();

// Public routes (no authentication required)
router.post("/register", createStudentController);
router.post("/signup", signupStudentController);
router.post("/login", loginStudentController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", logoutStudentController);

// Protected routes (authentication required)
router.get("/profile", authenticateToken, getStudentProfileController);
router.get("/:id", authenticateToken, getStudentByIdController);

// Admin route (optional authentication)
router.get("/", getStudentsController);

export { router as studentRouter };

