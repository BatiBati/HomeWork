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
exports.getChildrenById = void 0;
const children_models_1 = require("../../models/children.models");
const getChildrenById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const children = (yield children_models_1.childrenModel.findById(id)).populate("parents");
        res.status(200).json({
            message: "All users fetched successfully",
            children,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Create user server error" });
    }
});
exports.getChildrenById = getChildrenById;
//# sourceMappingURL=get-children-id.js.map