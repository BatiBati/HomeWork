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
exports.getFoodOrderController = void 0;
const foodOrder_model_1 = require("../../models/foodOrder.model");
const getFoodOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const foodOrder = yield foodOrder_model_1.foodOrderModel
            .find(userId ? { user: userId } : {})
            .populate("user")
            .populate("foodOrderItems.food");
        res.status(200).json({
            foodOrder,
            message: "Success",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getFoodOrderController = getFoodOrderController;
//# sourceMappingURL=getfoodOrderConroller.js.map