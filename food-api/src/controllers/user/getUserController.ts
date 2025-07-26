import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const getUserController: RequestHandler = async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await userModel
      .find(userId ? { user: userId } : {})
      .populate("orderedFoods");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
