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
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
const MessageService = {
    getAllMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.message.findMany({ orderBy: [{ date: 'desc' }] });
        });
    },
    getMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield prisma_1.prisma.message.findUnique({
                    where: { id: messageId },
                });
                if (!message) {
                    return {
                        message: null,
                        statusCode: 404,
                        error: 'Message has not been found!',
                    };
                }
                else {
                    return { message, statusCode: 200, error: '' };
                }
            }
            catch (err) {
                return { message: null, statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    deleteMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield prisma_1.prisma.message.findUnique({
                    where: { id: messageId },
                });
                if (!message) {
                    return { statusCode: 404, error: 'Message has not been found!' };
                }
                else {
                    yield prisma_1.prisma.message.delete({ where: { id: messageId } });
                    return { statusCode: 204, error: '' };
                }
            }
            catch (err) {
                return { statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
};
exports.default = MessageService;
