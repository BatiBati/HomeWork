"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFoodOrderController = void 0;
const foodOrder_model_1 = require("../../models/foodOrder.model");
const updateFoodOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodName, totalPrice, image, ingredients, deliveryAddress, status } = req.body;
    const { id } = req.params;
    try {
        yield foodOrder_model_1.foodOrderModel.findByIdAndUpdate(id, {
            foodName,
            totalPrice,
            image,
            ingredients,
            deliveryAddress,
            status,
        });
        res.status(200).json({
            message: "Food order updated",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.updateFoodOrderController = updateFoodOrderController;
//# sourceMappingURL=updatefoodOrderConroller.js.map