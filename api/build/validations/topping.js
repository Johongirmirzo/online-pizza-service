"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTopping = exports.topping = void 0;
const yup_1 = require("yup");
const topping = (0, yup_1.object)({
    type: (0, yup_1.string)()
        .matches(/standard|extra/i, "Topping type must be [STANDARD], or [EXTRA]")
        .required("Topping type is required"),
    forPizzaSize: (0, yup_1.string)()
        .matches(/small|medium|large/i, "Pizza size must be [SMALL], [MEDIUM], or [LARGE]")
        .required("Pizza size is required"),
    name: (0, yup_1.string)()
        .min(2, "Minimum topping name length must be 2")
        .max(25, "Maximum topping name length must be 25")
        .required("Topping name is required"),
    light: (0, yup_1.number)()
        .min(0, "Minimum light topping price is 0")
        .max(100000, "Maximum light topping price is 100000")
        .required("Light topping is required"),
    standard: (0, yup_1.number)()
        .min(0, "Minimum standard topping price is 0")
        .max(100000, "Maximum standard topping price is 100000")
        .required("Standard topping is required"),
    double: (0, yup_1.number)()
        .min(0, "Minimum double topping price is 0")
        .max(100000, "Maximum double topping price is 100000")
        .required("Double topping is required"),
    extra: (0, yup_1.number)()
        .min(0, "Minimum extra topping price is 0")
        .max(100000, "Maximum extra topping price is 100000")
        .required("Extra topping is required"),
});
exports.topping = topping;
const editTopping = (0, yup_1.object)({
    type: (0, yup_1.string)()
        .matches(/standard|extra/i, "Topping type must be [STANDARD], or [EXTRA]"),
    forPizzaSize: (0, yup_1.string)()
        .matches(/small|medium|large/i, "Pizza size must be [SMALL], [MEDIUM], or [LARGE]"),
    name: (0, yup_1.string)()
        .min(2, "Minimum topping name length must be 2")
        .max(25, "Maximum topping name length must be 25"),
    light: (0, yup_1.number)()
        .min(0, "Minimum light topping price is 0")
        .max(100000, "Maximum light topping price is 100000"),
    standard: (0, yup_1.number)()
        .min(0, "Minimum standard topping price is 0")
        .max(100000, "Maximum standard topping price is 100000"),
    double: (0, yup_1.number)()
        .min(0, "Minimum double topping price is 0")
        .max(100000, "Maximum double double price is 100000"),
    extra: (0, yup_1.number)()
        .min(0, "Minimum extra topping price is 0")
        .max(100000, "Maximum extra topping price is 100000"),
});
exports.editTopping = editTopping;
