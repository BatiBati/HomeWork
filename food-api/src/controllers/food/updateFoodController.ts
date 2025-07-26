import { RequestHandler } from "express";
import { foodModel } from "../../models/food.model";

export const updateFoodController: RequestHandler = async (req, res) => {
  const { foodName, price, image, ingredients, category } = req.body;
  const { id } = req.params;
  try {
    await foodModel.findByIdAndUpdate(id, {
      foodName,
      price,
      image,
      ingredients,
      category,
    });

    res.status(200).json({
      message: "Food updated",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
