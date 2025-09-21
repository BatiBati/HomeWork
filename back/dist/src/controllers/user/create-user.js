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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = void 0;
const user_model_1 = require("../../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName, phoneNumber, role } = req.body;
    if (!email || !password || !firstName || !lastName || !phoneNumber || !role) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    try {
        const existingUser = yield user_model_1.userModel.findOne({
            email: email.trim().toLowerCase(),
        });
        if (existingUser) {
            res.status(409).json({ message: `User with ${email} already exists` });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_model_1.userModel.create({
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            firstName: firstName.trim().toLowerCase(),
            lastName: lastName.trim().toLowerCase(),
            phoneNumber: phoneNumber,
            role,
        });
        res.status(200).json({ message: `User created`, user });
    }
    catch (error) {
        res.status(500).json({ error, message: "Create user server error" });
    }
});
exports.createUserController = createUserController;
//# sourceMappingURL=create-user.js.map