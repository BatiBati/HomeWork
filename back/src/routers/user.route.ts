import { Router } from "express";
import {
  getAllUsersController,
  getUserByEmail,
  getUserById,
} from "../controllers/user";
import { createUserController } from "../controllers/user/create-user";
import { updateUserById } from "../controllers/user/update-user";
import { authMiddleware } from "../middleware/auth.middleware";

export const userRouter = Router()
  .post("/", createUserController)
  .get("/", authMiddleware, getAllUsersController)
  .get("/:id", getUserById)
  .post("/email", authMiddleware, getUserByEmail)
  .patch("/:id", authMiddleware, updateUserById);
