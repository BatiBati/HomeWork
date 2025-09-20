import { RequestHandler } from "express";
import { childrenModel } from "../../models/children.models";

export const getChildrenById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const children = (await childrenModel.findById(id)).populate("parents");
    res.status(200).json({
      message: "All users fetched successfully",
      children,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Create user server error" });
  }
};
