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
const review_1 = require("../../types/review");
const ReviewService = {
    getAllReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.review.findMany();
        });
    },
    getReview(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.review.findFirst({ where: { customerId } });
        });
    },
    changeReviewStatus(reviewId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield prisma_1.prisma.review.findUnique({ where: { id: reviewId } });
                if (!review) {
                    return { statusCode: 404, erorr: "Review has not been found" };
                }
                else {
                    yield prisma_1.prisma.review.update({
                        where: { id: reviewId },
                        data: {
                            status: review_1.ReviewStatus[status]
                        }
                    });
                    return { statusCode: 200, erorr: "" };
                }
            }
            catch (err) {
                console.log(err);
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    deleteReview(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield prisma_1.prisma.review.findUnique({ where: { id: reviewId } });
                if (!review) {
                    return { statusCode: 404, erorr: "Review has not been found" };
                }
                else {
                    yield prisma_1.prisma.review.delete({
                        where: { id: reviewId }
                    });
                    return { statusCode: 204, erorr: "" };
                }
            }
            catch (err) {
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    }
};
exports.default = ReviewService;
