import { RequestHandler } from "express";
import { foodModel } from "../../models/food.model";

export const deleteOneFoodController: RequestHandler = async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Food Deleted",
    });
  } catch (error) {
    res.status(500).json({ messege: "Server error", error });
  }
};
