import { RequestHandler } from "express";
import { foodOrderModel } from "../../models/foodOrder.model";

export const createFoodOrderController: RequestHandler = async (req, res) => {
  const { user, totalPrice, foodOrderItems, status, deliveryAddress } =
    req.body;
  try {
    await foodOrderModel.create({
      user,
      totalPrice,
      foodOrderItems,
      status,
      deliveryAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({
      message: "Food order created",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
