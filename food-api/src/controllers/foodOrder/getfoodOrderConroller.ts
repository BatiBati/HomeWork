import { RequestHandler } from "express";
import { foodOrderModel } from "../../models/foodOrder.model";

export const getFoodOrderController: RequestHandler = async (req, res) => {
  const { userId } = req.query;

  try {
    const foodOrder = await foodOrderModel

      .find(userId ? { user: userId } : {})
      .populate("user")
      .populate("foodOrderItems.food");

    res.status(200).json({
      foodOrder,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
