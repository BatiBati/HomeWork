import { Router } from "express";
import {
  createCategoryController,
  deleteOneCategoryController,
  getCategoryController,
  getOneCategoryController,
  updateCategoryController,
} from "../controllers/category";

export const categoryRouter = Router()
  .get("/", getCategoryController)
  .get("/:id", getOneCategoryController)
  .delete("/:id", deleteOneCategoryController)
  .post("/", createCategoryController)
  .put("/:id", updateCategoryController);
