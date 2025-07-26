"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodOrderModel = void 0;
const mongoose_1 = require("mongoose");
const foodOrderItemSchema = new mongoose_1.Schema({
    food: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "food",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
const foodOrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.foodOrderModel = (0, mongoose_1.model)("foodOrder", foodOrderSchema);
//# sourceMappingURL=foodOrder.model.js.map