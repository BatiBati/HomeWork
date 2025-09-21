import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";
import bcrypt from "bcrypt";

export const createUserController: RequestHandler = async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, role } = req.body;

  if (!email || !password || !firstName || !lastName || !phoneNumber || !role) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const existingUser = await userModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      res.status(409).json({ message: `User with ${email} already exists` });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      firstName: firstName.trim().toLowerCase(),
      lastName: lastName.trim().toLowerCase(),
      phoneNumber: phoneNumber,
      role,
    });

    
    res.status(200).json({ message: `User created`, user });
  } catch (error) {
    res.status(500).json({ error, message: "Create user server error" });
  }
};
