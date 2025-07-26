import { RequestHandler } from "express";
import { foodModel } from "../../models/food.model";

export const getFoodController: RequestHandler = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const foods = await foodModel
      .find(categoryId ? { category: categoryId } : {})
      .populate("category");
    res.status(200).json({ foods });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
