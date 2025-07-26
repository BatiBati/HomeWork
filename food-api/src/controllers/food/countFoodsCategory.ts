import { RequestHandler } from "express";
import { foodModel } from "../../models/food.model";

export const countFoodsCategory: RequestHandler = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const Count = await foodModel
      .find(categoryId ? { category: categoryId } : {})
      .countDocuments();
    res.status(200).json({ Count });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
