import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.model";

export const getCategoryController: RequestHandler = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const category = await categoryModel.find({ category: categoryId, });
    res.status(200).json({
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
