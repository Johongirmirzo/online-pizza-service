"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminstrative = void 0;
const isAdminstrative = (req, res, next) => {
    switch (req.user.role) {
        case "ADMIN":
        case "SUB_ADMIN":
        case "DRIVER":
            next();
            break;
        default:
            res.status(403).json({ message: "You are not admin, sub admin or driver! You can't access this resource" });
    }
};
exports.isAdminstrative = isAdminstrative;
