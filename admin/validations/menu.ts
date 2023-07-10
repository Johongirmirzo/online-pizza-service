import {object, string, number, boolean, array} from "yup";

const createDipData = object({
    type: 
        string()
        .min(5, "Minimum dip type length must be 5")
        .max(50, "Maximum dip type length must be 50")
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
        .moreThan(0, "Dip weight must be greater than 0")
        .lessThan(1000, "Dip weight must less than 1000")
        .required("Dip weight is required"),
    vegan:
        boolean().
        required("Vegan value is required"),
    'dip-photo':
        string()
        .required("Dip photo is required!"),
    categoryId:
        string()
        .required("Category id is required!"),
    calorie: 
        number()
        .typeError("Please provide a number")
        .moreThan(-1, "Minimum calorie amount must be 0")
        .lessThan(2000, "Calorie must be less than 2000")
        .required("Calories is required"),
    proteins: 
        number()
        .typeError("Please provide a number")
        .moreThan(-1, "Minimum proteins amount must be 0")
        .lessThan(100, "Protein amount must be less than 100")
        .required("Proteins is required"),
    fats: 
        number()
        .typeError("Please provide a number")
        .moreThan(-1, "Minimum fats amount must be 0")
        .lessThan(100, "Fat amount must be less than 100")
        .required("Fats is required"),
    carbohydrates: 
        number()
        .typeError("Please provide a number")
        .moreThan(-1, "Minimum carbohydrates amount must be 0")
        .lessThan(100, "Carbohydrates amount must be less than 100")
        .required("Carbohydrates is required")
     
});
const editDipData = object({
    type: 
        string()
        .min(5, "Minimum dip type length must be 5")
        .max(50, "Maximum dip type length must be 50"),
    price: 
        number()
        .typeError("Please provide a number")
        .min(500, "Minimum price is 500")
        .max(50000, "Maximum price is 50000"),
    weight: 
        number()
        .typeError("Please provide a number")
        .moreThan(0, "Dip weight must be greater than 0")
        .lessThan(1000, "Dip weight must less than 1000"),
    vegan:
        boolean(),
    'dip-photo':
        string(),
    categoryId: number(),
    calorie: 
        number()
        .typeError("Please provide a number")
        .moreThan(-1, "Minimum calorie amount must be 0")
        .lessThan(2000, "Calorie must be less than 2000"),
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
        .lessThan(100, "Carbohydrates amount must be less than 100")
});

const menuItemPieceCreateData = object({
    size: 
        string()
        .matches(/small|medium|large/i, "Please choose a menu item size")
        .required("Menu item size is required!"),
    amount: 
        string()
        .required("Menu item amount is required!"),
    price: 
        number()
        .typeError("Please provide a number")
        .min(1000, "Minimum menu item price is 1000")
        .max(100000, "Maximum menu item price is 100000")
        .required("Menu item price is required"),
    weight: 
        number()
        .typeError("Please provide a number")
        .min(25, "Minimum menu item weight is 25")
        .max(2000, "Maximum menu item weight is 2000")
        .required("Menu item weight is required"),
    photo:
        string()
        .required("Menu item photo is required"),
})
const menuItemPieceEditData = object({
    size: 
        string()
        .matches(/small|medium|large/i, "Please choose a menu item size")
        .required("Menu item size is required!"),
    amount: 
        string()
        .required("Menu item amount is required!"),
    price: 
        number()
        .typeError("Please provide a number")
        .min(1000, "Minimum menu item price is 1000")
        .max(100000, "Maximum menu item price is 100000")
        .required("Menu item price is required"),
    weight: 
        number()
        .typeError("Please provide a number")
        .min(25, "Minimum menu item weight is 25")
        .max(2000, "Maximum menu item weight is 2000")
        .required("Menu item weight is required"),
    photo:
        string()
        .required("Menu item photo is required"),
})

const createMenuItemData = object({
    name:
        string()
        .min(4, "Minimum menu item name length must be 4")
        .max(50, "Maximum menu item name length must be 50")
        .required("Menu Item name is required!"),
    description:
        string()
        .min(0, "Minimum menu item description length must be 0")
        .max(250, "Maximum menu item description length must be 250"),
    type:
        string()
        .matches(/snacks|drinks|desserts|salads/i, "Choose what type of menu item this is")
        .required("Menu item type is required!"),
    spiceLevel:
        string()
        .matches(/not_spicy|mild|hot/i, "Choose what type of menu item this is")
        .required("Spice level is required!"),
    vegan:
        boolean(),
    categoryId:
        string()
        .required("Category is required"),
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
    pieces: 
        array()
        .of(menuItemPieceCreateData)

})
const editMenuItemData = object({
    name:
        string()
        .min(4, "Minimum menu item name length must be 4")
        .max(50, "Maximum menu item name length must be 50"),
    description:
        string()
        .min(0, "Minimum menu item description length must be 0")
        .max(250, "Maximum menu item description length must be 250"),
    type:
        string()
        .matches(/snacks|drinks|desserts|salads/i, "Choose what type of menu item this is"),
    spiceLevel:
        string()
        .matches(/not_spicy|mild|hot/i, "Choose what type of menu item this is"),
    vegan:
        boolean(),
    categoryId:
        string(),
    calories: 
        number()
        .typeError("Please provide a number")
        .moreThan(0, "Minimum calories amount must be 0")
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
    pieces: 
        array()
        .of(menuItemPieceEditData)

})

export {createDipData, editDipData, createMenuItemData, editMenuItemData}