"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editDip = exports.dip = void 0;
const yup_1 = require("yup");
const dip = (0, yup_1.object)({
    type: (0, yup_1.string)()
        .min(5, "Minimum dip typ length must be 5")
        .max(50, "Maximum dip typ length must be 50")
        .required("Dip type is required"),
    price: (0, yup_1.number)()
        .typeError("Please provide a number")
        .min(500, "Minimum price is 500")
        .max(50000, "Maximum price is 50000")
        .required("Price is required"),
    weight: (0, yup_1.number)()
        .typeError("Please provide a number")
        .moreThan(-1, "Dip weight must be greater than 0")
        .lessThan(1000, "Dip weight must less than 1000")
        .required("Dip weight is required"),
    vegan: (0, yup_1.boolean)().
        required("Vegan value is required"),
    categoryId: (0, yup_1.number)().required("Category id is required"),
    calorie: (0, yup_1.number)()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum calorie amount must be 0")
        .lessThan(2000, "Calorie must be less than 2000")
        .required("Calories is required"),
    proteins: (0, yup_1.number)()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum proteins amount must be 0")
        .lessThan(100, "Protein amount must be less than 100")
        .required("Proteins is required"),
    fats: (0, yup_1.number)()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum fats amount must be 0")
        .lessThan(100, "Fat amount must be less than 100")
        .required("Fats is required"),
    carbohydrates: (0, yup_1.number)()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum carbohydrates amount must be 0")
        .lessThan(100, "Carbohydrates amount must be less than 100")
        .required("Carbohydrates is required")
});
exports.dip = dip;
const editDip = (0, yup_1.object)({
    type: (0, yup_1.string)()
        .min(5, "Minimum dip typ length must be 5")
        .min(50, "Minimum dip typ length must be 50"),
    price: (0, yup_1.number)()
        .typeError("Please provide a value")
        .min(500, "Minimum price is 500")
        .max(50000, "Maximum price is 50000"),
    weight: (0, yup_1.number)()
        .typeError("Please provide a value")
        .moreThan(-1, "Dip weight must be greater than 0")
        .lessThan(1000, "Dip weight must less than 1000"),
    vegan: (0, yup_1.boolean)(),
    categoryId: (0, yup_1.number)(),
    calorie: (0, yup_1.number)()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum calorie amount must be 0")
        .lessThan(2000, "Calorie must be less than 2000"),
    proteins: (0, yup_1.number)()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum proteins amount must be 0")
        .lessThan(100, "Protein amount must be less than 100"),
    fats: (0, yup_1.number)()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum fats amount must be 0")
        .lessThan(100, "Fat amount must be less than 100"),
    carbohydrates: (0, yup_1.number)()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum carbohydrates amount must be 0")
        .lessThan(100, "Carbohydrates amount must be less than 100")
});
exports.editDip = editDip;
