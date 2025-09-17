import { Router } from "express";
import {
  refreshTokenController,
  logoutStudentController,
  loginOrRegisterStudentController,
  getStudentController,
  getStudentById,
} from "../controllers/student";

const router = Router();

// Public routes (no authentication required)
router.get("/", getStudentController);
router.post("/login", loginOrRegisterStudentController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", logoutStudentController);
router.get("/:id", getStudentById);

export { router as studentRouter };
