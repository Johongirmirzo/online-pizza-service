import {object, string, number} from "yup";

const createToppingData = object({
    type:
        string()
        .matches(/standard|extra/i, "Topping type must be [STANDARD], or [EXTRA]")
        .required("Topping type is required"),   
    forPizzaSize:
        string()
        .matches(/small|medium|large/i, "Pizza size must be [SMALL], [MEDIUM], or [LARGE]")
        .required("Pizza size is required"),
    name:
        string()
        .min(2, "Minimum topping name length must be 2")
        .max(25, "Maximum topping name length must be 25")
        .required("Topping name is required"),
    light:
        number()
        .typeError("Please provide a value")
        .min(0, "Minimum light topping price is 0")
        .max(100000, "Maximum light topping price is 100000")
        .required("Light topping is required"),
    standard:
        number()
        .typeError("Please provide a value")
        .min(0, "Minimum standard topping price is 0")
        .max(100000, "Maximum standard topping price is 100000")
        .required("Standard topping is required"),
    double:
        number()
        .typeError("Please provide a value")
        .min(0, "Minimum double topping price is 0")
        .max(100000, "Maximum double topping price is 100000")
        .required("Double topping is required"),
    extra:
        number()
        .typeError("Please provide a value")
        .min(0, "Minimum extra topping price is 0")
        .max(100000, "Maximum extra topping price is 100000")
        .required("Extra topping is required"),
})

const editToppingData = object({
    type:
        string()
        .matches(/standard|extra/i, "Topping type must be [STANDARD], or [EXTRA]"),   
    forPizzaSize:
        string()
        .matches(/small|medium|large/i, "Pizza size must be [SMALL], [MEDIUM], or [LARGE]"),
    name:
        string()
        .min(2, "Minimum topping name length must be 2")
        .max(25, "Maximum topping name length must be 25"),
    light:
        number()
        .typeError("Please provide a value")
        .min(0, "Minimum light topping price is 0")
        .max(100000, "Maximum light topping price is 100000"),
    standard:
        number()
        .typeError("Please provide a value")
        .min(0, "Minimum standard topping price is 0")
        .max(100000, "Maximum standard topping price is 100000"),
    double:
        number()
        .typeError("Please provide a value")
        .min(0, "Minimum double topping price is 0")
        .max(100000, "Maximum double double price is 100000"),
    extra:
        number()
        .typeError("Please provide a value")
        .min(0, "Minimum extra topping price is 0")    
        .max(100000, "Maximum extra topping price is 100000"),
})


export {
    createToppingData,
    editToppingData,
}