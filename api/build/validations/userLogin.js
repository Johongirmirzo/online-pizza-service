"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const userLogin = (0, yup_1.object)({
    email: (0, yup_1.string)().
        email("Email must contain @").
        required("Email can't be empty!"),
    password: (0, yup_1.string)().
        required("Password can't be empty!")
});
exports.default = userLogin;
