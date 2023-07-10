"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomer = exports.loginCustomer = exports.editCustomer = void 0;
const yup_1 = require("yup");
const loginCustomer = (0, yup_1.object)({
    email: (0, yup_1.string)()
        .email("Email must have @")
        .min(5, "Minimum user name must be 5")
        .max(50, "Maximum user name must be 50")
        .required("Email required!"),
    phone: (0, yup_1.string)()
        .length(12, "Phone must have exactly 12 digits. E.g: 998991002030")
        .required("Phone number is required"),
    password: (0, yup_1.string)()
        .required("Password required!"),
});
exports.loginCustomer = loginCustomer;
const registerCustomer = (0, yup_1.object)({
    name: (0, yup_1.string)()
        .min(5, "Minimum customer name must be 5")
        .max(50, "Maximum customer name must be 50")
        .required("Customer name is required!"),
    email: (0, yup_1.string)()
        .email("Email must have @")
        .min(5, "Minimum user name must be 5")
        .max(50, "Maximum user name must be 50")
        .required("Email required!"),
    phone: (0, yup_1.string)()
        .length(12, "Phone must have exactly 12 digits. E.g: 998991002030")
        .required("Phone number is required"),
    password: (0, yup_1.string)()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Maximum password length must be 50 characters")
        .required("Password required!"),
    c_password: (0, yup_1.string)().
        oneOf([(0, yup_1.ref)("password")], "Passwords did not match!")
});
exports.registerCustomer = registerCustomer;
const editCustomer = (0, yup_1.object)({
    name: (0, yup_1.string)()
        .min(2, "Minimum name length must be 2")
        .max(25, "Minimum name length must be 25"),
    email: (0, yup_1.string)()
        .email("Email must contain @")
        .min(15, "Minimum name length must be 15")
        .max(50, "Minimum name length must be 50"),
    gender: (0, yup_1.string)()
        .matches(/male|female/i, "Gender must be either male or female"),
    birthDate: (0, yup_1.string)(),
    phone: (0, yup_1.string)()
        .length(12, "Phone must have exactly 12 digits. E.g: 998991002030"),
    password: (0, yup_1.string)()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Maximum password length must be 50 characters"),
    newPassword: (0, yup_1.string)()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Maximum password length must be 50 characters"),
    newConfirmPassword: (0, yup_1.string)()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Maximum password length must be 50 characters")
});
exports.editCustomer = editCustomer;
