import { Router } from "express";
import {
  refreshTokenController,
  logoutStudentController,
  loginOrRegisterStudentController,
  getStudentController,
  getStudentByChildname,
} from "../controllers/student";

const router = Router();

// Public routes (no authentication required)
router.get("/", getStudentController);
router.post("/login", loginOrRegisterStudentController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", logoutStudentController);
router.get("/:childname", getStudentByChildname);

export { router as studentRouter };
