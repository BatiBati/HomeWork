import { Router } from "express";
import {
  refreshTokenController,
  logoutStudentController,
  loginOrRegisterStudentController,
} from "../controllers/student";
import { authenticateToken } from "../middleware/auth.stud.middleware";

const router = Router();

// Public routes (no authentication required)

router.post("/login", loginOrRegisterStudentController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", logoutStudentController);

export { router as studentRouter };
