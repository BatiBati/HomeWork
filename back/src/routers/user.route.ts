import { Router } from "express";
import { createUserController } from "../controllers/user";


export const userRouter = Router().post("/:id", createUserController)

