"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleWare = void 0;
const authorizationMiddleWare = (req, res, next) => {
    const isAdmin = req.isAdmin;
    if (!isAdmin) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    next();
};
exports.authorizationMiddleWare = authorizationMiddleWare;
//# sourceMappingURL=authorization-middleware.js.map