"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const decodeToken = (token, privateKey) => {
    try {
        const { id, name, email, role } = jsonwebtoken_1.default.verify(token, privateKey);
        return {
            decoded: { id, name, email, role },
            isExpired: false
        };
    }
    catch (err) {
        return {
            decoded: null,
            isExpired: err.message === "jwt expired"
        };
    }
};
exports.default = decodeToken;
