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
exports.updateUserById = void 0;
const user_model_1 = require("../../models/user.model");
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email, password, firstName, lastName, phoneNumber, role } = req.body;
        const user = yield user_model_1.userModel.findByIdAndUpdate(id, {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            role,
        }, { new: true });
        res.status(200).json({ message: `User updated`, user });
    }
    catch (error) {
        res.status(500).json({ error, message: "Update user server error" });
    }
});
exports.updateUserById = updateUserById;
//# sourceMappingURL=update-user.js.map