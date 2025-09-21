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
exports.getChildrens = void 0;
const children_models_1 = require("../../models/children.models");
const getChildrens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const childrens = yield children_models_1.childrenModel
            .find({})
            .populate("parents")
            .populate("assignment");
        res.status(200).json({
            message: "All users fetched successfully",
            childrens,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Fetch all childrens server error" });
    }
});
exports.getChildrens = getChildrens;
//# sourceMappingURL=get-all-childrens.js.map