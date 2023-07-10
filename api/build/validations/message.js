"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const message = (0, yup_1.object)({
    firstname: (0, yup_1.string)()
        .min(2, "Minimum firstname length must be 2")
        .max(25, "Maximum firstname length must be 25")
        .required("Firstname is required!"),
    lastname: (0, yup_1.string)()
        .min(2, "Minimum lastname length must be 2")
        .max(25, "Maximum lastname length must be 25")
        .required("Lastname is required!"),
    phoneNumber: (0, yup_1.string)()
        .length(12, "Please provide valid phone number e.g 998991001101")
        .required("Phone number is required!"),
    email: (0, yup_1.string)()
        .email("Email must contain @")
        .min(10, "Minimum email length must be 10")
        .max(50, "Maximum email length must be 50")
        .required("Email is required!"),
    subject: (0, yup_1.string)()
        .min(5, "Minimum subject length must be 5")
        .max(50, "Maximum subject length must be 50")
        .required("Subject is required!"),
    message: (0, yup_1.string)()
        .min(20, "Minimum message length must be 20")
        .max(250, "Maximum message length must be 250")
        .required("Message is required!"),
});
exports.default = message;
