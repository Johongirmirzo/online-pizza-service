"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.user = void 0;
const yup_1 = require("yup");
const user = (0, yup_1.object)({
    name: (0, yup_1.string)()
        .min(5, "Minimum user name must be 5")
        .max(50, "Maximum user name must be 50")
        .required("Name required!"),
    email: (0, yup_1.string)()
        .email("Email must have @")
        .min(5, "Minimum user name must be 5")
        .max(50, "Maximum user name must be 50")
        .required("Email required!"),
    role: (0, yup_1.string)()
        .matches(/sub_admin|driver/i, "Role must be either SUB_ADMIN or DRIVER")
        .required("Role required!"),
    password: (0, yup_1.string)()
        .min(5, "Minimum password must be 5")
        .max(50, "Maximum password must be 50")
        .required("Password required!"),
    c_password: (0, yup_1.string)().
        oneOf([(0, yup_1.ref)("password")], "Passwords did not match")
});
exports.user = user;
const editUser = (0, yup_1.object)({
    name: (0, yup_1.string)()
        .min(5, "Minimum user name must be 5")
        .max(50, "Maximum user name must be 50"),
    email: (0, yup_1.string)()
        .email("Email must have @")
        .min(5, "Minimum user name must be 5")
        .max(50, "Maximum user name must be 50"),
    role: (0, yup_1.string)()
        .matches(/sub_admin|driver/i, "Role must be either SUB_ADMIN or DRIVER"),
    password: (0, yup_1.string)()
        .min(8, "Minimum password must be 8")
        .max(30, "Maximum password must be 30"),
});
exports.editUser = editUser;
