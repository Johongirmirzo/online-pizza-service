import {object, string, ref} from "yup";

const userLogin = object({
    email:
        string()
        .email("Email must contains @")
        .required("Email is required!"),
    password:
        string()
        .required("Password is required")
});


const userCreateFormData = object({
    'user-photo':
        string()
        .required("User photo is required!"),
    name:
        string()
        .min(2, "Minimum name length must be 2")
        .max(50, "Maximum name length must be 50")
        .required("Name is required!"),
    email:
        string()
        .email("Email must contains @")
        .min(10, "Minimum email length must be 10")
        .max(100, "Maximum email length must be 100")
        .required("Email is required!"),
    phoneNumber:
        string()
        .length(13, "Please provide valid phone number")
        .required("Phone number is required!"),
    password:
        string()
        .min(8, "Minimum password length must be 8")
        .max(25, "Maxmimum password length must be 25")
        .required("Password is required!"),
    c_password:
        string()
        .oneOf([ref("password"), "null"], "Password must match!")
        .required("Confirm Password is required!"),
    role: 
        string()
        .matches(/sub_admin|driver/i, "User must have Sub Admin or Driver role")
        .required("Role is required!")
})

const userEditFormData = object({
    'user-photo':
        string(),
    name:
        string()
        .min(2, "Minimum name length must be 2")
        .max(50, "Maximum name length must be 50"),
    email:
        string()
        .email("Email must contains @")
        .min(10, "Minimum email length must be 10")
        .max(100, "Maximum email length must be 100"),
    phoneNumber:
        string()
        .length(13, "Please provide valid phone number"),
    password:
        string()
        .min(8, "Minimum password length must be 8")
        .max(25, "Maxmimum password length must be 25"),
    newPassword:
        string()
        .min(8, "Minimum new password length must be 8")
        .max(25, "Maxmimum new password length must be 25"),
    newConfirmPassword:
        string()
        .min(8, "Minimum new confirm password length must be 8")
        .max(25, "Maxmimum new confirm password length must be 25"),
    role: 
        string()
        .matches(/sub_admin|driver/i, "User must have Sub Admin or Driver role"),
    status:
        string()
        .matches(/pending|active|blocked/i, "User must have Pending, Active or Blocked status"),
})

export {
    userLogin,
    userCreateFormData,
    userEditFormData
}