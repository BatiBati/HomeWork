import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    required: false,
  },
  orderedFoods: {
    type: [Schema.Types.ObjectId],
    ref: "foodOrder",
    required: false,
  },

  ttl: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

export const userModel = model("user", userSchema);
