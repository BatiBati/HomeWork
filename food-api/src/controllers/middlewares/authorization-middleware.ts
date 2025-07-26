import { RequestHandler } from "express";

export const authorizationMiddleWare: RequestHandler = (req, res, next) => {
  const isAdmin = req.isAdmin;

  if (!isAdmin) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
};
