"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserAdmin = void 0;
const isUserAdmin = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        res.status(403).json({ message: "You are not admin! You can't access this resource" });
    }
    else {
        next();
    }
};
exports.isUserAdmin = isUserAdmin;
