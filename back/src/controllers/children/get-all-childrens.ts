import { RequestHandler } from "express";
import { childrenModel } from "../../models/children.models";

export const getChildrens: RequestHandler = async (req, res) => {
  try {
    const childrens = await childrenModel
      .find({})
      .populate("parents")
      .populate("assignment");
    res.status(200).json({
      message: "All users fetched successfully",
      childrens,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fetch all childrens server error" });
  }
};
