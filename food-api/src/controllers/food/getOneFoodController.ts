import { RequestHandler } from "express";
import { foodModel } from "../../models/food.model";

export const getOneFoodController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const oneFood = await foodModel.findById(id).populate("category");
    res.status(200).json(oneFood);
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
};
