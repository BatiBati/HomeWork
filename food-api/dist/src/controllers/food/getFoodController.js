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
exports.getFoodController = void 0;
const food_model_1 = require("../../models/food.model");
const getFoodController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.query;
    try {
        const foods = yield food_model_1.foodModel
            .find(categoryId ? { category: categoryId } : {})
            .populate("category");
        res.status(200).json({ foods });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getFoodController = getFoodController;
//# sourceMappingURL=getFoodController.js.map