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
exports.getOneCategoryController = void 0;
const category_model_1 = require("../../models/category.model");
const getOneCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const oneCategory = yield category_model_1.categoryModel.findById(id);
        res.status(200).json(oneCategory);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getOneCategoryController = getOneCategoryController;
//# sourceMappingURL=getOneCategoryController.js.map