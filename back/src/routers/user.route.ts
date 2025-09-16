import { Router } from "express";
import { createUserController, getAllUsersController } from "../controllers/user";


export const userRouter = Router().post("/", createUserController).get("/", getAllUsersController)

