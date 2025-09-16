import dotenv from "dotenv";
dotenv.config();
import { connect } from "mongoose";

export const connectToDataBase = async () => {
  try {
    await connect("mongodb+srv://codecatalysts2025_db_user:catalystsadmin123@cluster0.zqrxblc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};
