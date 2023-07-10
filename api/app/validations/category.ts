import {object, string} from "yup";

const category = object({
    name: 
        string()
        .min(3, "Minimum category length must be 3")
        .max(50, "Maximum category length must be 50")
        .required("Category name is required!"),    
    description: 
        string()
        .min(10, "Minimum description length must be 10")
        .max(150, "Maximum description length must be 150")
        .required("Category description is required!"),
});

const editCategory = object({
    name: 
        string()
        .min(3, "Minimum category length must be 3")
        .max(50, "Maximum category length must be 50"),    
    description: 
        string()
        .min(10, "Minimum description length must be 10")
        .max(150, "Maximum description length must be 150")
});


export {category, editCategory};