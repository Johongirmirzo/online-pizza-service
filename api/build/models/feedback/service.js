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
const feedback_1 = require("../../types/feedback");
const FeedbackService = {
    getAllFeedbacks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.feedback.findMany({ include: { dineInFeedbacks: true, deliveryFeedbacks: true }, orderBy: [{ created: "desc" }] });
        });
    },
    getFeedback(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feedback = yield prisma_1.prisma.feedback.findUnique({ where: { id }, include: { dineInFeedbacks: true, deliveryFeedbacks: true } });
                return feedback ? { feedback, statusCode: 200, error: "" } : { feedback: null, statusCode: 404, error: "Feedback not found!" };
            }
            catch (err) {
                return { feedback: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    changeFeedbackStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feedback = yield prisma_1.prisma.feedback.findUnique({ where: { id } });
                if (!feedback) {
                    return { statusCode: 404, error: "Feedback's not been found" };
                }
                else {
                    yield prisma_1.prisma.feedback.update({
                        where: { id },
                        data: {
                            status: feedback_1.FeedbackStatus[status]
                        }
                    });
                    return { statusCode: 200, error: "" };
                }
            }
            catch (err) {
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    deleteFeedback(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feedback = yield prisma_1.prisma.feedback.findUnique({ where: { id } });
                if (!feedback) {
                    return { statusCode: 404, error: "Feedback's not been found" };
                }
                else {
                    yield prisma_1.prisma.feedback.delete({ where: { id } });
                    return { statusCode: 204, error: "" };
                }
            }
            catch (err) {
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
};
exports.default = FeedbackService;
