import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.model";

export const getOneCategoryController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const oneCategory = await categoryModel.findById(id);
    res.status(200).json(oneCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
