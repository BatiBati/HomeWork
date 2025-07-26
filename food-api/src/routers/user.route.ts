import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  updateUserController,
} from "../controllers/user";

export const userRouter = Router()
  .get("/", getUserController)
  // .get("/:id", getUserController)
  .delete("/:id", deleteUserController)
  .post("/:id", createUserController)
  .patch("/:id", updateUserController)
  .put("/:id", updateUserController);
