import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const createUserController: RequestHandler = async (req, res) => {
  const {
    email,

  } = req.body;

  try {
    const user = await userModel.create({
      email,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    res.status(200).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
};
