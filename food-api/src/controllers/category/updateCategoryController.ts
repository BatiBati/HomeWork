import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.model";
import { now } from "mongoose";

export const updateCategoryController: RequestHandler = async (req, res) => {
  const { updatedCategoryName } = req.body;
  const { id } = req.params;

  try {
    const category = await categoryModel.findByIdAndUpdate(id, {
      categoryName: updatedCategoryName,
      updatedAt: new Date(),
    });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
