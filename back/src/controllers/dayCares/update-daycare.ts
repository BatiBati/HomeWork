import { RequestHandler } from "express";
import { DaycareModel } from "../../models/day-care.models";

export const updateDayCare: RequestHandler = async (req, res) => {
  const { id, email, childrenId } = req.body;

  try {
    const updateDayCare = await DaycareModel.findByIdAndUpdate(
      id,
      {
        email: email,
        $addToSet: { children: childrenId },
      },
      { new: true }
    );

    if (!updateDayCare) {
      res.status(404).json({ message: "Daycare not found" });
      return;
    }

    res.status(200).json({
      message: "Daycare updated successfully",
      daycare: updateDayCare,
    });
  } catch (error) {
    console.error("Update dayCare error:", error);
    res.status(500).json({ message: "Update dayCare server error" });
  }
};
