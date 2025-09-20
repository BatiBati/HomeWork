import { RequestHandler } from "express";

export const createSchoolTeacher: RequestHandler = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error, message: "Create School Teacher Error" });
  }
};
