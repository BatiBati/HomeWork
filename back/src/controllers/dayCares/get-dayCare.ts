import { RequestHandler } from "express";
import { DaycareModel } from "../../models/day-care.models";

export const getDayCare: RequestHandler = async (req, res) => {
  try {
    const dayCare = await DaycareModel.find({});
    res.status(201).json({
      message: "DayCare fetched successfully",
      dayCare: dayCare,
    });
  } catch (error) {
    console.error("Fetch dayCare error:", error);
    res.status(500).json({ message: "Fetch dayCare server error" });
  }
};
