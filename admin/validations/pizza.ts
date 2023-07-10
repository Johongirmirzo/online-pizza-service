import {object, array, string, number, boolean } from "yup";


const pizzaSizeCreateData = object({
    size: 
        string()
        .matches(/small|medium|large/i, "Please choose one of the pizza sizes")
        .required("Pizza size is required!"),
    price: 
        number()
        .min(5000, "Minimum price must be 5000")
        .max(1000000, "Maximum price must be 1000000")
        .required("Pizza price is required!"),
    photo: 
        string()
        .required("Pizza photo is required!"),
    circumfarance: 
        number()
        .typeError("Please provide a pizza circumfarance")
        .min(10, "Minimum pizza circumfarance must be 10cm")
        .max(100, "Maximum pizza circumfarance must be 100cm")
        .required("Pizza circumfarance is required!"),
    weight: 
        number()
        .min(100, "Minimum pizza weight must be 100gramm")
        .max(1000, "Maximum pizza weight must be 1kg")
        .required("Pizza weight is required"),
    nutritionalValue: object({
        calories: 
            number()
            .typeError("Please provide a number")
            .moreThan(-1, "Minimum calories amount must be 0")
            .lessThan(2000, "Calories must be less than 2000")
            .required("Menu item calories amount is required"),
        proteins: 
            number()
            .typeError("Please provide a number")
            .moreThan(-1, "Minimum proteins amount must be 0")
            .lessThan(100, "Protein amount must be less than 100")
            .required("Menu item proteins amount is required"),
        fats: 
            number()
            .typeError("Please provide a number")
            .moreThan(-1, "Minimum fats amount must be 0")
            .lessThan(100, "Fat amount must be less than 100")
            .required("Menu item fats amount is required"),
        carbohydrates: 
            number()
            .typeError("Please provide a number")
            .moreThan(-1, "Minimum carbohydrates amount must be 0")
            .lessThan(100, "Carbohydrates amount must be less than 100")
            .required("Menu item carbohydrates amount is required"),
    }),
    slices: object({
        regularCut: 
            number()
            .typeError("Please provide a regular cut amount")
            .min(4, "Minimum regular cut amount must be 4")
            .max(8, "Maximum regular cut amount must be 8")
            .required("Regular cut is required!"),
        doubleCut: 
            number()
            .typeError("Please provide a double cut amount")
            .min(8, "Minimum double cut amount must be 8")
            .max(16, "Maximum double cut amount must be 16")
            .required("Double cut is required!"),
        squareCut: 
            number()
            .typeError("Please provide a square cut amount")
            .min(9, "Minimum square cut amount must be 9")
            .max(18, "Maximum square cut amount must be 18")
            .required("Square cut is required!"),
    }),
    crusts: object({
        classicCrust: 
            number()
            .typeError("Please provide a square classic crust price")
            .min(0, "Minimum classic crust price must be 0")
            .max(0, "Maximum classic crust price must be 0")
            .required("Classic crust is required!"),
        thinCrust: 
            number()
            .typeError("Please provide a thin crust price")
            .min(0, "Minimum thin crust price must be 0")
            .max(0, "Maximum thin crust price must be 0")
            .required("Thin crust is required!"),
        thinnestCrust: 
            number()
            .typeError("Please provide a thinnest crust price")
            .min(0, "Minimum thinnest crust price must be 0")
            .max(0, "Maximum thinnest crust price must be 0"),
        duplexCrustMozarella: 
            number()
            .typeError("Please provide a thin crust price")
            .min(5000, "Minimum thin crust price must be 5000")
            .max(15000, "Maximum thin crust price must be 15000"),
        duplexCrustCheddar: 
            number()
            .typeError("Please provide a thin crust price")
            .min(5000, "Minimum thin crust price must be 5000")
            .max(15000, "Maximum thin crust price must be 15000"),
    }),
    edges: object({
        mozarellaEdge: 
            number()
            .typeError("Please provide a mozarella edge price")
            .min(5000, "Minimum mozarella edge price must be 5000")
            .max(15000, "Maximum mozarella edge price must be 15000")
            .required("Mozarella edge is required!"),
        saucageEdge: 
            number()
            .typeError("Please provide a sausage edge price")
            .min(5000, "Minimum sausage edge price must be 5000")
            .max(15000, "Maximum sausage edge price must be 15000")
            .required("Sausage edge is required!"),
        parmesanEdge: 
            number()
            .typeError("Please provide a parmesan edge price")
            .min(5000, "Minimum parmesan edge price must be 5000")
            .max(20000, "Maximum parmesan edge price must be 20000"),
        garlicSaucageEdge: 
            number()
            .typeError("Please provide a garlic sausage edge price")
            .min(5000, "Minimum garlic sausage edge price must be 5000")
            .max(20000, "Maximum garlic sausage edge price must be 20000"),
    }),
    standardToppings: array(),
    extraToppings: array(),
})

