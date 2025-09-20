import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const createUserController: RequestHandler = async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, role } = req.body;

  try {
    const user = await userModel.create({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      role,
    });
    res.status(200).json({ message: `User created`, user });
  } catch (error) {
    res.status(500).json({ error, message: "Create user server error" });
  }
};
