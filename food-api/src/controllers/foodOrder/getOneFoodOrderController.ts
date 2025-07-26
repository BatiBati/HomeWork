import { RequestHandler } from "express";
import { foodOrderModel } from "../../models/foodOrder.model";

export const getOneFoodOrderController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const oneFoodOrder = await foodOrderModel
      .findById(id)
      .populate("foodOrderItems.food");
    res.status(200).json({ oneFoodOrder });
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
};