const createPizzaData = object({
    name: 
        string()
        .min(5, "Minimum pizza name length must be 5")
        .max(35, "Maximum pizza name length must be 35")
        .required("Pizza name is required!"),
    vegan: 
        boolean()
        .required("Vegan value is required!"),
    spiceLevel: 
        string()
        .matches(/not_spicy|mild|hot/i, "Please choose one of the spice options")
        .required("Spice level is required!"),
    categoryId: 
        number()
        .required("Category is required!"),
    pizzaSizes: array().of(pizzaSizeCreateData)
})



const pizzaSizeEditData = object({
    size: 
        string()
        .matches(/small|medium|large/i, "Please choose one of the pizza sizes"),
    price: 
        number()
        .min(5000, "Minimum price must be 5000")
        .max(1000000, "Maximum price must be 1000000"),
    photo: 
        string(),
    circumfarance: 
        number()
        .typeError("Please provide a pizza circumfarance")
        .min(10, "Minimum pizza circumfarance must be 10cm")
        .max(100, "Maximum pizza circumfarance must be 100cm"),
    weight: 
        number()
        .min(100, "Minimum pizza weight must be 100gramm")
        .max(1000, "Maximum pizza weight must be 1kg"),
    nutritionalValue: object({
        calories: 
            number()
            .typeError("Please provide a number")
            .moreThan(-1, "Minimum calories amount must be 0")
            .lessThan(2000, "Calories must be less than 2000"),
        proteins: 
            number()
            .typeError("Please provide a number")
            .moreThan(-1, "Minimum proteins amount must be 0")
            .lessThan(100, "Protein amount must be less than 100"),
        fats: 
            number()
            .typeError("Please provide a number")
            .moreThan(-1, "Minimum fats amount must be 0")
            .lessThan(100, "Fat amount must be less than 100"),
        carbohydrates: 
            number()
            .typeError("Please provide a number")
            .moreThan(-1, "Minimum carbohydrates amount must be 0")
            .lessThan(100, "Carbohydrates amount must be less than 100"),
    }),
    slices: object({
        regularCut: 
            number()
            .typeError("Please provide a regular cut amount")
            .min(4, "Minimum regular cut amount must be 4")
            .max(8, "Maximum regular cut amount must be 8"),
        doubleCut: 
            number()
            .typeError("Please provide a double cut amount")
            .min(8, "Minimum double cut amount must be 8")
            .max(16, "Maximum double cut amount must be 16"),
        squareCut: 
            number()
            .typeError("Please provide a square cut amount")
            .min(9, "Minimum square cut amount must be 9")
            .max(18, "Maximum square cut amount must be 18"),
    }),
    crusts: object({
        classicCrust: 
            number()
            .typeError("Please provide a square classic crust price")
            .min(0, "Minimum classic crust price must be 0")
            .max(0, "Maximum classic crust price must be 0"),
        thinCrust: 
            number()
            .typeError("Please provide a thin crust price")
            .min(0, "Minimum thin crust price must be 0")
            .max(0, "Maximum thin crust price must be 0"),
        thinnestCrust: 
            number()
            .typeError("Please provide a thinnest crust price")
            .min(0, "Minimum thinnest crust price must be 0")
            .max(0, "Maximum thinnest crust price must be 0"),
        duplexCrustMozarella: 
            number()
            .typeError("Please provide a thin crust price")
            .min(5000, "Minimum thin crust price must be 5000")
            .max(15000, "Maximum thin crust price must be 15000"),
        duplexCrustCheddar: 
            number()
            .typeError("Please provide a thin crust price")
            .min(5000, "Minimum thin crust price must be 5000")
            .max(15000, "Maximum thin crust price must be 15000"),
    }),
    edges: object({
        mozarellaEdge: 
            number()
            .typeError("Please provide a mozarella edge price")
            .min(5000, "Minimum mozarella edge price must be 5000")
            .max(15000, "Maximum mozarella edge price must be 15000"),
        saucageEdge: 
            number()
            .typeError("Please provide a sausage edge price")
            .min(5000, "Minimum sausage edge price must be 5000")
            .max(15000, "Maximum sausage edge price must be 15000"),
        parmesanEdge: 
            number()
            .typeError("Please provide a parmesan edge price")
            .min(5000, "Minimum parmesan edge price must be 5000")
            .max(20000, "Maximum parmesan edge price must be 20000"),
        garlicSaucageEdge: 
            number()
            .typeError("Please provide a garlic sausage edge price")
            .min(5000, "Minimum garlic sausage edge price must be 5000")
            .max(20000, "Maximum garlic sausage edge price must be 20000"),
    }),
    standardToppings: array(),
    extraToppings: array(),
})

const editPizzaData = object({
    name: 
        string()
        .min(5, "Minimum pizza name length must be 5")
        .max(35, "Maximum pizza name length must be 35"),
    vegan: 
        boolean()
        .typeError("Please choose one of choices"),
    spiceLevel: 
        string()
        .matches(/not_spicy|mild|hot/i, "Please choose one of the spice options"),
    categoryId: 
        number()
        .required("Category is required!"),
    pizzaSizes: array().of(pizzaSizeEditData)
})


export {
    createPizzaData,
    editPizzaData
}
 