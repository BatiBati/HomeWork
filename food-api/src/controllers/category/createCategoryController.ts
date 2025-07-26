import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.model";

export const createCategoryController: RequestHandler = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const category = await categoryModel.create({
      categoryName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
