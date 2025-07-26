import { RequestHandler } from "express";
import { foodOrderModel } from "../../models/foodOrder.model";

export const deleteFoodOrderController: RequestHandler = async (req, res) => {

  try {
    await foodOrderModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Food order Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
