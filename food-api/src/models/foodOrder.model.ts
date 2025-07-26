import { Schema, model } from "mongoose";

const foodOrderItemSchema = new Schema({
  food: {
    type: Schema.Types.ObjectId,
    ref: "food",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const foodOrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  foodOrderItems: {
    type: [foodOrderItemSchema],
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "CANCELED", "DELIVERED"],
    default: "PENDING",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export const foodOrderModel = model("foodOrder", foodOrderSchema);
