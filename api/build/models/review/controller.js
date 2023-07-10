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
const ReviewController = {
    getAllReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield service_1.default.getAllReviews();
            return res.json({ data: reviews });
        });
    },
    getReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const review = yield service_1.default.getReview(id);
            return res.json({ data: review });
        });
    },
    changeReviewStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.changeReviewStatus(id, req.body.status);
            if (statusCode === 404 || statusCode === 400) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ message: "Review status is changed successfully!" });
            }
        });
    },
    deleteReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.deleteReview(id);
            if (statusCode === 404 || statusCode === 400) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).end();
            }
        });
    }
};
exports.default = ReviewController;
