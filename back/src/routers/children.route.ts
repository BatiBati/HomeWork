import { Router } from "express";
import { createChildren, getChildrens, updateChildrenById } from "../controllers/children";

export const childrenRouter = Router()
  .post("/", createChildren)
  .get("/", getChildrens)
  .get("/:id", getChildrens)
  .patch("/:id", updateChildrenById);
