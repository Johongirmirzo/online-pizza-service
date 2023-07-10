"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAllowedToAccess = void 0;
const isAllowedToAccess = (req, res, next) => {
    switch (req.user.role) {
        case "ADMIN":
        case "SUB_ADMIN":
            next();
            break;
        default:
            res.status(403).json({ message: "You are not admin or sub admin! You can't access this resource" });
    }
};
exports.isAllowedToAccess = isAllowedToAccess;
