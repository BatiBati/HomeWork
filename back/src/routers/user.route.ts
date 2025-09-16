import { Router } from "express";
import { getAllUsersController } from "../controllers/user";
import { createUserController } from "../controllers/user/create-user";

export const userRouter = Router()
  .post("/", createUserController)
  .get("/", getAllUsersController);
