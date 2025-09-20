import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("children");
    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
