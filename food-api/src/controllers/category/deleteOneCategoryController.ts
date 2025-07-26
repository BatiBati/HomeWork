import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.model";

export const deleteOneCategoryController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCategory = await categoryModel.findByIdAndDelete(id, {
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "Deleted", deleteCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
