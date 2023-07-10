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
exports.UserController = void 0;
const service_1 = __importDefault(require("./service"));
const generateToken_1 = require("../../utils/generateToken");
const token_1 = require("../../types/token");
const UserController = {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email: userEmail, password } = req.body;
                const { user, statusCode, error } = yield service_1.default.loginUser(userEmail, password);
                if (statusCode === 400 || statusCode === 404) {
                    return res.status(statusCode).json({ errors: error });
                }
                else {
                    if (user) {
                        const { id, name, email } = user;
                        console.log(user);
                        const { ACCESS_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_EXPIRATION_TIME } = process.env;
                        const accessToken = (0, generateToken_1.generateToken)({ id, name, email, role: token_1.Role[user.role] }, `${ACCESS_TOKEN_PRIVATE_KEY}`, `${ACCESS_TOKEN_EXPIRATION_TIME}`);
                        const refreshToken = (0, generateToken_1.generateToken)({ id, name, email, role: token_1.Role[user.role] }, `${REFRESH_TOKEN_PRIVATE_KEY}`, `${REFRESH_TOKEN_EXPIRATION_TIME}`);
                        res.status(statusCode).json({ data: { accessToken, refreshToken, user } });
                    }
                }
            }
            catch (err) {
                res.status(400).json({ errors: err.message });
            }
        });
    },
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield service_1.default.getAllUsers();
                return res.json({ data: users });
            }
            catch (err) {
                res.status(400).json({ errors: err.message });
            }
        });
    },
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { user, statusCode, error } = yield service_1.default.getUser(id, req.user);
            if (statusCode === 404 || statusCode === 400 || statusCode === 403) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: user });
            }
        });
    },
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUser, statusCode, error } = yield service_1.default.createNewUser(req.body, req.file);
            if (statusCode === 400 || statusCode === 409) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: newUser });
            }
        });
    },
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            console.log({ id });
            const { user, statusCode, error } = yield service_1.default.editUser(id, req.body, req.file);
            if (statusCode === 409 || statusCode === 400) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: user });
            }
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.deleteUserService(id);
            if (statusCode === 400 || statusCode === 404 || statusCode === 403) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).end();
            }
        });
    },
    changeUserStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.changeUserStatus(id, req.body.status);
            if (statusCode === 400 || statusCode === 404 || statusCode === 403) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ message: "User status is updated successfully!" });
            }
        });
    },
};
exports.UserController = UserController;
