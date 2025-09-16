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
exports.logoutStudentController = void 0;
const logoutStudentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // For JWT tokens, logout is typically handled on the client side
        // by simply removing the token from storage
        // If you need server-side logout, you would implement a token blacklist
        res.status(200).json({
            message: "Logout successful"
        });
    }
    catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            error: "Server error",
            message: "Failed to logout"
        });
    }
});
exports.logoutStudentController = logoutStudentController;
//# sourceMappingURL=logout-student.js.map