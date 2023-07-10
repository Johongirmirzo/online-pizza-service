import {object, string, ref} from "yup";

const user = object({
    name:
        string()
        .min(5, "Minimum user name must be 5")
        .max(50, "Maximum user name must be 50")
        .required("Name required!"),
    email:
        string()
        .email("Email must have @")
        .min(5, "Minimum user name must be 5")
        .max(50, "Maximum user name must be 50")
        .required("Email required!"),
    role:
        string()
        .matches(/sub_admin|driver/i, "Role must be either SUB_ADMIN or DRIVER")
        .required("Role required!"),
    password:
        string()
        .min(5, "Minimum password must be 5")
        .max(50, "Maximum password must be 50")
        .required("Password required!"),
    c_password:
        string().
        oneOf([ref("password")], "Passwords did not match")
});


const editUser = object({
    name:
        string()
        .min(5, "Minimum user name must be 5")
        .max(50, "Maximum user name must be 50"),
    email:
        string()
        .email("Email must have @")
        .min(5, "Minimum user name must be 5")
        .max(50, "Maximum user name must be 50"),
    role:
        string()
        .matches(/sub_admin|driver/i, "Role must be either SUB_ADMIN or DRIVER"),
    password:
        string()
        .min(8, "Minimum password must be 8")
        .max(30, "Maximum password must be 30"),
});


export {user, editUser};