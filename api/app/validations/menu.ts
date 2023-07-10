import {object, string, number, boolean} from "yup";

const dip = object({
    type: 
        string()
        .min(5, "Minimum dip typ length must be 5")
        .max(50, "Maximum dip typ length must be 50")
        .required("Dip type is required"),
    price: 
        number()
        .typeError("Please provide a number")
        .min(500, "Minimum price is 500")
        .max(50000, "Maximum price is 50000")
        .required("Price is required"),
    weight: 
        number()
        .typeError("Please provide a number")
        .moreThan(-1, "Dip weight must be greater than 0")
        .lessThan(1000, "Dip weight must less than 1000")
        .required("Dip weight is required"),
    vegan:
        boolean().
        required("Vegan value is required"),
    categoryId: number().required("Category id is required"),
    calorie: 
        number()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum calorie amount must be 0")
        .lessThan(2000, "Calorie must be less than 2000")
        .required("Calories is required"),
    proteins: 
        number()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum proteins amount must be 0")
        .lessThan(100, "Protein amount must be less than 100")
        .required("Proteins is required"),
    fats: 
        number()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum fats amount must be 0")
        .lessThan(100, "Fat amount must be less than 100")
        .required("Fats is required"),
    carbohydrates: 
        number()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum carbohydrates amount must be 0")
        .lessThan(100, "Carbohydrates amount must be less than 100")
        .required("Carbohydrates is required")
});
const editDip = object({
    type: 
        string()
        .min(5, "Minimum dip typ length must be 5")
        .min(50, "Minimum dip typ length must be 50"),
    price: 
        number()
        .typeError("Please provide a value")
        .min(500, "Minimum price is 500")
        .max(50000, "Maximum price is 50000"),
    weight: 
        number()
        .typeError("Please provide a value")
        .moreThan(-1, "Dip weight must be greater than 0")
        .lessThan(1000, "Dip weight must less than 1000"),
    vegan:
        boolean(),
    categoryId: number(),
    calorie: 
        number()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum calorie amount must be 0")
        .lessThan(2000, "Calorie must be less than 2000"),
    proteins: 
        number()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum proteins amount must be 0")
        .lessThan(100, "Protein amount must be less than 100"),
    fats: 
        number()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum fats amount must be 0")
        .lessThan(100, "Fat amount must be less than 100"),
    carbohydrates: 
        number()
        .typeError("Please provide a value")
        .moreThan(-1, "Minimum carbohydrates amount must be 0")
        .lessThan(100, "Carbohydrates amount must be less than 100")
});

export {dip, editDip}