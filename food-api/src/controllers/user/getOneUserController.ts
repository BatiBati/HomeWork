import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const getOneUserController: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
