import {object, string} from "yup";

const createCategoryData = object({
    'category-photo':
        string()
        .required("Category photo is required!"),
    name:
        string()
        .min(2, "Minimum category name length must be 2")
        .max(60, "Maxmimum category name length must be 60")
        .required("Category name is required!"),
    description:
        string()
        .min(10, "Minimum category description length must be 10")
        .max(250, "Maxmimum category description length must be 250")
        .required("Category description is required!"),
})
const editCategoryData = object({
    name:
        string()
        .min(2, "Minimum category name length must be 2")
        .max(60, "Maxmimum category name length must be 60"),
    description:
        string()
        .min(10, "Minimum category description length must be 10")
        .max(250, "Maxmimum category description length must be 250"),
})

export {
    createCategoryData,
    editCategoryData

}