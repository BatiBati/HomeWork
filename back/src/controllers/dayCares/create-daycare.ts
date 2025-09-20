import { RequestHandler } from "express";
import { DaycareModel } from "../../models/day-care.models";
import { childrenModel } from "../../models/children.models";

export const createDayCare: RequestHandler = async (req, res) => {
  const { email, children } = req.body;

  const foundChildren = await childrenModel.findById(children);
  if (!children) {
    res.status(404).json({ message: `Children with ${children} not found ` });
    return;
  }

  try {
    const dayCare = await DaycareModel.create({
      email: email,
      children: [foundChildren],
    });
    res.status(201).json({
      message: "DayCare created successfully",
      dayCare: dayCare,
    });
  } catch (error) {
    console.error("Create dayCare error:", error);
    res.status(500).json({ message: "Create dayCare server error" });
  }
};
