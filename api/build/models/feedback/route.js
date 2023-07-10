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
exports.feedbackHandler = void 0;
const express_1 = require("express");
const prisma_1 = require("../../config/prisma");
const verifyUser_1 = require("../../middleware/verifyUser");
const isAdmin_1 = require("../../middleware/isAdmin");
const validateSocketData_1 = require("../../middleware/validateSocketData");
const validations_1 = require("../../validations");
const validateReqParamForId_1 = require("../../middleware/validateReqParamForId");
const feedback_1 = require("../../types/feedback");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
const feedbackHandler = (io, socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on("create-feedback", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield (0, validateSocketData_1.validateSocketData)(validations_1.createFeedbackSchema, data);
        if (errors) {
            socket.emit("create-feedback-errors", errors);
        }
        else {
            const feedbackData = Object.entries(data).filter(d => d[0] !== "feedbackTypeData").reduce((obj, el) => {
                return Object.assign(Object.assign({}, obj), { [el[0]]: el[1] });
            }, {});
            if (feedbackData.type === "DINE_IN") {
                const newFeedback = yield prisma_1.prisma.feedback.create({
                    data: Object.assign(Object.assign({}, feedbackData), { gender: feedback_1.Gender[feedbackData.gender], dineInFeedbacks: {
                            create: Object.assign(Object.assign({}, data.feedbackTypeData), { dateOfVisit: new Date(data.feedbackTypeData.dateOfVisit), visitAmount: data.feedbackTypeData.visitAmount })
                        } })
                });
                io.emit("new-feedback", newFeedback);
            }
            if (feedbackData.type === "DELIVERY") {
                const newFeedback = yield prisma_1.prisma.feedback.create({
                    data: Object.assign(Object.assign({}, feedbackData), { gender: feedback_1.Gender[feedbackData.gender], deliveryFeedbacks: {
                            create: Object.assign(Object.assign({}, data.feedbackTypeData), { dateOfOrder: new Date(data.feedbackTypeData.dateOfOrder), feedbackOn: data.feedbackTypeData.feedbackOn })
                        } })
                });
                io.emit("new-feedback", newFeedback);
            }
        }
    }));
});
exports.feedbackHandler = feedbackHandler;
router.get("/get-all-feedbacks", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, controller_1.default.getAllFeedbacks);
router.get("/get-feedback/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.getFeedback);
router.patch("/change-feedback-status/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.changeFeedbackStatus);
router.delete("/delete-feedback/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.deleteFeedback);
exports.default = router;
