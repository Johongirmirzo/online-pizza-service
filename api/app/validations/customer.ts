import {object, string, array, ref} from "yup";


const loginCustomer = object({
    email:
        string()
        .email("Email must have @")
        .min(5, "Minimum user name must be 5")
        .max(50, "Maximum user name must be 50")
        .required("Email required!"),
    phone:
        string()
        .length(12, "Phone must have exactly 12 digits. E.g: 998991002030")
        .required("Phone number is required"),
    password:
        string()
        .required("Password required!"),
});
const registerCustomer = object({
    name: 
        string()
        .min(5, "Minimum customer name must be 5")
        .max(50, "Maximum customer name must be 50")
        .required("Customer name is required!"),
    email:
        string()
        .email("Email must have @")
        .min(5, "Minimum user name must be 5")
        .max(50, "Maximum user name must be 50")
        .required("Email required!"),
    phone:
        string()
        .length(12, "Phone must have exactly 12 digits. E.g: 998991002030")
        .required("Phone number is required"),
    password:
        string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Maximum password length must be 50 characters")
        .required("Password required!"),
    c_password:
        string().
        oneOf([ref("password")], "Passwords did not match!")

});

const editCustomer = object({
    name:
        string()
        .min(2, "Minimum name length must be 2")
        .max(25, "Minimum name length must be 25"),
    email:
        string()
        .email("Email must contain @")
        .min(15, "Minimum name length must be 15")
        .max(50, "Minimum name length must be 50"),
    gender:
        string()
        .matches(/male|female/i, "Gender must be either male or female"),
    birthDate:
        string(),
    phone:
        string()
        .length(12, "Phone must have exactly 12 digits. E.g: 998991002030"),
    password:
        string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Maximum password length must be 50 characters"),
    newPassword:
        string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Maximum password length must be 50 characters"),
    newConfirmPassword:
        string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Maximum password length must be 50 characters")
})


export {editCustomer, loginCustomer, registerCustomer};