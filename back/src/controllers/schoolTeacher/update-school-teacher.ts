import { RequestHandler } from "express";

export const updateSchoolTeacher: RequestHandler = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error, message: "Create School Teacher Error" });
  }
};
