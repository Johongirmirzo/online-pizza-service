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
const service_1 = __importDefault(require("./service"));
const MessageController = {
    getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield service_1.default.getAllMessages();
            return res.json({ data: messages });
        });
    },
    getMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { message, statusCode, error } = yield service_1.default.getMessage(id);
            if (statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: message });
            }
        });
    },
    deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { statusCode, error } = yield service_1.default.deleteMessage(id);
            if (statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).end();
            }
        });
    },
};
exports.default = MessageController;
