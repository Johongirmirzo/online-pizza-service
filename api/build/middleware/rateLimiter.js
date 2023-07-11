"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMessages = exports.limitApiRequestByHours = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limitApiRequestByHours = (hours, allowedApiRequestWithinTime, message) => (0, express_rate_limit_1.default)({
    windowMs: hours * 60 * 60 * 1000,
    max: allowedApiRequestWithinTime,
    message,
    standardHeaders: true,
    legacyHeaders: false
});
exports.limitApiRequestByHours = limitApiRequestByHours;
exports.rateLimitMessages = {
    customerLogin: (hours) => `Too many login attempts, You can login again in ${hours} hours!`,
    adminLogin: (hours) => `Too many login attempts, You can login again in ${hours} hours!`,
    customerRegister: (hours) => `You've reached ${hours} hourly limit!, You can create a new account in ${hours} hours!`,
    sendMessage: (hours) => `You've exceeded reached ${hours} hourly limit!, You can send message again in ${hours} hours!`
};
