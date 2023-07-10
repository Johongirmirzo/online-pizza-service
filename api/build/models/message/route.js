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
exports.messageHandler = void 0;
const express_1 = require("express");
const prisma_1 = require("../../config/prisma");
const validateReqParamForId_1 = require("../../middleware/validateReqParamForId");
const validations_1 = require("../../validations");
const validateSocketData_1 = require("../../middleware/validateSocketData");
const verifyUser_1 = require("../../middleware/verifyUser");
const isAdmin_1 = require("../../middleware/isAdmin");
const controller_1 = __importDefault(require("./controller"));
const isAllowedToAccess_1 = require("../../middleware/isAllowedToAccess");
const router = (0, express_1.Router)();
const messageHandler = (io, socket) => {
    socket.on("create-message", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield (0, validateSocketData_1.validateSocketData)(validations_1.message, data);
        if (errors) {
            socket.emit("create-message-error", errors);
        }
        else {
            const newMessage = yield prisma_1.prisma.message.create({
                data: Object.assign(Object.assign({}, data), { date: new Date() })
            });
            console.log(newMessage);
            io.emit("new-message", newMessage);
        }
    }));
};
exports.messageHandler = messageHandler;
router.get("/get-all-messages", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, controller_1.default.getAllMessages);
router.get("/get-message/:id", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, validateReqParamForId_1.validateReqParamForId, controller_1.default.getMessage);
router.delete("/delete-message/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.deleteMessage);
exports.default = router;
