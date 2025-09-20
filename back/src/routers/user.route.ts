import { Router } from "express";
import {
  getAllUsersController,
  getUserByEmail,
  getUserById,
} from "../controllers/user";
import { createUserController } from "../controllers/user/create-user";
import { updateUserById } from "../controllers/user/update-user";

export const userRouter = Router()
  .post("/", createUserController)
  .get("/", getAllUsersController)
  .get("/:id", getUserById)
  .post("/email", getUserByEmail)
  .patch("/:id", updateUserById);
