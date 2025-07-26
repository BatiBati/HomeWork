import { Router } from "express";
import { getMe, signIn, signUp } from "../controllers/auth";
import { authenticationMiddleware } from "../controllers/middlewares/authentication-middleware";

export const authRouter = Router()
  .get("/me", authenticationMiddleware, getMe)
  .post("/sign-up", signUp)
  .post("/sign-in", signIn);
