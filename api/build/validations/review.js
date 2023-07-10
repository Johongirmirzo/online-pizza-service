"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const review = (0, yup_1.object)({
    reviewSubject: (0, yup_1.string)()
        .matches(/driver|stuff|manager|restaurant|food|other/i)
        .required("Review subject is required"),
    message: (0, yup_1.string)()
        .min(10, "Minimum message length must be 10")
        .max(250, "Maximum message length must be 250")
        .required("Message is required"),
    stars: (0, yup_1.number)()
        .required("Review star is required")
});
exports.default = review;
