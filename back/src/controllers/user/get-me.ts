import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const getMe: RequestHandler = async (req, res) => {
  try {
    // authMiddleware should attach userId to req.user or req.body
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await userModel
      .findById(userId)
      .select("-password") // exclude password
      .populate("children"); // populate children if needed

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching user" });
  }
};
