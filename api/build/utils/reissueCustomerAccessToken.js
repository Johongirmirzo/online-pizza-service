"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateToken_1 = require("./generateToken");
const decodeCustomerToken_1 = __importDefault(require("./decodeCustomerToken"));
const reissueCustomerAccessToken = (token) => {
    const { REFRESH_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_EXPIRATION_TIME, } = process.env;
    const { decoded } = (0, decodeCustomerToken_1.default)(token, `${REFRESH_TOKEN_PRIVATE_KEY}`);
    if (!decoded) {
        return false;
    }
    const accessToken = (0, generateToken_1.generateToken)(decoded, `${ACCESS_TOKEN_PRIVATE_KEY}`, `${ACCESS_TOKEN_EXPIRATION_TIME}`);
    return accessToken;
};
exports.default = reissueCustomerAccessToken;
