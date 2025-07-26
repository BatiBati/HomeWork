import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signUp: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const { password: userPassword, ...userWithoutPassword } =
      newUser.toObject();

    const token = jwt.sign(
      {
        userId: newUser._id,
        isAdmin: newUser.role === "ADMIN",
      },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
