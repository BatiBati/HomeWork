import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getMeUser } from "../controllers/auth/get-me";
import { login } from "../controllers/auth/login";

const router = Router();

router.get("/me", authMiddleware, getMeUser);

router.post("/login", login);
export { router as getMeRouter };
