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
exports.verifyUser = void 0;
const decodeToken_1 = __importDefault(require("../utils/decodeToken"));
const reissueAccessToken_1 = __importDefault(require("../utils/reissueAccessToken"));
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const accessToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split("Bearer ")[1];
        const refreshToken = req.headers["x-refreshtoken"];
        if (accessToken) {
            const decodedToken = (0, decodeToken_1.default)(accessToken, `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`);
            if (decodedToken.decoded) {
                req.user = decodedToken.decoded;
                return next();
            }
            if (refreshToken && decodedToken.isExpired) {
                const newAccessToken = (0, reissueAccessToken_1.default)(refreshToken);
                if (newAccessToken) {
                    const decodedToken = (0, decodeToken_1.default)(newAccessToken, `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`);
                    req.user = decodedToken.decoded;
                    return next();
                }
            }
            else {
                return res.status(401).json({ isLoginRequired: true, message: "You're unauthenticated! Please login" });
            }
        }
        else {
            return res.status(401).json({ isLoginRequired: true, message: "You're unauthenticated! Please login" });
        }
    }
    else {
        return res.status(401).json({ isLoginRequired: true, message: "Auth header is missing, please login!" });
    }
});
exports.verifyUser = verifyUser;
