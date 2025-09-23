import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const getUserByEmail: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body as { email?: string };
    const query = (email || "").trim();
    const filter: any = {
      role: "parents",
    };
    if (query) {
      filter.email = { $regex: query, $options: "i" };
    }

    const user = await userModel
      .find(filter)
      .select("email firstName lastName");

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
