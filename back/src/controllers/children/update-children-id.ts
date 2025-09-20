import { RequestHandler } from "express";
import { childrenModel } from "../../models/children-models";

export const updateChildrenById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, profilePicture, parents, grade, school } =
    req.body;
  console.log("Children Id", id);

  try {
    if (!id) {
      res.status(400).json({ message: `Child id not provided` });
      return;
    }

    const updatedChild = await childrenModel.findByIdAndUpdate(
      id,
      { firstName, lastName, profilePicture, parents, grade, school },
      { new: true }
    );

    if (!updatedChild) {
      res.status(404).json({ message: `Child not found with id ${id}` });
      return;
    }

    res.status(200).json({
      message: "Child updated successfully",
      child: updatedChild,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Server error while updating child",
      error: error.message,
    });
  }
};
