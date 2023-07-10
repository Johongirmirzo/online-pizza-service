"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCategory = exports.category = void 0;
const yup_1 = require("yup");
const category = (0, yup_1.object)({
    name: (0, yup_1.string)()
        .min(3, "Minimum category length must be 3")
        .max(50, "Maximum category length must be 50")
        .required("Category name is required!"),
    description: (0, yup_1.string)()
        .min(10, "Minimum description length must be 10")
        .max(150, "Maximum description length must be 150")
        .required("Category description is required!"),
});
exports.category = category;
const editCategory = (0, yup_1.object)({
    name: (0, yup_1.string)()
        .min(3, "Minimum category length must be 3")
        .max(50, "Maximum category length must be 50"),
    description: (0, yup_1.string)()
        .min(10, "Minimum description length must be 10")
        .max(150, "Maximum description length must be 150")
});
exports.editCategory = editCategory;
