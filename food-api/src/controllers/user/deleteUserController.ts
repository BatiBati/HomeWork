import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const deleteUserController: RequestHandler = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ messege: "Server error", error });
  }
};
