import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const getMeUser: RequestHandler = async (req, res) => {
  try {
    const { _id } = (req as any).user;
    const user = await userModel
      .findById(_id)
      .select("-password")
      .populate("children");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "Get me successfully fetched",
      user,
    });
  } catch (error) {
    console.error("GetMe error", error);
    res.status(500).json({ message: "Get me server error", error });
  }
};
