import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({
      email: email.trim().toLowerCase(),
    });
    if (!user) {
      res.status(404).json({ message: `User with ${email} not found` });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid password or email" });
      return;
    }

    const token = jwt.sign(
      { _id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ message: "Successfully logged in", token, user });
  } catch (error) {
    console.log("Login error", error);
    res.status(500).json({ message: "Login server error" });
  }
};
