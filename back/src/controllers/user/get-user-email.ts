import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const getUserByEmail: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.find({ email });
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
