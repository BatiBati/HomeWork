import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const updateUserController: RequestHandler = async (req, res) => {
    const { email, password, phoneNumber, address, role, orderedFoods, ttl, isVerified } = req.body;
    await userModel.findByIdAndUpdate(req.params.id, {
        email,
        password,
        phoneNumber,
        address,
        role,
        orderedFoods,
        ttl,
        isVerified,
    });
    res.status(200).json({ message: "User updated", });
};