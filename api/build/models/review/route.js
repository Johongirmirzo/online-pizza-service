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
exports.reviewHandler = void 0;
const express_1 = require("express");
const validations_1 = require("../../validations");
const validateSocketData_1 = require("../../middleware/validateSocketData");
const prisma_1 = require("../../config/prisma");
const verifyUser_1 = require("../../middleware/verifyUser");
const isAdmin_1 = require("../../middleware/isAdmin");
const validateReqParamForId_1 = require("../../middleware/validateReqParamForId");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
const reviewHandler = (io, socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on("create-review", (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield (0, validateSocketData_1.validateSocketData)(validations_1.review, reviewData);
        if (errors) {
            socket.emit("create-review-errors", errors);
        }
        else {
            yield prisma_1.prisma.review.create({
                data: Object.assign({}, reviewData)
            });
            const latestReviews = yield prisma_1.prisma.review.findMany({ orderBy: { date: "desc" }, take: 5 });
            io.emit("latest-reviews", latestReviews);
        }
    }));
    const latestReviews = yield prisma_1.prisma.review.findMany({ orderBy: { date: "desc" }, take: 5 });
    io.emit("latest-reviews", latestReviews);
});
exports.reviewHandler = reviewHandler;
router.get("/get-all-reviews", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, controller_1.default.getAllReviews);
router.get("/get-review/:id", validateReqParamForId_1.validateReqParamForId, controller_1.default.getReview);
router.patch("/change-review-status/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.changeReviewStatus);
router.delete("/delete-review/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.deleteReview);
exports.default = router;
