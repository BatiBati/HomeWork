import { RequestHandler } from "express";
import { foodOrderModel } from "../../models/foodOrder.model";

export const updateFoodOrderController: RequestHandler = async (req, res) => {
  const { foodName, totalPrice, image, ingredients, deliveryAddress, status } =
    req.body;
  const { id } = req.params;
  try {
    await foodOrderModel.findByIdAndUpdate(id, {
      foodName,
      totalPrice,
      image,
      ingredients,
      deliveryAddress,
      status,
    });

    res.status(200).json({
      message: "Food order updated",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
