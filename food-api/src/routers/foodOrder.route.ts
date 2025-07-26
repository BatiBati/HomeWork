import { Router } from "express";
import {
  createFoodOrderController,
  deleteFoodOrderController,
  getFoodOrderController,
  updateFoodOrderController,
} from "../controllers/foodOrder";
import { getOneFoodOrderController } from "../controllers/foodOrder/getOneFoodOrderController";

export const foodOrder = Router()
  .get("/", getFoodOrderController)
  .get("/:id", getOneFoodOrderController)
  .delete("/:id", deleteFoodOrderController)
  .post("/post", createFoodOrderController)
  .patch("/:id", updateFoodOrderController)
  .put("/:id", updateFoodOrderController);
