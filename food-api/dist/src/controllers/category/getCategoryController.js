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
exports.getCategoryController = void 0;
const category_model_1 = require("../../models/category.model");
const getCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.query;
    try {
        const category = yield category_model_1.categoryModel.find({ category: categoryId, });
        res.status(200).json({
            category,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getCategoryController = getCategoryController;
//# sourceMappingURL=getCategoryController.js.map