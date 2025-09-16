import dotenv from "dotenv";
dotenv.config();
import { connect } from "mongoose";

export const connectToDataBase = async () => {
  try {
    await connect(process.env.MONGO_URL as string);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};
