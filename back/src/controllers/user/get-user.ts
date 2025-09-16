import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const getAllUsersController: RequestHandler = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json({
            message: "All users fetched successfully",
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error,
        });
    }
};
