import { Router } from "express";
import {
  countFoodsCategory,
  createFoodController,
  deleteOneFoodController,
  getFoodController,
  getOneFoodController,
  updateFoodController,
} from "../controllers/food";

export const foodRouter = Router()
  .get("/", getFoodController)
  // .get("/:id", getOneFoodController)
  .delete("/:id", deleteOneFoodController)
  .post("/", createFoodController)
  .put("/:id", updateFoodController)
  .get("/count", countFoodsCategory);
